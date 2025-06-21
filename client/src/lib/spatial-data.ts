// Spatial data for desert locust modeling layers

export interface BreedingSuitabilityData {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties: {
      suitability_class: 1 | 2 | 3 | 4;
      suitability_level: "Unsuitable" | "Low" | "Moderate" | "High";
      region: string;
    };
    geometry: {
      type: "Polygon";
      coordinates: number[][][];
    };
  }>;
}

export interface GregarizationData {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties: {
      intensity: number; // 0-1 continuous value
      risk_level: "Low" | "Moderate" | "High";
      date: string;
    };
    geometry: {
      type: "Polygon";
      coordinates: number[][][];
    };
  }>;
}

export interface FeedingSusceptibilityData {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties: {
      day_feedin: number; // 1-8+ days
      coverage_type: "1-2 days" | "2-4 days" | "5-7 days" | "8+ days";
      swarm_id: string;
    };
    geometry: {
      type: "Polygon";
      coordinates: number[][][];
    };
  }>;
}

export interface OutbreakStagesData {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties: {
      outbreak_stage: "Calm" | "Alarm" | "Alert" | "Crisis";
      region: string;
      date: string;
    };
    geometry: {
      type: "Polygon";
      coordinates: number[][][];
    };
  }>;
}

// Color schemes from the model documentation
export const BREEDING_SUITABILITY_COLORS = {
  1: "#BDBEBE", // Unsuitable
  2: "#0070FF", // Low suitability  
  3: "#267300", // Moderate suitability
  4: "#FF2B18"  // High suitability
};

export const TEMPORAL_BREEDING_COLORS = {
  1: "#BDBEBE", // Unsuitable
  2: "#F2FE2A", // Low suitability
  3: "#33B3FD", // Moderate suitability
  4: "#FF2B18"  // High suitability
};

export const FEEDING_SUSCEPTIBILITY_COLORS = {
  "1-2 days": "#FFFF00",
  "2-4 days": "#0070FF", 
  "5-7 days": "#C500FF",
  "8+ days": "#FF0000"
};

export const OUTBREAK_STAGE_COLORS = {
  "Calm": "#00FF00",    // Green
  "Alarm": "#FFA500",   // Orange
  "Alert": "#FF6B6B",   // Light red
  "Crisis": "#FF0000"   // Red
};

// Placeholder data generators (to be replaced with actual API calls)
export function generateBreedingSuitabilityData(): BreedingSuitabilityData {
  // Placeholder data for East Africa region
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          suitability_class: 4,
          suitability_level: "High",
          region: "Somalia"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[45, 2], [50, 2], [50, 8], [45, 8], [45, 2]]]
        }
      },
      {
        type: "Feature", 
        properties: {
          suitability_class: 3,
          suitability_level: "Moderate",
          region: "Kenya"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[34, -4], [42, -4], [42, 5], [34, 5], [34, -4]]]
        }
      },
      {
        type: "Feature",
        properties: {
          suitability_class: 2,
          suitability_level: "Low",
          region: "Ethiopia"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[33, 3], [48, 3], [48, 15], [33, 15], [33, 3]]]
        }
      }
    ]
  };
}

export function generateOutbreakStagesData(): OutbreakStagesData {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          outbreak_stage: "Crisis",
          region: "Northern Somalia",
          date: "2025-01-01"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[46, 8], [50, 8], [50, 11], [46, 11], [46, 8]]]
        }
      },
      {
        type: "Feature",
        properties: {
          outbreak_stage: "Alert", 
          region: "Eastern Kenya",
          date: "2025-01-01"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[38, -1], [42, -1], [42, 2], [38, 2], [38, -1]]]
        }
      },
      {
        type: "Feature",
        properties: {
          outbreak_stage: "Alarm",
          region: "Southern Ethiopia", 
          date: "2025-01-01"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[36, 4], [43, 4], [43, 8], [36, 8], [36, 4]]]
        }
      },
      {
        type: "Feature",
        properties: {
          outbreak_stage: "Calm",
          region: "Uganda",
          date: "2025-01-01"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[29, -1], [35, -1], [35, 4], [29, 4], [29, -1]]]
        }
      }
    ]
  };
}

// API endpoints for future data integration
export const SPATIAL_DATA_ENDPOINTS = {
  breedingSuitability: "/api/breeding-suitability",
  temporalBreeding: "/api/temporal-breeding",
  gregarization: "/api/gregarization-swarming", 
  feedingSusceptibility: "/api/feeding-susceptibility",
  outbreakStages: "/api/outbreak-stages"
};