import { LatLngTuple } from "leaflet";
import { TrajectoryData, TrajectoryFeature } from "./trajectory-data";

export interface ProcessedTrajectoryData {
  particleGroups: Map<number, TrajectoryFeature[]>;
  timeRange: {
    start: Date;
    end: Date;
  };
  uniqueParticleIds: number[];
}

export interface ParticleTrajectory {
  particleId: number;
  coordinates: LatLngTuple[];
  timeStamps: string[];
}

export function processTrajectoryData(data: TrajectoryData): ProcessedTrajectoryData {
  const particleGroups = new Map<number, TrajectoryFeature[]>();
  let minTime = new Date();
  let maxTime = new Date(0);

  // Group features by particle_id
  data.features.forEach(feature => {
    const particleId = feature.properties.particle_id;
    const time = new Date(feature.properties.time);
    
    if (time < minTime) minTime = time;
    if (time > maxTime) maxTime = time;

    if (!particleGroups.has(particleId)) {
      particleGroups.set(particleId, []);
    }
    particleGroups.get(particleId)!.push(feature);
  });

  // Sort each group by time
  particleGroups.forEach(features => {
    features.sort((a, b) => 
      new Date(a.properties.time).getTime() - new Date(b.properties.time).getTime()
    );
  });

  return {
    particleGroups,
    timeRange: { start: minTime, end: maxTime },
    uniqueParticleIds: Array.from(particleGroups.keys())
  };
}

export function getParticleTrajectories(processedData: ProcessedTrajectoryData): ParticleTrajectory[] {
  const trajectories: ParticleTrajectory[] = [];

  processedData.particleGroups.forEach((features, particleId) => {
    const coordinates: LatLngTuple[] = features.map(feature => [
      feature.geometry.coordinates[1], // latitude
      feature.geometry.coordinates[0]  // longitude
    ]);
    
    const timeStamps = features.map(feature => feature.properties.time);

    trajectories.push({
      particleId,
      coordinates,
      timeStamps
    });
  });

  return trajectories;
}

export function getTrajectoryColor(particleId: number): string {
  // Generate unique colors using HSL color space for 155+ particles
  // Use hue rotation with varying saturation and lightness for distinctiveness
  const hue = (particleId * 137.5) % 360; // Golden angle for good distribution
  const saturation = 65 + (particleId % 3) * 15; // 65%, 80%, 95%
  const lightness = 45 + (particleId % 4) * 10; // 45%, 55%, 65%, 75%
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function getUniqueParticleCount(data: TrajectoryData): number {
  const uniqueIds = new Set();
  data.features.forEach(feature => {
    uniqueIds.add(feature.properties.particle_id);
  });
  return uniqueIds.size;
}

export function getDateFromTimeIndex(timeIndex: number): string {
  const startDate = new Date('2025-01-01');
  const targetDate = new Date(startDate);
  targetDate.setDate(startDate.getDate() + timeIndex);
  return targetDate.toISOString().split('T')[0];
}

export function getRiskLevel(particleId: number): "high" | "moderate" | "low" {
  // Simple risk calculation based on particle ID for demonstration
  const risk = particleId % 10;
  if (risk >= 7) return "high";
  if (risk >= 4) return "moderate";
  return "low";
}

export function getRiskColor(risk: "high" | "moderate" | "low"): string {
  switch (risk) {
    case "high": return "#EF4444";    // red-500
    case "moderate": return "#FB923C"; // orange-400
    case "low": return "#4ADE80";     // green-400
  }
}
