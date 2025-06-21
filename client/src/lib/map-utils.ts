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
  // Generate unique colors for each particle using a wide color palette
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D2B4DE', '#A9DFBF',
    '#F9E79F', '#D5A6BD', '#AED6F1', '#A3E4D7', '#F4D03F', '#E8DAEF', '#D6EAF8', '#D1F2EB',
    '#FCF3CF', '#FADBD8', '#EBF5FB', '#E8F6F3', '#FEF9E7', '#FDF2E9', '#EAEDED', '#F8F9F9',
    '#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#F5FF33', '#33FFF5', '#5733FF', '#FF3357',
    '#57FF33', '#3357FF', '#F533FF', '#33F5FF', '#FF5733', '#5733FF', '#33FF57', '#FF33F5'
  ];
  
  return colors[particleId % colors.length];
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
