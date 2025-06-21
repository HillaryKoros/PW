# Data Directory for ELRP Geospatial Layers

This directory should contain the actual geospatial data files referenced in the MapServer mapfiles.

## Expected Data Files

### Raster Data (GeoTIFF)
Copy the following files from attached_assets to this directory:

- `Breeding_Suitability_raster_JAN_2025_NORMALIZED.tif`
- `Breeding_Suitability_raster_FEB_2025_NORMALIZED.tif` 
- `Breeding_Suitability_raster_APR_2024_NORMALIZED.tif`
- `Breeding_Suitability_raster_JUL_2024_NORMALIZED.tif`
- `Breeding_Suitability_raster_NOV_2024_NORMALIZED.tif`
- `Breeding_Suitability_raster_DEC_2024_NORMALIZED.tif`
- `FEEDING_PERIODS_2024_LULC_BASED.tif`

### Vector Data (Shapefile)
Copy the following shapefile components:

- `locust_swarm_coverage_2024.shp`
- `locust_swarm_coverage_2024.dbf`
- `locust_swarm_coverage_2024.shx`
- `locust_swarm_coverage_2024.prj`
- `locust_swarm_coverage_2024.cpg`

### Vector Data (GeoJSON)
Copy the following GeoJSON files:

- `locust_outbreak_stages.geojson`
- `locust_trajectory_20250402_132735.geojson`

## Data Setup Commands

```bash
# Copy raster data
cp attached_assets/Breeding_Suitability_raster_*_NORMALIZED.tif mapserver/data/
cp attached_assets/FEEDING_PERIODS_2024_LULC_BASED.tif mapserver/data/

# Copy vector data
cp attached_assets/locust_swarm_coverage_2024.* mapserver/data/
cp attached_assets/locust_outbreak_stages.geojson mapserver/data/
cp attached_assets/locust_trajectory_20250402_132735.geojson mapserver/data/
```

## Data Verification

Use `gdalinfo` and `ogrinfo` to verify data integrity:

```bash
# Verify raster data
gdalinfo mapserver/data/Breeding_Suitability_raster_NOV_2024_NORMALIZED.tif

# Verify vector data
ogrinfo mapserver/data/locust_outbreak_stages.geojson
```