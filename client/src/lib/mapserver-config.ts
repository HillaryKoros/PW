// MapServer and MapCache configuration for ELRP layers
export const MAPSERVER_BASE_URL = "http://localhost:8080";
export const MAPCACHE_BASE_URL = "http://localhost:8081";

// WMS service endpoints
export const WMS_ENDPOINTS = {
  mapserver: `${MAPSERVER_BASE_URL}/cgi-bin/mapserv`,
  mapcache: `${MAPCACHE_BASE_URL}/mapcache`
};

// Layer definitions for ELRP model outputs
export const ELRP_LAYERS = {
  // Breeding Suitability Layers (Monthly)
  breeding_suitability: {
    jan_2025: {
      name: "breeding_suitability_jan_2025",
      title: "Breeding Suitability - January 2025",
      wms_layer: "breeding_jan_2025",
      mapfile: "breeding_suitability.map"
    },
    feb_2025: {
      name: "breeding_suitability_feb_2025", 
      title: "Breeding Suitability - February 2025",
      wms_layer: "breeding_feb_2025",
      mapfile: "breeding_suitability.map"
    },
    apr_2024: {
      name: "breeding_suitability_apr_2024",
      title: "Breeding Suitability - April 2024", 
      wms_layer: "breeding_apr_2024",
      mapfile: "breeding_suitability.map"
    },
    jul_2024: {
      name: "breeding_suitability_jul_2024",
      title: "Breeding Suitability - July 2024",
      wms_layer: "breeding_jul_2024", 
      mapfile: "breeding_suitability.map"
    },
    nov_2024: {
      name: "breeding_suitability_nov_2024",
      title: "Breeding Suitability - November 2024",
      wms_layer: "breeding_nov_2024",
      mapfile: "breeding_suitability.map"
    },
    dec_2024: {
      name: "breeding_suitability_dec_2024",
      title: "Breeding Suitability - December 2024", 
      wms_layer: "breeding_dec_2024",
      mapfile: "breeding_suitability.map"
    }
  },

  // Feeding Susceptibility Layer (TIFF-based)
  feeding_susceptibility: {
    name: "feeding_susceptibility_2024",
    title: "Feeding Susceptibility (TIFF)",
    wms_layer: "feeding_periods_2024", 
    mapfile: "feeding_susceptibility.map"
  },

  // Outbreak Stages (Vector-based from GeoJSON)
  outbreak_stages: {
    name: "outbreak_stages",
    title: "Outbreak Stages",
    wms_layer: "locust_outbreak_stages",
    mapfile: "outbreak_stages.map"
  },

  // Locust Swarm Coverage (Shapefile-based)
  swarm_coverage: {
    name: "swarm_coverage_2024", 
    title: "Locust Swarm Coverage",
    wms_layer: "locust_swarm_coverage_2024",
    mapfile: "swarm_coverage.map"
  },

  // Gregarization & Swarming Material
  gregarization: {
    name: "gregarization_swarming",
    title: "Gregarization & Swarming Material", 
    wms_layer: "gregarization_material",
    mapfile: "gregarization.map"
  },

  // Swarm Trajectory (Vector-based)
  swarm_trajectory: {
    name: "swarm_trajectory",
    title: "Swarm Trajectory",
    wms_layer: "locust_trajectory_20250402",
    mapfile: "trajectory.map"
  }
};

// WMS request parameters
export const WMS_PARAMS = {
  service: "WMS",
  version: "1.3.0", 
  request: "GetMap",
  format: "image/png",
  transparent: true,
  crs: "EPSG:4326",
  styles: ""
};

// MapCache tile service configuration
export const MAPCACHE_SERVICES = {
  // Cached raster layers for better performance
  breeding_suitability: {
    service_url: `${MAPCACHE_BASE_URL}/tms/1.0.0/breeding_suitability`,
    format: "png",
    cached: true
  },
  feeding_susceptibility: {
    service_url: `${MAPCACHE_BASE_URL}/tms/1.0.0/feeding_susceptibility`, 
    format: "png",
    cached: true
  }
};

// Helper function to build WMS URL
export function buildWMSUrl(params: {
  layer: string;
  mapfile: string;
  bbox: string;
  width: number;
  height: number;
  useCache?: boolean;
}): string {
  const baseUrl = params.useCache ? WMS_ENDPOINTS.mapcache : WMS_ENDPOINTS.mapserver;
  
  const wmsParams = new URLSearchParams();
  wmsParams.set('service', WMS_PARAMS.service);
  wmsParams.set('version', WMS_PARAMS.version);
  wmsParams.set('request', WMS_PARAMS.request);
  wmsParams.set('format', WMS_PARAMS.format);
  wmsParams.set('transparent', WMS_PARAMS.transparent.toString());
  wmsParams.set('crs', WMS_PARAMS.crs);
  wmsParams.set('styles', WMS_PARAMS.styles);
  wmsParams.set('layers', params.layer);
  wmsParams.set('map', params.mapfile);
  wmsParams.set('bbox', params.bbox);
  wmsParams.set('width', params.width.toString());
  wmsParams.set('height', params.height.toString());

  return `${baseUrl}?${wmsParams.toString()}`;
}

// Helper function to build MapCache TMS URL
export function buildTMSUrl(layer: string, z: number, x: number, y: number): string {
  return `${MAPCACHE_BASE_URL}/tms/1.0.0/${layer}/${z}/${x}/${y}.png`;
}

// GetCapabilities URLs for service discovery
export const CAPABILITIES_URLS = {
  mapserver: `${WMS_ENDPOINTS.mapserver}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities`,
  mapcache: `${WMS_ENDPOINTS.mapcache}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities`
};