export interface TrajectoryFeature {
  type: "Feature";
  properties: {
    particle_id: number;
    time: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
}

export interface TrajectoryData {
  type: "FeatureCollection";
  features: TrajectoryFeature[];
}

export async function loadTrajectoryData(): Promise<TrajectoryData> {
  try {
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch("/api/trajectory", {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to load trajectory data: ${response.statusText}`);
    }
    const data = await response.json();
    return data as TrajectoryData;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error("Request timed out loading trajectory data");
      // Return empty data on timeout instead of crashing
      return { type: "FeatureCollection", features: [] };
    }
    console.error("Error loading trajectory data:", error);
    // Return empty data on error instead of crashing
    return { type: "FeatureCollection", features: [] };
  }
}
