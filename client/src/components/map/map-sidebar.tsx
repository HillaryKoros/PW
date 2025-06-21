import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";
import { getUniqueParticleCount, getDateFromTimeIndex } from "@/lib/map-utils";

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
  trajectoryData
}: MapSidebarProps) {

  const countries = [
    "All Countries",
    "Ethiopia",
    "Somalia", 
    "Kenya",
    "Uganda",
    "Sudan"
  ];

  const particleCount = trajectoryData ? getUniqueParticleCount(trajectoryData) : 0;
  const currentDate = getDateFromTimeIndex(currentTimeIndex);
  const maxTimeIndex = 365; // One year of data

  return (
    <div className="w-80 bg-white shadow-lg flex-shrink-0 border-r border-gray-200 slide-in h-full">
      {/* Country Filter */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter by Country</h2>
        <Select value={selectedCountry} onValueChange={onCountryChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Sidebar Controls */}
      <div className="p-6 space-y-6 overflow-y-auto">
        {/* Data Type Controls */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Data Controls</h3>
          <div className="flex space-x-2">
            <Button
              onClick={() => onDataTypeChange("monitoring")}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeDataType === "monitoring"
                  ? "pest-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              variant={activeDataType === "monitoring" ? "default" : "secondary"}
            >
              Monitoring Data
            </Button>
            <Button
              onClick={() => onDataTypeChange("forecast")}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeDataType === "forecast"
                  ? "pest-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              variant={activeDataType === "forecast" ? "default" : "secondary"}
            >
              Forecast Data
            </Button>
          </div>
        </div>
        
        {/* Animation Controls */}
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Trajectory Animation</h3>
            <div className="flex items-center space-x-3 mb-4">
              <Button
                onClick={isPlaying ? onPause : onPlay}
                className="w-12 h-12 p-0 pest-green-600 text-white rounded-full hover:bg-pest-green-700"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </Button>
              <Button
                onClick={onReset}
                className="w-12 h-12 p-0 bg-gray-300 text-gray-600 rounded-full hover:bg-gray-400"
                variant="secondary"
              >
                <RotateCcw size={18} />
              </Button>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={maxTimeIndex}
                  value={currentTimeIndex}
                  onChange={(e) => onTimeIndexChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
            <div className="text-xs text-gray-600">
              <span>{currentDate}</span> - <span>{maxTimeIndex} days</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Speed Control */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Animation Speed</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Slow</span>
            <input
              type="range"
              min="50"
              max="500"
              value={animationSpeed}
              onChange={(e) => onSpeedChange(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-500">Fast</span>
          </div>
        </div>
        
        {/* Particle Count */}
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Active Trajectories</h3>
            <div className="text-2xl font-bold text-blue-600">{particleCount}</div>
            <div className="text-xs text-blue-600">Locust swarms tracked</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
