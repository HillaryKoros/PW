import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: {
      middlewareMode: true,
      hmr: { server }
    },
    appType: "custom",
  });

  // Use Vite's middleware
  app.use(vite.middlewares);
  
  // Serve index.html for all non-API routes
  app.use("*", async (req, res, next) => {
    // Skip API routes
    if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/health')) {
      return next();
    }
    
    const url = req.originalUrl;

    try {
      // Read the index.html file
      const template = fs.readFileSync(
        path.resolve(__dirname, "..", "frontend", "index.html"),
        "utf-8"
      );
      
      // Apply Vite HTML transforms. This injects the Vite HMR client
      // and transforms the HTML with the correct module URLs
      const html = await vite.transformIndexHtml(url, template);
      
      // Send the transformed HTML
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      // If there's an error, send it to Vite for proper error display
      vite.ssrFixStacktrace(e);
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
