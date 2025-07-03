# MapServer Configuration for East Africa Pest Watch

This directory contains MapServer mapfiles and MapCache configuration for serving locust data layers.

## Directory Structure

```
mapserver/
├── mapfiles/
│   └── locust.map          # Main mapfile for all locust layers
├── mapcache/
│   └── mapcache.xml        # MapCache configuration for tile caching
└── README.md               # This file
```

## Layers Configured

### Raster Layers
- `breeding_suitability` - General breeding suitability raster
- `temporal_breeding_jan` - January 2025 breeding suitability
- `temporal_breeding_feb` - February 2025 breeding suitability
- `temporal_breeding_apr` - April 2024 breeding suitability
- `temporal_breeding_jul` - July 2024 breeding suitability
- `temporal_breeding_nov` - November 2024 breeding suitability
- `temporal_breeding_dec` - December 2024 breeding suitability
- `feeding_susceptibility` - Feeding periods 2024 LULC based data
- `maxent_prediction` - MaxEnt species distribution model prediction 2021

### Vector Layers
- `swarm_coverage` - 2024 locust swarm coverage polygons (Shapefile)
- `outbreak_stages` - Locust outbreak stage points with phase information (GeoJSON)
- `trajectory` - Locust particle trajectory points (GeoJSON)

## Data Sources

All raster data files are located in the `attached_assets/` directory:
- Breeding suitability TIFF files (normalized)
- Feeding periods LULC data
- MaxEnt prediction raster

## WMS Endpoints

The layers are served through WMS endpoints accessible via:
- Base URL: `/api/mapserver`
- Service: WMS
- Version: 1.3.0
- CRS: EPSG:4326
- Format: image/png

## MapCache Configuration

The MapCache configuration provides:
- Disk-based tile caching in `/tmp/mapcache`
- 5x5 metatiling for performance
- 1-hour cache expiration
- Multiple service endpoints (WMS, WMTS, TMS, KML)

## Integration with Application

The current application integrates these layers through:
- React Leaflet components for map visualization
- WMS tile layer requests to `/api/mapserver`
- Layer toggles in the sidebar interface
- Legend components showing layer symbology

## Color Schemes

### Breeding Suitability
- Transparent: No data (0-63)
- Yellow: Low suitability (64-127)
- Orange: Moderate suitability (128-191)
- Red: High suitability (192-255)

### Feeding Susceptibility
- Transparent: No data (0-63)
- Light green: Low susceptibility (64-127)
- Gold: Moderate susceptibility (128-191)
- Orange-red: High susceptibility (192-255)

### MaxEnt Prediction
- Transparent: No prediction (0-63)
- Light blue: Low probability (64-127)
- Steel blue: Moderate probability (128-191)
- Dark blue: High probability (192-255)