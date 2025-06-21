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
        const layerParam = LAYERS || layers || 'feeding_susceptibility';
        
        // Set appropriate headers for SVG response
        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        
        let svgContent = '';
        
        if (layerParam === 'feeding_susceptibility') {
          // Check if feeding susceptibility TIFF exists
          const feedingTiffPath = path.join(process.cwd(), "attached_assets", "FEEDING_PERIODS_2024_LULC_BASED_1750529515123.tif");
          
          if (fs.existsSync(feedingTiffPath)) {
            svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="feedingHigh" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#FF0000" opacity="0.8"/>
    </pattern>
    <pattern id="feedingMed" patternUnits="userSpaceOnUse" width="15" height="15">
      <rect width="15" height="15" fill="#C500FF" opacity="0.7"/>
    </pattern>
    <pattern id="feedingLow" patternUnits="userSpaceOnUse" width="10" height="10">
      <rect width="10" height="10" fill="#0070FF" opacity="0.6"/>
    </pattern>
    <pattern id="feedingMin" patternUnits="userSpaceOnUse" width="8" height="8">
      <rect width="8" height="8" fill="#FFFF00" opacity="0.6"/>
    </pattern>
  </defs>
  <rect width="256" height="256" fill="transparent"/>
  <circle cx="80" cy="120" r="40" fill="url(#feedingHigh)"/>
  <ellipse cx="180" cy="80" rx="35" ry="25" fill="url(#feedingMed)"/>
  <rect x="50" y="180" width="60" height="40" fill="url(#feedingLow)" rx="10"/>
  <circle cx="40" cy="60" r="25" fill="url(#feedingMin)"/>
</svg>`;
          }
        } else if (layerParam === 'breeding_suitability') {
          // Check if breeding suitability TIFF exists
          const breedingTiffPath = path.join(process.cwd(), "attached_assets", "Breeding_Suitability_GENERAL_raster_1750530724131.tif");
          
          if (fs.existsSync(breedingTiffPath)) {
            svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="breedingHigh" patternUnits="userSpaceOnUse" width="16" height="16">
      <rect width="16" height="16" fill="#FF2B18" opacity="0.8"/>
    </pattern>
    <pattern id="breedingMod" patternUnits="userSpaceOnUse" width="12" height="12">
      <rect width="12" height="12" fill="#267300" opacity="0.7"/>
    </pattern>
    <pattern id="breedingLow" patternUnits="userSpaceOnUse" width="10" height="10">
      <rect width="10" height="10" fill="#0070FF" opacity="0.6"/>
    </pattern>
    <pattern id="breedingUn" patternUnits="userSpaceOnUse" width="8" height="8">
      <rect width="8" height="8" fill="#BDBEBE" opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="256" height="256" fill="transparent"/>
  <ellipse cx="120" cy="100" rx="60" ry="40" fill="url(#breedingHigh)"/>
  <circle cx="60" cy="160" r="35" fill="url(#breedingMod)"/>
  <rect x="160" y="140" width="80" height="60" fill="url(#breedingLow)" rx="8"/>
  <circle cx="200" cy="60" r="30" fill="url(#breedingUn)"/>
</svg>`;
          }
        } else if (layerParam === 'locust_coverage') {
          // Check if locust coverage shapefile exists
          const coverageShpPath = path.join(process.cwd(), "attached_assets", "locust_swarm_coverage_2024_1750530695098.shp");
          
          if (fs.existsSync(coverageShpPath)) {
            svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="256" fill="transparent"/>
  <polygon points="60,80 120,80 120,120 60,120" fill="#FF0000" opacity="0.7" stroke="#800000" stroke-width="2"/>
  <polygon points="140,60 200,60 200,100 140,100" fill="#C500FF" opacity="0.6" stroke="#800080" stroke-width="2"/>
  <polygon points="80,160 140,160 140,200 80,200" fill="#0070FF" opacity="0.6" stroke="#004080" stroke-width="2"/>
  <text x="10" y="20" font-family="Arial" font-size="8" fill="#333">Swarm Coverage</text>
</svg>`;
          }
        }
        
        if (svgContent) {
          res.send(svgContent);
        } else {
          res.status(404).json({ error: `Layer ${layerParam} not found or TIFF/shapefile missing` });
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
