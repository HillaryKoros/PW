import trajectoryJson from "@assets/locust_trajectory_20250402_132735_1750528226751.geojson?url";

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
    const response = await fetch(trajectoryJson);
    if (!response.ok) {
      throw new Error(`Failed to load trajectory data: ${response.statusText}`);
    }
    const data = await response.json();
    return data as TrajectoryData;
  } catch (error) {
    console.error("Error loading trajectory data:", error);
    throw error;
  }
}
