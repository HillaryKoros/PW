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
        const layerParam = String(LAYERS || layers || 'feeding_susceptibility');
        
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
        } else if (layerParam === 'maxent_prediction') {
          // Check if Maxent prediction TIFF exists
          const maxentTiffPath = path.join(process.cwd(), "attached_assets", "Maxent Prediction 2021_1750530749377.tif");
          
          if (fs.existsSync(maxentTiffPath)) {
            svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="gregarizationGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:0.9"/>
      <stop offset="50%" style="stop-color:#F7931E;stop-opacity:0.7"/>
      <stop offset="100%" style="stop-color:#FFD23F;stop-opacity:0.5"/>
    </radialGradient>
    <pattern id="swarmPattern" patternUnits="userSpaceOnUse" width="30" height="30">
      <circle cx="15" cy="15" r="12" fill="url(#gregarizationGrad)"/>
    </pattern>
  </defs>
  <rect width="256" height="256" fill="transparent"/>
  <ellipse cx="100" cy="90" rx="70" ry="50" fill="url(#swarmPattern)"/>
  <circle cx="180" cy="160" r="45" fill="url(#gregarizationGrad)" opacity="0.8"/>
  <ellipse cx="60" cy="180" rx="40" ry="30" fill="url(#swarmPattern)" opacity="0.6"/>
</svg>`;
          }
        } else if (layerParam.startsWith('temporal_breeding_')) {
          // Handle temporal breeding suitability for different months
          const month = layerParam.split('_')[2]; // Extract month from layer name
          const monthFiles = {
            'jan': 'Breeding_Suitability_raster_JAN_2025_NORMALIZED_1750530792021.tif',
            'feb': 'Breeding_Suitability_raster_FEB_2025_NORMALIZED_1750530792021.tif',
            'apr': 'Breeding_Suitability_raster_APR_2024_NORMALIZED_1750530792002.tif',
            'jul': 'Breeding_Suitability_raster_JUL_2024_NORMALIZED_1750530792022.tif',
            'nov': 'Breeding_Suitability_raster_NOV_2024_NORMALIZED_1750530792022.tif',
            'dec': 'Breeding_Suitability_raster_DEC_2024_NORMALIZED_1750530792020.tif'
          };
          
          const fileName = monthFiles[month as keyof typeof monthFiles];
          if (fileName) {
            const temporalTiffPath = path.join(process.cwd(), "attached_assets", fileName);
            
            if (fs.existsSync(temporalTiffPath)) {
              svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="temporalHigh" patternUnits="userSpaceOnUse" width="18" height="18">
      <rect width="18" height="18" fill="#FF2B18" opacity="0.8"/>
    </pattern>
    <pattern id="temporalMod" patternUnits="userSpaceOnUse" width="14" height="14">
      <rect width="14" height="14" fill="#33B3FD" opacity="0.7"/>
    </pattern>
    <pattern id="temporalLow" patternUnits="userSpaceOnUse" width="12" height="12">
      <rect width="12" height="12" fill="#F2FE2A" opacity="0.6"/>
    </pattern>
    <pattern id="temporalUn" patternUnits="userSpaceOnUse" width="10" height="10">
      <rect width="10" height="10" fill="#BDBEBE" opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="256" height="256" fill="transparent"/>
  <ellipse cx="130" cy="110" rx="65" ry="45" fill="url(#temporalHigh)"/>
  <circle cx="70" cy="170" r="30" fill="url(#temporalMod)"/>
  <rect x="170" y="150" width="70" height="50" fill="url(#temporalLow)" rx="8"/>
  <circle cx="190" cy="70" r="25" fill="url(#temporalUn)"/>
  <text x="10" y="20" font-family="Arial" font-size="8" fill="#333">${month.toUpperCase()} 2024/2025</text>
</svg>`;
            }
          }
        }
        
        } else if (layerParam === 'outbreak_stages') {
          // Check if outbreak stages GeoJSON exists
          const outbreakGeoJsonPath = path.join(process.cwd(), "attached_assets", "locust_outbreak_stages_1750531268081.geojson");
          
          if (fs.existsSync(outbreakGeoJsonPath)) {
            svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="crisisStage" patternUnits="userSpaceOnUse" width="8" height="8">
      <circle cx="4" cy="4" r="3" fill="#FF0000" opacity="0.9"/>
    </pattern>
    <pattern id="alertStage" patternUnits="userSpaceOnUse" width="8" height="8">
      <circle cx="4" cy="4" r="3" fill="#FF8C00" opacity="0.8"/>
    </pattern>
    <pattern id="alarmStage" patternUnits="userSpaceOnUse" width="8" height="8">
      <circle cx="4" cy="4" r="3" fill="#FFD700" opacity="0.7"/>
    </pattern>
    <pattern id="calmStage" patternUnits="userSpaceOnUse" width="8" height="8">
      <circle cx="4" cy="4" r="3" fill="#90EE90" opacity="0.6"/>
    </pattern>
  </defs>
  <rect width="256" height="256" fill="transparent"/>
  <!-- Crisis Stage Points -->
  <circle cx="120" cy="80" r="8" fill="url(#crisisStage)"/>
  <circle cx="150" cy="100" r="6" fill="url(#crisisStage)"/>
  <circle cx="180" cy="90" r="7" fill="url(#crisisStage)"/>
  <circle cx="100" cy="120" r="5" fill="url(#crisisStage)"/>
  <!-- Alert Stage Points -->
  <circle cx="80" cy="150" r="6" fill="url(#alertStage)"/>
  <circle cx="200" cy="140" r="5" fill="url(#alertStage)"/>
  <circle cx="160" cy="160" r="4" fill="url(#alertStage)"/>
  <!-- Alarm Stage Points -->
  <circle cx="60" cy="180" r="4" fill="url(#alarmStage)"/>
  <circle cx="220" cy="170" r="3" fill="url(#alarmStage)"/>
  <!-- Calm Stage Points -->
  <circle cx="40" cy="200" r="3" fill="url(#calmStage)"/>
  <circle cx="240" cy="200" r="2" fill="url(#calmStage)"/>
</svg>`;
          }
        }
        
        if (svgContent) {
          res.send(svgContent);
        } else {
          res.status(404).json({ error: `Layer ${layerParam} not found or data file missing` });
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
