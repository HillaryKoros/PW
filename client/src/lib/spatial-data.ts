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
      region: string;
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

export interface TemporalBreedingData {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties: {
      suitability_class: 1 | 2 | 3 | 4;
      suitability_level: "Unsuitable" | "Low" | "Moderate" | "High";
      month: string;
      region: string;
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

export const GREGARIZATION_COLORS = {
  "Low": "#90EE90",     // Light green
  "Moderate": "#FFD700", // Gold
  "High": "#FF4500"     // Orange red
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

export function generateGregarizationData(): GregarizationData {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          intensity: 0.8,
          risk_level: "High",
          date: "2025-01-01",
          region: "Horn of Africa"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[44, 6], [48, 6], [48, 10], [44, 10], [44, 6]]]
        }
      },
      {
        type: "Feature",
        properties: {
          intensity: 0.5,
          risk_level: "Moderate",
          date: "2025-01-01",
          region: "Eastern Ethiopia"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[40, 5], [44, 5], [44, 9], [40, 9], [40, 5]]]
        }
      }
    ]
  };
}

export function generateTemporalBreedingData(): TemporalBreedingData {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          suitability_class: 4,
          suitability_level: "High",
          month: "January 2025",
          region: "Somalia Coast"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[47, 1], [51, 1], [51, 6], [47, 6], [47, 1]]]
        }
      },
      {
        type: "Feature",
        properties: {
          suitability_class: 3,
          suitability_level: "Moderate",
          month: "January 2025", 
          region: "Kenya Border"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[34, -2], [38, -2], [38, 2], [34, 2], [34, -2]]]
        }
      }
    ]
  };
}

export function generateFeedingSusceptibilityData(): FeedingSusceptibilityData {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          day_feedin: 8,
          coverage_type: "8+ days",
          swarm_id: "swarm_001"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[45, 7], [47, 7], [47, 9], [45, 9], [45, 7]]]
        }
      },
      {
        type: "Feature",
        properties: {
          day_feedin: 3,
          coverage_type: "2-4 days",
          swarm_id: "swarm_002"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[41, 3], [43, 3], [43, 5], [41, 5], [41, 3]]]
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