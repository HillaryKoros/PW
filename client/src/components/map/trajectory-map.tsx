import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { processTrajectoryData, getParticleTrajectories, getTrajectoryColor } from "@/lib/map-utils";
import "leaflet/dist/leaflet.css";

interface TrajectoryMapProps {
  trajectoryData: any;
  isPlaying: boolean;
  currentTimeIndex: number;
  onTimeIndexChange: (index: number) => void;
  animationSpeed: number;
  selectedCountry: string;
}

export default function TrajectoryMap({
  trajectoryData,
  isPlaying,
  currentTimeIndex,
  onTimeIndexChange,
  animationSpeed,
  selectedCountry
}: TrajectoryMapProps) {
  const [particleTrajectories, setParticleTrajectories] = useState<any[]>([]);
  const [currentPositions, setCurrentPositions] = useState<Map<number, LatLngTuple>>(new Map());
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
        center={[45.0, 10.0]}
        zoom={6}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Trajectory Lines */}
        {particleTrajectories.map((trajectory) => (
          <Polyline
            key={`trajectory-${trajectory.particleId}`}
            positions={trajectory.coordinates.slice(0, currentTimeIndex + 1)}
            color={getTrajectoryColor(trajectory.particleId)}
            weight={3}
            opacity={0.7}
          />
        ))}

        {/* Current Position Markers */}
        {Array.from(currentPositions.entries()).map(([particleId, position]) => (
          <CircleMarker
            key={`marker-${particleId}`}
            center={position}
            radius={8}
            fillColor="#9C27B0"
            color="white"
            weight={2}
            fillOpacity={1}
            className="animate-pulse-slow"
          />
        ))}

        {/* Start Position Markers */}
        {particleTrajectories.map((trajectory) => (
          trajectory.coordinates.length > 0 && (
            <CircleMarker
              key={`start-${trajectory.particleId}`}
              center={trajectory.coordinates[0]}
              radius={6}
              fillColor="#4CAF50"
              color="white"
              weight={2}
              fillOpacity={1}
            />
          )
        ))}
      </MapContainer>
    </div>
  );
}
