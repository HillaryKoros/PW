import { Express } from "express";
import { createServer } from "http";
import * as fs from "fs";
import * as path from "path";

export async function registerRoutes(app: Express) {
  // API routes for trajectory data
  app.get("/api/trajectory", async (req, res) => {
    try {
      // Check multiple possible paths for trajectory data
      const possiblePaths = [
        path.join(process.cwd(), 'mapserver/attached_assets/locust_trajectory_20250402_132735_1750528226751.geojson'),
        path.join(process.cwd(), 'attached_assets/locust_trajectory_20250402_132735_1750528226751.geojson'),
        '/shared/mapserver/attached_assets/locust_trajectory_20250402_132735_1750528226751.geojson'
      ];
      
      let trajectoryPath = null;
      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          trajectoryPath = p;
          break;
        }
      }
      
      if (trajectoryPath) {
        const data = JSON.parse(fs.readFileSync(trajectoryPath, 'utf8'));
        res.json(data);
      } else {
        res.status(404).json({ 
          error: "Trajectory data not found",
          searchedPaths: possiblePaths
        });
      }
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to load trajectory data",
        details: error.message || String(error)
      });
    }
  });

  // API routes for outbreak stages
  app.get("/api/outbreak-stages", async (req, res) => {
    try {
      const possiblePaths = [
        path.join(process.cwd(), 'mapserver/attached_assets/locust_outbreak_stages_1750531579460.geojson'),
        path.join(process.cwd(), 'attached_assets/locust_outbreak_stages_1750531579460.geojson'),
        '/shared/mapserver/attached_assets/locust_outbreak_stages_1750531579460.geojson'
      ];
      
      let outbreakPath = null;
      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          outbreakPath = p;
          break;
        }
      }
      
      if (outbreakPath) {
        const data = JSON.parse(fs.readFileSync(outbreakPath, 'utf8'));
        res.json(data);
      } else {
        res.status(404).json({ 
          error: "Outbreak stages data not found",
          searchedPaths: possiblePaths
        });
      }
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to load outbreak stages data",
        details: error.message || String(error)
      });
    }
  });

  // WMS-based geospatial data endpoints
  app.get("/api/wms/admin0", async (req, res) => {
    try {
      const mapserverUrl = process.env.MAPSERVER_URL || "http://localhost:8080/cgi-bin/mapserv";
      const wmsParams: Record<string, string> = {
        map: "/etc/mapserver/mapfiles/locust.map",
        service: "WMS",
        version: "1.1.1",
        request: "GetMap",
        layers: "admin0",
        styles: "",
        srs: "EPSG:4326",
        bbox: String(req.query.bbox || "-180,-90,180,90"),
        width: String(req.query.width || "800"),
        height: String(req.query.height || "600"),
        format: "image/png",
        transparent: "true"
      };
      
      const queryParams = new URLSearchParams(wmsParams).toString();
      const url = `${mapserverUrl}?${queryParams}`;
      
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url);
      
      if (response.ok) {
        const buffer = await response.buffer();
        res.set('Content-Type', 'image/png');
        res.send(buffer);
      } else {
        res.status(response.status).json({ error: "MapServer WMS request failed" });
      }
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to load Admin0 WMS layer",
        details: error.message || String(error)
      });
    }
  });

  app.get("/api/wms/admin1", async (req, res) => {
    try {
      const mapserverUrl = process.env.MAPSERVER_URL || "http://localhost:8080/cgi-bin/mapserv";
      const wmsParams: Record<string, string> = {
        map: "/etc/mapserver/mapfiles/locust.map",
        service: "WMS",
        version: "1.1.1",
        request: "GetMap",
        layers: "admin1",
        styles: "",
        srs: "EPSG:4326",
        bbox: String(req.query.bbox || "-180,-90,180,90"),
        width: String(req.query.width || "800"),
        height: String(req.query.height || "600"),
        format: "image/png",
        transparent: "true"
      };
      
      const queryParams = new URLSearchParams(wmsParams).toString();
      const url = `${mapserverUrl}?${queryParams}`;
      
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url);
      
      if (response.ok) {
        const buffer = await response.buffer();
        res.set('Content-Type', 'image/png');
        res.send(buffer);
      } else {
        res.status(response.status).json({ error: "MapServer WMS request failed" });
      }
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to load Admin1 WMS layer",
        details: error.message || String(error)
      });
    }
  });

  // Keep direct GeoJSON endpoints as fallback for development
  app.get("/api/admin0", async (req, res) => {
    try {
      const possiblePaths = [
        path.join(process.cwd(), 'mapserver/attached_assets/Admin0_1750589872543.geojson'),
        path.join(process.cwd(), 'attached_assets/Admin0_1750589872543.geojson'),
        '/shared/mapserver/attached_assets/Admin0_1750589872543.geojson'
      ];
      
      let admin0Path = null;
      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          admin0Path = p;
          break;
        }
      }
      
      if (admin0Path) {
        const data = JSON.parse(fs.readFileSync(admin0Path, 'utf8'));
        res.json(data);
      } else {
        res.status(404).json({ 
          error: "Admin0 data not found",
          searchedPaths: possiblePaths
        });
      }
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to load Admin0 data",
        details: error.message || String(error)
      });
    }
  });

  app.get("/api/admin1", async (req, res) => {
    try {
      const possiblePaths = [
        path.join(process.cwd(), 'mapserver/attached_assets/Admin1_1750589872545.geojson'),
        path.join(process.cwd(), 'attached_assets/Admin1_1750589872545.geojson'),
        '/shared/mapserver/attached_assets/Admin1_1750589872545.geojson'
      ];
      
      let admin1Path = null;
      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          admin1Path = p;
          break;
        }
      }
      
      if (admin1Path) {
        const data = JSON.parse(fs.readFileSync(admin1Path, 'utf8'));
        res.json(data);
      } else {
        res.status(404).json({ 
          error: "Admin1 data not found",
          searchedPaths: possiblePaths
        });
      }
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to load Admin1 data",
        details: error.message || String(error)
      });
    }
  });

  // WMS endpoints for all raster layers
  const wmsLayers = [
    'breeding_suitability',
    'temporal_breeding_jan',
    'temporal_breeding_feb', 
    'temporal_breeding_apr',
    'temporal_breeding_jul',
    'temporal_breeding_nov',
    'temporal_breeding_dec',
    'feeding_periods_2024_lulc',
    'maxent_prediction_2021',
    'swarm_coverage',
    'outbreak_stages',
    'trajectory'
  ];

  wmsLayers.forEach(layerName => {
    app.get(`/api/wms/${layerName}`, async (req, res) => {
      try {
        const mapserverUrl = process.env.MAPSERVER_URL || "http://localhost:8080/cgi-bin/mapserv";
        const wmsParams: Record<string, string> = {
          map: "/etc/mapserver/mapfiles/locust.map",
          service: "WMS",
          version: "1.1.1",
          request: "GetMap",
          layers: layerName,
          styles: "",
          srs: "EPSG:4326",
          bbox: String(req.query.bbox || "-180,-90,180,90"),
          width: String(req.query.width || "800"),
          height: String(req.query.height || "600"),
          format: "image/png",
          transparent: "true"
        };
        
        const queryParams = new URLSearchParams(wmsParams).toString();
        const url = `${mapserverUrl}?${queryParams}`;
        
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);
        
        if (response.ok) {
          const buffer = await response.buffer();
          res.set('Content-Type', 'image/png');
          res.send(buffer);
        } else {
          res.status(response.status).json({ error: `MapServer WMS request failed for ${layerName}` });
        }
      } catch (error: any) {
        res.status(500).json({ 
          error: `Failed to load ${layerName} WMS layer`,
          details: error.message || String(error)
        });
      }
    });
  });

  // Generic MapServer proxy for custom WMS requests
  app.get("/api/mapserver", async (req, res) => {
    try {
      // Build query string with map parameter
      const queryParams = new URLSearchParams(req.query as any);
      queryParams.set('map', '/etc/mapserver/mapfiles/locust.map');
      
      // Execute mapserv directly via Docker exec
      const { exec } = require('child_process');
      const command = `docker exec pest_watch-mapserver-1 /usr/bin/mapserv "QUERY_STRING=${queryParams.toString()}"`;
      
      exec(command, { encoding: 'buffer', maxBuffer: 1024 * 1024 * 10 }, (error: any, stdout: Buffer, stderr: Buffer) => {
        if (error) {
          console.error('MapServer exec error:', error);
          res.status(500).json({ error: "MapServer execution failed", details: error.message });
          return;
        }
        
        if (stderr && stderr.length > 0) {
          console.error('MapServer stderr:', stderr.toString());
        }
        
        // Parse the output to separate headers from content
        const output = stdout.toString('binary');
        const headerEnd = output.indexOf('\r\n\r\n');
        
        if (headerEnd !== -1) {
          const headers = output.substring(0, headerEnd);
          const content = stdout.slice(headerEnd + 4);
          
          // Parse content-type from headers
          const contentTypeMatch = headers.match(/Content-Type:\s*(.+)/i);
          if (contentTypeMatch) {
            res.set('Content-Type', contentTypeMatch[1].trim());
          }
          
          // Add CORS headers and cache control
          res.set('Access-Control-Allow-Origin', '*');
          res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.set('Access-Control-Allow-Headers', 'Content-Type');
          res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.set('Pragma', 'no-cache');
          res.set('Expires', '0');
          
          res.send(content);
        } else {
          // No headers found, assume it's an error or plain text
          res.set('Content-Type', 'text/plain');
          res.send(stdout);
        }
      });
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to proxy MapServer request",
        details: error.message || String(error)
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}