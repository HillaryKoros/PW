# MapServer Configuration for ELRP Locust Data

This directory contains MapServer configuration files for serving ELRP (East Africa Pest Watch) geospatial data layers.

## Directory Structure

```
mapserver/
├── mapfiles/          # MapServer .map configuration files
├── data/             # Geospatial data files (GeoTIFF, Shapefiles, GeoJSON)
├── cgi-bin/          # MapServer CGI executable
└── config/           # Additional configuration files
```

## Data Layers

### Raster Layers (GeoTIFF)
- Breeding Suitability (monthly): breeding_suitability_*.tif
- Feeding Susceptibility: feeding_periods_2024.tif

### Vector Layers
- Outbreak Stages: locust_outbreak_stages.geojson
- Swarm Coverage: locust_swarm_coverage_2024.shp
- Trajectory Data: locust_trajectory_20250402.geojson

## MapServer Installation

1. Install MapServer with WMS support
2. Configure web server (Apache/Nginx) to serve CGI
3. Place mapfiles in this directory
4. Configure data paths in mapfiles

## WMS Endpoints

- Base URL: http://localhost:8080/cgi-bin/mapserv
- GetCapabilities: ?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
- GetMap: ?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=layer_name&...