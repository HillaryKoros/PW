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
      const { SERVICE, REQUEST, LAYERS, BBOX, WIDTH, HEIGHT, FORMAT, SRS } = req.query;
      
      if (SERVICE !== 'WMS' || REQUEST !== 'GetMap') {
        return res.status(400).json({ error: "Invalid WMS request" });
      }

      // Mock WMS response for feeding susceptibility
      // In production, this would proxy to actual MapServer CGI
      const wmsResponse = {
        service: "WMS",
        version: "1.3.0",
        request: REQUEST,
        layers: LAYERS,
        bbox: BBOX,
        width: WIDTH,
        height: HEIGHT,
        format: FORMAT || "image/png",
        srs: SRS || "EPSG:4326",
        mapfile: "server/mapserver.map",
        data_source: "FEEDING_PERIODS_2024_LULC_BASED.tif"
      };

      res.json(wmsResponse);
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
