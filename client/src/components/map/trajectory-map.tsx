import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker, GeoJSON } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { processTrajectoryData, getParticleTrajectories, getTrajectoryColor, getRiskLevel, getRiskColor } from "@/lib/map-utils";
import { generateBreedingSuitabilityData, generateOutbreakStagesData, BREEDING_SUITABILITY_COLORS, OUTBREAK_STAGE_COLORS } from "@/lib/spatial-data";
import "leaflet/dist/leaflet.css";

interface TrajectoryMapProps {
  trajectoryData: any;
  isPlaying: boolean;
  currentTimeIndex: number;
  onTimeIndexChange: (index: number) => void;
  animationSpeed: number;
  selectedCountry: string;
  showBreedingSuitability?: boolean;
  showOutbreakStages?: boolean;
}

export default function TrajectoryMap({
  trajectoryData,
  isPlaying,
  currentTimeIndex,
  onTimeIndexChange,
  animationSpeed,
  selectedCountry,
  showBreedingSuitability = false,
  showOutbreakStages = true
}: TrajectoryMapProps) {
  const [particleTrajectories, setParticleTrajectories] = useState<any[]>([]);
  const [currentPositions, setCurrentPositions] = useState<Map<number, LatLngTuple>>(new Map());
  const [breedingSuitabilityData, setBreedingSuitabilityData] = useState<any>(null);
  const [outbreakStagesData, setOutbreakStagesData] = useState<any>(null);
  const animationRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (trajectoryData) {
      const processed = processTrajectoryData(trajectoryData);
      const trajectories = getParticleTrajectories(processed);
      setParticleTrajectories(trajectories);
      
      // Initialize current positions
      const initialPositions = new Map();
      trajectories.forEach(trajectory => {
        if (trajectory.coordinates.length > 0) {
          initialPositions.set(trajectory.particleId, trajectory.coordinates[0]);
        }
      });
      setCurrentPositions(initialPositions);
    }

    // Load spatial data layers
    setBreedingSuitabilityData(generateBreedingSuitabilityData());
    setOutbreakStagesData(generateOutbreakStagesData());
  }, [trajectoryData]);

  useEffect(() => {
    if (isPlaying && particleTrajectories.length > 0) {
      animationRef.current = setInterval(() => {
        const maxTimeSteps = Math.max(...particleTrajectories.map(t => t.coordinates.length));
        
        if (currentTimeIndex >= maxTimeSteps - 1) {
          onTimeIndexChange(0); // Reset to beginning
          return;
        }

        const nextIndex = currentTimeIndex + 1;
        onTimeIndexChange(nextIndex);

        // Update current positions
        const newPositions = new Map();
        particleTrajectories.forEach(trajectory => {
          const index = Math.min(nextIndex, trajectory.coordinates.length - 1);
          if (trajectory.coordinates[index]) {
            newPositions.set(trajectory.particleId, trajectory.coordinates[index]);
          }
        });
        setCurrentPositions(newPositions);

      }, 600 - animationSpeed);
    } else {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isPlaying, animationSpeed, currentTimeIndex, particleTrajectories, onTimeIndexChange]);

  // Update positions when time index changes manually
  useEffect(() => {
    if (particleTrajectories.length > 0) {
      const newPositions = new Map();
      particleTrajectories.forEach(trajectory => {
        const index = Math.min(currentTimeIndex, trajectory.coordinates.length - 1);
        if (trajectory.coordinates[index]) {
          newPositions.set(trajectory.particleId, trajectory.coordinates[index]);
        }
      });
      setCurrentPositions(newPositions);
    }
  }, [currentTimeIndex, particleTrajectories]);

  if (!trajectoryData) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[5.0, 40.0]}
        zoom={5}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Outbreak Stages Layer */}
        {showOutbreakStages && outbreakStagesData && (
          <GeoJSON
            data={outbreakStagesData}
            style={(feature) => ({
              fillColor: OUTBREAK_STAGE_COLORS[feature?.properties?.outbreak_stage as keyof typeof OUTBREAK_STAGE_COLORS] || "#000000",
              weight: 2,
              opacity: 1,
              color: 'white',
              fillOpacity: 0.4
            })}
            onEachFeature={(feature, layer) => {
              if (feature.properties) {
                layer.bindPopup(`
                  <div>
                    <h4>${feature.properties.outbreak_stage} Stage</h4>
                    <p><strong>Region:</strong> ${feature.properties.region}</p>
                    <p><strong>Date:</strong> ${feature.properties.date}</p>
                  </div>
                `);
              }
            }}
          />
        )}

        {/* Breeding Suitability Layer */}
        {showBreedingSuitability && breedingSuitabilityData && (
          <GeoJSON
            data={breedingSuitabilityData}
            style={(feature) => ({
              fillColor: BREEDING_SUITABILITY_COLORS[feature?.properties?.suitability_class as keyof typeof BREEDING_SUITABILITY_COLORS] || "#000000",
              weight: 2,
              opacity: 1,
              color: 'white',
              fillOpacity: 0.6
            })}
            onEachFeature={(feature, layer) => {
              if (feature.properties) {
                layer.bindPopup(`
                  <div>
                    <h4>Breeding Suitability: ${feature.properties.suitability_level}</h4>
                    <p><strong>Region:</strong> ${feature.properties.region}</p>
                    <p><strong>Class:</strong> ${feature.properties.suitability_class}</p>
                  </div>
                `);
              }
            }}
          />
        )}
        
        {/* Trajectory Lines with Flow Animation */}
        {particleTrajectories.map((trajectory) => {
          const visiblePath = trajectory.coordinates.slice(0, currentTimeIndex + 1);
          const recentPath = trajectory.coordinates.slice(Math.max(0, currentTimeIndex - 5), currentTimeIndex + 1);
          
          return (
            <div key={`trajectory-group-${trajectory.particleId}`}>
              {/* Full trajectory path (faded) */}
              <Polyline
                key={`trajectory-full-${trajectory.particleId}`}
                positions={visiblePath}
                color={getTrajectoryColor(trajectory.particleId)}
                weight={2}
                opacity={0.3}
              />
              {/* Recent path (bright) to show flow direction */}
              {recentPath.length > 1 && (
                <Polyline
                  key={`trajectory-recent-${trajectory.particleId}`}
                  positions={recentPath}
                  color={getTrajectoryColor(trajectory.particleId)}
                  weight={4}
                  opacity={0.9}
                />
              )}
            </div>
          );
        })}

        {/* Current Position Markers with Risk-Based Colors and Movement Indicators */}
        {Array.from(currentPositions.entries()).map(([particleId, position]) => {
          const riskLevel = getRiskLevel(particleId);
          const riskColor = getRiskColor(riskLevel);
          const trajectory = particleTrajectories.find(t => t.particleId === particleId);
          const previousPosition = trajectory && currentTimeIndex > 0 
            ? trajectory.coordinates[Math.max(0, currentTimeIndex - 1)]
            : null;
          
          return (
            <div key={`marker-group-${particleId}`}>
              {/* Movement trail for direction indication */}
              {previousPosition && (
                <CircleMarker
                  key={`trail-${particleId}`}
                  center={previousPosition}
                  radius={5}
                  fillColor={riskColor}
                  color="white"
                  weight={1}
                  fillOpacity={0.4}
                />
              )}
              {/* Current position with enhanced flow animation */}
              <CircleMarker
                key={`marker-${particleId}`}
                center={position}
                radius={10}
                fillColor={riskColor}
                color="white"
                weight={3}
                fillOpacity={1}
                className="swarm-flow"
              />
              {/* Direction indicator (small arrow effect) */}
              {previousPosition && (
                <CircleMarker
                  key={`direction-${particleId}`}
                  center={position}
                  radius={3}
                  fillColor="white"
                  color={riskColor}
                  weight={2}
                  fillOpacity={1}
                  className="direction-indicator"
                />
              )}
            </div>
          );
        })}

        {/* Start Position Markers with Risk-Based Colors */}
        {particleTrajectories.map((trajectory) => {
          if (trajectory.coordinates.length === 0) return null;
          const riskLevel = getRiskLevel(trajectory.particleId);
          const riskColor = getRiskColor(riskLevel);
          return (
            <CircleMarker
              key={`start-${trajectory.particleId}`}
              center={trajectory.coordinates[0]}
              radius={5}
              fillColor={riskColor}
              color="white"
              weight={2}
              fillOpacity={0.7}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
