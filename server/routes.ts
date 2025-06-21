import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve trajectory data
  app.get("/api/trajectory-data", (req, res) => {
    try {
      const trajectoryPath = path.join(process.cwd(), "attached_assets", "locust_trajectory_20250402_132735_1750528226751.geojson");
      
      if (!fs.existsSync(trajectoryPath)) {
        return res.status(404).json({ error: "Trajectory data file not found" });
      }

      const trajectoryData = fs.readFileSync(trajectoryPath, "utf8");
      const parsedData = JSON.parse(trajectoryData);
      
      res.json(parsedData);
    } catch (error) {
      console.error("Error serving trajectory data:", error);
      res.status(500).json({ error: "Failed to load trajectory data" });
    }
  });

  // MapServer WMS endpoint
  app.get("/api/mapserver", (req, res) => {
    try {
      const { SERVICE, REQUEST, LAYERS, BBOX, WIDTH, HEIGHT, FORMAT, SRS, service, request, layers, bbox, width, height, format, srs } = req.query;
      
      // Handle both uppercase and lowercase parameter names
      const serviceParam = SERVICE || service;
      const requestParam = REQUEST || request;
      
      if (serviceParam === 'WMS' && requestParam === 'GetMap') {
        // Serve the TIFF file as a tile image for the requested bbox
        const tiffPath = path.join(process.cwd(), "attached_assets", "FEEDING_PERIODS_2024_LULC_BASED_1750529515123.tif");
        
        if (fs.existsSync(tiffPath)) {
          // Set appropriate headers for image response
          res.setHeader('Content-Type', 'image/png');
          res.setHeader('Cache-Control', 'public, max-age=3600');
          
          // For now, return a simple colored rectangle representing the raster data
          // In production, this would use actual GDAL/MapServer to render the TIFF
          const canvas = Buffer.from(`
            <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
              <rect width="256" height="256" fill="#ff6b6b" opacity="0.7"/>
              <text x="128" y="128" text-anchor="middle" fill="white" font-size="12">Feeding Susceptibility</text>
            </svg>
          `);
          
          res.send(canvas);
        } else {
          res.status(404).json({ error: "TIFF file not found" });
        }
      } else {
        // Return capabilities or metadata
        res.json({
          service: "WMS",
          version: "1.3.0",
          capabilities: "GetCapabilities,GetMap",
          layers: ["feeding_susceptibility"],
          formats: ["image/png"],
          crs: ["EPSG:4326"],
          bounds: {
            minx: 29,
            miny: -5,
            maxx: 52,
            maxy: 20
          },
          tiff_file: "FEEDING_PERIODS_2024_LULC_BASED_1750529515123.tif"
        });
      }
    } catch (error) {
      console.error("MapServer WMS error:", error);
      res.status(500).json({ error: "MapServer WMS processing failed" });
    }
  });

  // Serve TIFF file directly for download/processing
  app.get("/api/tiff/feeding-susceptibility", (req, res) => {
    try {
      const tiffPath = path.join(process.cwd(), "attached_assets", "FEEDING_PERIODS_2024_LULC_BASED_1750529515123.tif");
      
      if (!fs.existsSync(tiffPath)) {
        return res.status(404).json({ error: "TIFF file not found" });
      }

      res.setHeader('Content-Type', 'image/tiff');
      res.setHeader('Content-Disposition', 'attachment; filename="feeding_susceptibility.tif"');
      
      const fileStream = fs.createReadStream(tiffPath);
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error serving TIFF file:", error);
      res.status(500).json({ error: "Failed to serve TIFF file" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
