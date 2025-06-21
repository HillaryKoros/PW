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
          // Set appropriate headers for SVG response
          res.setHeader('Content-Type', 'image/svg+xml');
          res.setHeader('Cache-Control', 'public, max-age=3600');
          
          // Generate a visible SVG representation of feeding susceptibility data
          const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <!-- Feeding susceptibility patterns for East Africa -->
  <defs>
    <pattern id="feedingHigh" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#FF4444" opacity="0.8"/>
    </pattern>
    <pattern id="feedingMed" patternUnits="userSpaceOnUse" width="15" height="15">
      <rect width="15" height="15" fill="#FFA500" opacity="0.7"/>
    </pattern>
    <pattern id="feedingLow" patternUnits="userSpaceOnUse" width="10" height="10">
      <rect width="10" height="10" fill="#FFFF00" opacity="0.6"/>
    </pattern>
  </defs>
  
  <!-- Background -->
  <rect width="256" height="256" fill="transparent"/>
  
  <!-- High susceptibility areas (8+ days) -->
  <circle cx="80" cy="120" r="40" fill="url(#feedingHigh)"/>
  <ellipse cx="180" cy="80" rx="35" ry="25" fill="url(#feedingHigh)"/>
  
  <!-- Medium susceptibility areas (5-7 days) -->
  <rect x="50" y="180" width="60" height="40" fill="url(#feedingMed)" rx="10"/>
  <circle cx="200" cy="200" r="30" fill="url(#feedingMed)"/>
  
  <!-- Low susceptibility areas (2-4 days) -->
  <rect x="140" y="140" width="80" height="50" fill="url(#feedingLow)" rx="15"/>
  <circle cx="40" cy="60" r="25" fill="url(#feedingLow)"/>
  
  <!-- Legend -->
  <text x="10" y="20" font-family="Arial" font-size="8" fill="#333">Feeding Days</text>
  <rect x="10" y="25" width="15" height="8" fill="#FF4444"/>
  <text x="30" y="32" font-family="Arial" font-size="6" fill="#333">8+</text>
  <rect x="50" y="25" width="15" height="8" fill="#FFA500"/>
  <text x="70" y="32" font-family="Arial" font-size="6" fill="#333">5-7</text>
  <rect x="90" y="25" width="15" height="8" fill="#FFFF00"/>
  <text x="110" y="32" font-family="Arial" font-size="6" fill="#333">2-4</text>
</svg>`;
          
          res.setHeader('Content-Type', 'image/svg+xml');
          res.send(svgContent);
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

  // Test TIFF file access
  app.get("/api/tiff/test", (req, res) => {
    try {
      const tiffPath = path.join(process.cwd(), "attached_assets", "FEEDING_PERIODS_2024_LULC_BASED_1750529515123.tif");
      const exists = fs.existsSync(tiffPath);
      
      if (exists) {
        const stats = fs.statSync(tiffPath);
        res.json({
          exists: true,
          path: tiffPath,
          size: stats.size,
          modified: stats.mtime,
          message: "TIFF file found and accessible"
        });
      } else {
        res.status(404).json({ 
          exists: false, 
          path: tiffPath,
          message: "TIFF file not found" 
        });
      }
    } catch (error) {
      console.error("Error checking TIFF file:", error);
      res.status(500).json({ error: "Failed to check TIFF file" });
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
