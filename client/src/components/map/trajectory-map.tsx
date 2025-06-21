import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker, GeoJSON, Marker, Popup } from "react-leaflet";
import { LatLngTuple, DivIcon } from "leaflet";
import { processTrajectoryData, getParticleTrajectories, getTrajectoryColor, getRiskLevel, getRiskColor } from "@/lib/map-utils";
import { generateBreedingSuitabilityData, generateOutbreakStagesData, BREEDING_SUITABILITY_COLORS, OUTBREAK_STAGE_COLORS } from "@/lib/spatial-data";
import RasterLayer from "./raster-layer";
import BreedingSuitabilityLayer from "./breeding-suitability-layer";
import GregarizationLayer from "./gregarization-layer";
import LocustCoverageLayer from "./locust-coverage-layer";
import TemporalBreedingLayer from "./temporal-breeding-layer";
import OutbreakStagesLayer from "./outbreak-stages-layer";
import TrajectoryAnimationControl from "./trajectory-animation-control";
import TrajectoryDateDisplay from "./trajectory-date-display";
import MapLegend from "./map-legend";
import LocustIcon from "@/components/locust-icon";
import { renderToString } from "react-dom/server";
import "leaflet/dist/leaflet.css";

interface TrajectoryMapProps {
  trajectoryData: any;
  isPlaying: boolean;
  currentTimeIndex: number;
  onTimeIndexChange: (index: number) => void;
  animationSpeed: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  selectedCountry: string;
  showBreedingSuitability?: boolean;
  showOutbreakStages?: boolean;
  selectedBasemap?: string;
  showAdminBoundaries?: boolean;
  showFeedingSusceptibility?: boolean;
  showGregarization?: boolean;
  showLocustCoverage?: boolean;
  showTemporalBreeding?: boolean;
  selectedBreedingMonth?: string;
  showTrajectory?: boolean;
}

export default function TrajectoryMap({
  trajectoryData,
  isPlaying,
  currentTimeIndex,
  onTimeIndexChange,
  animationSpeed,
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  selectedCountry,
  showBreedingSuitability = false,
  showOutbreakStages = false,
  selectedBasemap = "openstreetmap",
  showAdminBoundaries = false,
  showFeedingSusceptibility = false,
  showGregarization = false,
  showLocustCoverage = false,
  showTemporalBreeding = false,
  selectedBreedingMonth = "jan",
  showTrajectory = false,
}: TrajectoryMapProps) {
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const [currentPositions, setCurrentPositions] = useState<Map<number, LatLngTuple>>(new Map());
  const [particleTrajectories, setParticleTrajectories] = useState<any[]>([]);
  const [breedingSuitabilityData, setBreedingSuitabilityData] = useState<any>(null);


  // Process trajectory data
  useEffect(() => {
    if (trajectoryData) {
      const processedData = processTrajectoryData(trajectoryData);
      const trajectories = getParticleTrajectories(processedData);
      setParticleTrajectories(trajectories);
    }
  }, [trajectoryData]);

  // Generate spatial data layers
  useEffect(() => {
    if (showBreedingSuitability) {
      setBreedingSuitabilityData(generateBreedingSuitabilityData());
    }
  }, [showBreedingSuitability]);

  // Animation effect
  useEffect(() => {
    if (isPlaying && particleTrajectories.length > 0) {
      animationRef.current = setInterval(() => {
        const maxLength = Math.max(...particleTrajectories.map(t => t.coordinates.length));
        const nextIndex = currentTimeIndex + 1;
        
        if (nextIndex >= maxLength) {
          onTimeIndexChange(0); // Reset to beginning
        } else {
          onTimeIndexChange(nextIndex);
        }

        // Update current positions
        const newPositions = new Map<number, LatLngTuple>();
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

  // Get basemap tile layer URL
  const getBasemapUrl = () => {
    switch (selectedBasemap) {
      case "esri-satellite":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case "google-satellite":
        return "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";
      case "esri-terrain":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}";
      case "terrain":
        return "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
      case "cartodb":
        return "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
      case "hybrid":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case "osm":
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  if (!trajectoryData) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden">
      <MapContainer
        center={[5.0, 40.0]}
        zoom={5}
        className="h-full w-full"
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url={getBasemapUrl()}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Feeding Susceptibility Raster Layer */}
        {showFeedingSusceptibility && (
          <RasterLayer
            url="/api/mapserver"
            visible={showFeedingSusceptibility}
            opacity={0.7}
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

        {/* All ELRP Model Output WMS Layers */}
        <RasterLayer
          url="/api/mapserver"
          visible={showFeedingSusceptibility}
          opacity={0.7}
          bounds={[[-5, 29], [20, 52]]}
          colorMap="feeding_susceptibility"
        />

        <BreedingSuitabilityLayer
          visible={showBreedingSuitability}
          opacity={0.7}
        />

        <GregarizationLayer
          visible={showGregarization}
          opacity={0.7}
        />

        <LocustCoverageLayer
          visible={showLocustCoverage}
          opacity={0.7}
        />

        <TemporalBreedingLayer
          visible={showTemporalBreeding}
          selectedMonth={selectedBreedingMonth}
          opacity={0.7}
        />

        <OutbreakStagesLayer
          visible={showOutbreakStages}
          opacity={0.8}
        />


        {/* Current Position Markers with Static Locust Symbols */}
        {showTrajectory && Array.from(currentPositions.entries()).map(([particleId, position]) => {
          // Use trajectory color since risk level is not in data
          const riskColor = getTrajectoryColor(particleId);
          
          // Create custom locust icon
          const locustIcon = new DivIcon({
            html: renderToString(
              <LocustIcon 
                size={16} 
                color={riskColor}
              />
            ),
            className: 'locust-marker',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          });
          
          return (
            <Marker
              key={`locust-${particleId}`}
              position={position}
              icon={locustIcon}
            >
              <Popup>
                <div>
                  <h4>Locust Swarm #{particleId}</h4>
                  <p><strong>Trajectory Color:</strong> {getTrajectoryColor(particleId)}</p>
                  <p><strong>Position:</strong> {position[0].toFixed(3)}, {position[1].toFixed(3)}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Start Position Markers */}
        {showTrajectory && particleTrajectories.map((trajectory) => {
          if (trajectory.coordinates.length === 0) return null;
          const riskColor = getTrajectoryColor(trajectory.particleId);
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

      {/* Trajectory Date Display */}
      <TrajectoryDateDisplay
        currentTimeIndex={currentTimeIndex}
        trajectoryData={trajectoryData}
        visible={showTrajectory}
      />

      {/* Trajectory Animation Control */}
      <TrajectoryAnimationControl
        isPlaying={isPlaying}
        onPlay={onPlay}
        onPause={onPause}
        onReset={onReset}
        currentTimeIndex={currentTimeIndex}
        onTimeIndexChange={onTimeIndexChange}
        animationSpeed={animationSpeed}
        onSpeedChange={onSpeedChange}
        trajectoryData={trajectoryData}
        visible={showTrajectory}
      />

      {/* Map Legend */}
      <MapLegend 
        showBreedingSuitability={showBreedingSuitability}
        showOutbreakStages={showOutbreakStages}
        showTrajectory={showTrajectory}
      />
    </div>
  );
}