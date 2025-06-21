import { useState, useEffect } from "react";
import Navigation from "@/components/layout/navigation";
import TrajectoryMap from "@/components/map/trajectory-map";
import MapSidebar from "@/components/map/map-sidebar";
import MapLegend from "@/components/map/map-legend";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { loadTrajectoryData } from "@/lib/trajectory-data";

export default function MapViewer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [trajectoryData, setTrajectoryData] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [activeDataType, setActiveDataType] = useState("monitoring");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(200);
  const [showBreedingSuitability, setShowBreedingSuitability] = useState(false);
  const [showOutbreakStages, setShowOutbreakStages] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await loadTrajectoryData();
        setTrajectoryData(data);
      } catch (error) {
        console.error("Failed to load trajectory data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const playAnimation = () => {
    setIsPlaying(true);
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentTimeIndex(0);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-0'} overflow-hidden`}>
          <MapSidebar
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
            activeDataType={activeDataType}
            onDataTypeChange={setActiveDataType}
            isPlaying={isPlaying}
            onPlay={playAnimation}
            onPause={pauseAnimation}
            onReset={resetAnimation}
            currentTimeIndex={currentTimeIndex}
            onTimeIndexChange={setCurrentTimeIndex}
            animationSpeed={animationSpeed}
            onSpeedChange={setAnimationSpeed}
            trajectoryData={trajectoryData}
            showBreedingSuitability={showBreedingSuitability}
            onToggleBreedingSuitability={setShowBreedingSuitability}
            showOutbreakStages={showOutbreakStages}
            onToggleOutbreakStages={setShowOutbreakStages}
          />
        </div>

        {/* Main Map Content */}
        <div className="flex-1 relative">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pest-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading trajectory data...</p>
              </div>
            </div>
          )}

          {/* Map */}
          <TrajectoryMap
            trajectoryData={trajectoryData}
            isPlaying={isPlaying}
            currentTimeIndex={currentTimeIndex}
            onTimeIndexChange={setCurrentTimeIndex}
            animationSpeed={animationSpeed}
            selectedCountry={selectedCountry}
            showBreedingSuitability={showBreedingSuitability}
            showOutbreakStages={showOutbreakStages}
          />

          {/* Sidebar Toggle Button */}
          <Button
            onClick={toggleSidebar}
            className="absolute top-4 left-4 z-40 w-10 h-10 p-0 bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            variant="outline"
          >
            <Menu size={16} />
          </Button>

          {/* Legend */}
          <MapLegend />
        </div>
      </div>
    </div>
  );
}
