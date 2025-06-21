import { useState, useEffect } from "react";
import TrajectoryMap from "@/components/map/trajectory-map";
import MapSidebar from "@/components/map/map-sidebar";
import IconLayerControl from "@/components/map/icon-layer-control";
import Footer from "@/components/layout/footer";
import Navigation from "@/components/layout/navigation";
import { loadTrajectoryData } from "@/lib/trajectory-data";

export default function MapViewer() {
  const [isLoading, setIsLoading] = useState(true);
  const [trajectoryData, setTrajectoryData] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [activeDataType, setActiveDataType] = useState("monitoring");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(200);
  const [showBreedingSuitability, setShowBreedingSuitability] = useState(false);
  const [showOutbreakStages, setShowOutbreakStages] = useState(true);
  const [selectedBasemap, setSelectedBasemap] = useState("osm");
  const [showAdminBoundaries, setShowAdminBoundaries] = useState(false);
  const [showFeedingSusceptibility, setShowFeedingSusceptibility] = useState(false);
  const [showGregarization, setShowGregarization] = useState(false);
  const [showLocustCoverage, setShowLocustCoverage] = useState(false);
  const [showTemporalBreeding, setShowTemporalBreeding] = useState(false);
  const [selectedBreedingMonth, setSelectedBreedingMonth] = useState("jan");
  const [showTrajectory, setShowTrajectory] = useState(false);

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
    <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden fixed inset-0">
      {/* Navigation Bar */}
      <Navigation />
      
      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar - Permanently Pinned */}
        <div className="w-80 flex-shrink-0 z-30 bg-white border-r border-gray-200 overflow-y-auto">
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
            showFeedingSusceptibility={showFeedingSusceptibility}
            onToggleFeedingSusceptibility={setShowFeedingSusceptibility}
            showGregarization={showGregarization}
            onToggleGregarization={setShowGregarization}
            showLocustCoverage={showLocustCoverage}
            onToggleLocustCoverage={setShowLocustCoverage}
            showTemporalBreeding={showTemporalBreeding}
            onToggleTemporalBreeding={setShowTemporalBreeding}
            selectedBreedingMonth={selectedBreedingMonth}
            onBreedingMonthChange={setSelectedBreedingMonth}
            showTrajectory={showTrajectory}
            onToggleTrajectory={setShowTrajectory}
          />
        </div>

        {/* Main Map Content - Fixed to remaining space */}
        <div className="flex-1 relative overflow-hidden">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pest-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading trajectory data...</p>
              </div>
            </div>
          )}

          {/* Map Container - Fixed with footer space */}
          <div className="absolute inset-0 bottom-10">
            <TrajectoryMap
              trajectoryData={trajectoryData}
              isPlaying={isPlaying}
              currentTimeIndex={currentTimeIndex}
              onTimeIndexChange={setCurrentTimeIndex}
              animationSpeed={animationSpeed}
              onPlay={playAnimation}
              onPause={pauseAnimation}
              onReset={resetAnimation}
              onSpeedChange={setAnimationSpeed}
              selectedCountry={selectedCountry}
              showBreedingSuitability={showBreedingSuitability}
              showOutbreakStages={showOutbreakStages}
              selectedBasemap={selectedBasemap}
              showAdminBoundaries={showAdminBoundaries}
              showFeedingSusceptibility={showFeedingSusceptibility}
              showGregarization={showGregarization}
              showLocustCoverage={showLocustCoverage}
              showTemporalBreeding={showTemporalBreeding}
              selectedBreedingMonth={selectedBreedingMonth}
              showTrajectory={showTrajectory}
            />
          </div>

          {/* Icon-based Layer Control */}
          <IconLayerControl
            selectedBasemap={selectedBasemap}
            onBasemapChange={setSelectedBasemap}
            showAdminBoundaries={showAdminBoundaries}
            onToggleAdminBoundaries={setShowAdminBoundaries}
          />

          {/* Footer - Fixed at bottom */}
          <Footer />
        </div>
      </div>
    </div>
  );
}