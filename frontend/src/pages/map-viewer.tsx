import { useState, useEffect } from "react";
import TrajectoryMap from "../components/map/trajectory-map";
import MapSidebar from "../components/map/map-sidebar";
import IconLayerControl from "../components/map/icon-layer-control";
import { Layers, X } from "lucide-react";
import { loadTrajectoryData } from "../lib/trajectory-data";
import { dekadToDateString } from "../components/ui/dekadal-selector";

export default function MapViewer() {
  const [isLoading, setIsLoading] = useState(true);
  const [trajectoryData, setTrajectoryData] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [activeDataType, setActiveDataType] = useState("monitoring");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(250);

  const [showOutbreakStages, setShowOutbreakStages] = useState(false);
  const [selectedBasemap, setSelectedBasemap] = useState("icpac-droughtwatch");
  const [showAdminBoundaries, setShowAdminBoundaries] = useState(true);
  const [showAdmin0, setShowAdmin0] = useState(true);
  const [showAdmin1, setShowAdmin1] = useState(false);
  const [showFeedingSusceptibility, setShowFeedingSusceptibility] = useState(false);
  const [showGregarization, setShowGregarization] = useState(false);
  const [showLocustCoverage, setShowLocustCoverage] = useState(false);
  const [showTemporalBreeding, setShowTemporalBreeding] = useState(false);
  const [selectedBreedingMonth, setSelectedBreedingMonth] = useState("jan");
  const [showTrajectory, setShowTrajectory] = useState(false);
  const [showHopperProbability, setShowHopperProbability] = useState(false);
  const [selectedHopperYear, setSelectedHopperYear] = useState(2024);
  const [selectedHopperMonth, setSelectedHopperMonth] = useState(5);
  const [selectedHopperDekad, setSelectedHopperDekad] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="h-full flex bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
        <div className="h-full">
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
            showHopperProbability={showHopperProbability}
            onToggleHopperProbability={setShowHopperProbability}
            selectedHopperYear={selectedHopperYear}
            selectedHopperMonth={selectedHopperMonth}
            selectedHopperDekad={selectedHopperDekad}
            onHopperYearChange={setSelectedHopperYear}
            onHopperMonthChange={setSelectedHopperMonth}
            onHopperDekadChange={setSelectedHopperDekad}
          />
        </div>
      </aside>

        {/* Mobile Bottom Sheet Overlay */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50"
            style={{ zIndex: 99998 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Professional Responsive Bottom Sheet */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-x-0 bottom-0 bg-white shadow-2xl rounded-t-3xl"
            style={{
              zIndex: 99999,
              boxShadow: '0 -10px 25px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)',
              maxHeight: '85vh',
              minHeight: '50vh'
            }}
          >
            {/* Responsive Drag Handle */}
            <div className="flex justify-center pt-2 sm:pt-3 pb-1 sm:pb-2">
              <div className="w-10 sm:w-12 h-1 sm:h-1.5 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Responsive Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-green-100 sticky top-0 z-10">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-green-800">All Data Layers</h2>
                <p className="text-xs sm:text-sm text-green-600 mt-1">East Africa Pest Monitoring</p>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center text-green-600 hover:text-green-800 hover:bg-gray-50 transition-all duration-200"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
            
            {/* Adaptive Scrollable Content */}
            <div 
              className="flex-1 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              style={{
                maxHeight: 'calc(80vh - 140px)', // Responsive height calculation
                minHeight: '40vh',
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e0 #f7fafc',
                scrollBehavior: 'smooth'
              }}
            >
              <div className="p-2 sm:p-3 md:p-4 pb-6">
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
                  showHopperProbability={showHopperProbability}
                  onToggleHopperProbability={setShowHopperProbability}
                  selectedHopperYear={selectedHopperYear}
                  selectedHopperMonth={selectedHopperMonth}
                  selectedHopperDekad={selectedHopperDekad}
                  onHopperYearChange={setSelectedHopperYear}
                  onHopperMonthChange={setSelectedHopperMonth}
                  onHopperDekadChange={setSelectedHopperDekad}
                />
              </div>
            </div>
          </div>
        )}

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden lg:pb-0 pb-20">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading trajectory data...</p>
              </div>
            </div>
          )}

          {/* Map Container */}
          <div className="absolute inset-0">
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

              showOutbreakStages={showOutbreakStages}
              selectedBasemap={selectedBasemap}
              showAdminBoundaries={showAdminBoundaries}
              showAdmin0={showAdmin0}
              showAdmin1={showAdmin1}
              showFeedingSusceptibility={showFeedingSusceptibility}
              showGregarization={showGregarization}
              showLocustCoverage={showLocustCoverage}
              showTemporalBreeding={showTemporalBreeding}
              selectedBreedingMonth={selectedBreedingMonth}
              showTrajectory={showTrajectory}
              showHopperProbability={showHopperProbability}
              selectedHopperDekad={dekadToDateString(selectedHopperYear, selectedHopperMonth, selectedHopperDekad)}
            />
          </div>

          {/* Icon-based Layer Control */}
          <IconLayerControl
            selectedBasemap={selectedBasemap}
            onBasemapChange={setSelectedBasemap}
            showAdminBoundaries={showAdminBoundaries}
            onToggleAdminBoundaries={setShowAdminBoundaries}
            showAdmin0={showAdmin0}
            onToggleAdmin0={setShowAdmin0}
            showAdmin1={showAdmin1}
            onToggleAdmin1={setShowAdmin1}
          />




      </main>

      {/* Professional Mobile Control Bar */}
      <div 
        className="block lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200" 
        style={{ 
          zIndex: 999990,
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.12)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)'
        }}
      >
        <div className="px-4 py-4 space-y-3">
          {/* Professional Action Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 active:scale-95 text-white font-semibold px-8 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all duration-300 border border-green-500"
              style={{
                boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)'
              }}
            >
              <Layers className="h-5 w-5" />
              <span>All Layers</span>
            </button>
          </div>
          
          {/* Enhanced Status Indicators */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${showTrajectory ? 'bg-blue-500 shadow-lg' : 'bg-gray-300'}`}></div>
              <span className="text-xs font-medium text-gray-600">Trajectory</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${showOutbreakStages ? 'bg-red-500 shadow-lg' : 'bg-gray-300'}`}></div>
              <span className="text-xs font-medium text-gray-600">Outbreaks</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${showAdminBoundaries ? 'bg-yellow-500 shadow-lg' : 'bg-gray-300'}`}></div>
              <span className="text-xs font-medium text-gray-600">Boundaries</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${showTemporalBreeding ? 'bg-green-500 shadow-lg' : 'bg-gray-300'}`}></div>
              <span className="text-xs font-medium text-gray-600">Breeding</span>
            </div>
          </div>
        </div>
        
        {/* Safe Area Padding for iOS */}
        <div className="h-safe-area-inset-bottom"></div>
      </div>
    </div>
  );
}