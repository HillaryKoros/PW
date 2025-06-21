# MapCache Configuration for ELRP Locust Data

This directory contains MapCache configuration for caching ELRP (East Africa Pest Watch) geospatial tiles to improve performance.

## Directory Structure

```
mapcache/
├── config/           # MapCache XML configuration files
├── cache/           # Tile cache storage directory
└── logs/            # MapCache logs
```

## Configuration

MapCache serves as a tile caching proxy between the frontend and MapServer, providing:

- Fast tile delivery through pre-generated cache
- Multiple cache backends (disk, memcache, sqlite)
- Tile format optimization (PNG, JPEG, WebP)
- Automatic cache invalidation and seeding

## Services

- Base URL: http://localhost:8081/mapcache
- TMS: /tms/1.0.0/{layer}/{z}/{x}/{y}.{format}
- WMS: ?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS={layer}&...
- WMTS: ?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER={layer}&...

## Cache Strategy

### Raster Layers (High Cache Priority)
- Breeding Suitability layers - Pre-seed zoom levels 3-10
- Feeding Susceptibility - Pre-seed zoom levels 3-8

### Vector Layers (Dynamic Cache)
- Outbreak Stages - Cache on demand
- Swarm Coverage - Cache on demand with 1-hour expiry