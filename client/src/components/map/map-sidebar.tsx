import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw } from "lucide-react";

interface MapSidebarProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  activeDataType: string;
  onDataTypeChange: (type: string) => void;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  currentTimeIndex: number;
  onTimeIndexChange: (index: number) => void;
  animationSpeed: number;
  onSpeedChange: (speed: number) => void;
  trajectoryData: any;
  showBreedingSuitability?: boolean;
  onToggleBreedingSuitability?: (show: boolean) => void;
  showOutbreakStages?: boolean;
  onToggleOutbreakStages?: (show: boolean) => void;
  showFeedingSusceptibility?: boolean;
  onToggleFeedingSusceptibility?: (show: boolean) => void;
  showGregarization?: boolean;
  onToggleGregarization?: (show: boolean) => void;
  showLocustCoverage?: boolean;
  onToggleLocustCoverage?: (show: boolean) => void;
  showTemporalBreeding?: boolean;
  onToggleTemporalBreeding?: (show: boolean) => void;
  selectedBreedingMonth?: string;
  onBreedingMonthChange?: (month: string) => void;
  showTrajectory?: boolean;
  onToggleTrajectory?: (show: boolean) => void;
}

export default function MapSidebar({
  selectedCountry,
  onCountryChange,
  activeDataType,
  onDataTypeChange,
  isPlaying,
  onPlay,
  onPause,
  onReset,
  currentTimeIndex,
  onTimeIndexChange,
  animationSpeed,
  onSpeedChange,
  trajectoryData,
  showBreedingSuitability = false,
  onToggleBreedingSuitability,
  showOutbreakStages = true,
  onToggleOutbreakStages,
  showFeedingSusceptibility = false,
  onToggleFeedingSusceptibility,
  showGregarization = false,
  onToggleGregarization,
  showLocustCoverage = false,
  onToggleLocustCoverage,
  showTemporalBreeding = false,
  onToggleTemporalBreeding,
  selectedBreedingMonth = "jan",
  onBreedingMonthChange,
  showTrajectory = false,
  onToggleTrajectory
}: MapSidebarProps) {

  const countries = [
    "All Countries",
    "Ethiopia",
    "Somalia", 
    "Kenya",
    "Uganda",
    "Sudan"
  ];

  const maxTimeIndex = trajectoryData?.features?.length ? Math.max(...trajectoryData.features.map((f: any) => parseInt(f.properties.time))) : 365;

  return (
    <div className="w-72 bg-white shadow-lg flex-shrink-0 border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-800">Layers</h2>
      </div>
      
      {/* Layer Controls - Scrollable */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Model Output Layers */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Model Output Layers</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="outbreak-stages" className="text-xs text-gray-600">Outbreak Stages</label>
              <Switch
                id="outbreak-stages"
                checked={showOutbreakStages}
                onCheckedChange={onToggleOutbreakStages}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="breeding-suitability" className="text-xs text-gray-600">Breeding Suitability</label>
              <Switch
                id="breeding-suitability"
                checked={showBreedingSuitability}
                onCheckedChange={onToggleBreedingSuitability}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="feeding-susceptibility" className="text-xs text-gray-600">Feeding Susceptibility (TIFF)</label>
              <Switch
                id="feeding-susceptibility"
                checked={showFeedingSusceptibility}
                onCheckedChange={onToggleFeedingSusceptibility}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="gregarization" className="text-xs text-gray-600">Gregarization & Swarming (Maxent)</label>
              <Switch
                id="gregarization"
                checked={showGregarization}
                onCheckedChange={onToggleGregarization}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="locust-coverage" className="text-xs text-gray-600">Locust Swarm Coverage</label>
              <Switch
                id="locust-coverage"
                checked={showLocustCoverage}
                onCheckedChange={onToggleLocustCoverage}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="temporal-breeding" className="text-xs text-gray-600">Temporal Breeding Suitability</label>
              <Switch
                id="temporal-breeding"
                checked={showTemporalBreeding}
                onCheckedChange={onToggleTemporalBreeding}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="trajectory" className="text-xs text-gray-600">Swarm Trajectory</label>
              <Switch
                id="trajectory"
                checked={showTrajectory}
                onCheckedChange={onToggleTrajectory}
              />
            </div>

            {showTemporalBreeding && (
              <div className="ml-4 mt-2">
                <label className="text-xs text-gray-600 mb-1 block">Select Month:</label>
                <Select value={selectedBreedingMonth} onValueChange={onBreedingMonthChange}>
                  <SelectTrigger className="w-full h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jan">January 2025</SelectItem>
                    <SelectItem value="feb">February 2025</SelectItem>
                    <SelectItem value="apr">April 2024</SelectItem>
                    <SelectItem value="jul">July 2024</SelectItem>
                    <SelectItem value="nov">November 2024</SelectItem>
                    <SelectItem value="dec">December 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="mt-2">
            <span className="text-xs text-gray-500">Note: Additional layers available via MapCache/MapServer endpoints</span>
          </div>
        </div>

        {/* Animation Controls */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Animation Controls</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Button
                onClick={onPlay}
                disabled={isPlaying}
                size="sm"
                variant="outline"
                className="text-xs px-3 py-1"
              >
                Play
              </Button>
              <Button
                onClick={onPause}
                disabled={!isPlaying}
                size="sm"
                variant="outline"
                className="text-xs px-3 py-1"
              >
                Pause
              </Button>
              <Button
                onClick={onReset}
                size="sm"
                variant="outline"
                className="text-xs px-3 py-1"
              >
                Reset
              </Button>
            </div>
            
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Animation Speed</label>
              <Slider
                value={[animationSpeed]}
                onValueChange={(value) => onSpeedChange(value[0])}
                max={1000}
                min={50}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
