import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Info, 
  X, 
  ChevronDown, 
  ChevronRight,
  Bug,
  Navigation,
  Eye,
  Leaf,
  Shield,
  Heart,
  Calendar,
  MapPin,
  CloudRain
} from "lucide-react";
import { getUniqueParticleCount, getDateFromTimeIndex } from "../../lib/map-utils";
import { useState } from "react";

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
  trajectoryData?: any;

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

  showOutbreakStages = false,
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
  // State for collapsible sections
  const [isDesertLocustExpanded, setIsDesertLocustExpanded] = useState(true);
  const [isFallArmywormExpanded, setIsFallArmywormExpanded] = useState(false);
  const [isQueliaBirdsExpanded, setIsQueliaBirdsExpanded] = useState(false);

  const countries = [
    "All Countries",
    "Ethiopia",
    "Somalia", 
    "Kenya",
    "Uganda",
    "Sudan"
  ];

  const particleCount = trajectoryData ? getUniqueParticleCount(trajectoryData) : 0;



  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-2 sm:p-3 bg-white border-b border-gray-200">
        <h2 className="text-xs sm:text-sm font-semibold text-gray-800">PEST WATCH DATA</h2>
      </div>

      {/* Layer Controls - Full height scrollable */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 sm:space-y-3">
        {/* Desert Locust Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader 
            className="pb-2 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsDesertLocustExpanded(!isDesertLocustExpanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bug className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-800">DESERT LOCUST</span>
              </div>
              {isDesertLocustExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          </CardHeader>
          {isDesertLocustExpanded && (
            <CardContent className="pt-0 space-y-3">
              {/* Swarming Trajectory */}
              <div 
                className="flex items-center justify-between p-2 rounded bg-gray-50 border cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onToggleTrajectory(!showTrajectory)}
              >
                <div className="flex items-center gap-2">
                  <Navigation className="h-3 w-3 text-blue-600" />
                  <span className="text-xs text-gray-700">Swarming Trajectory</span>
                </div>
                <Switch
                  checked={showTrajectory}
                  onCheckedChange={onToggleTrajectory}
                  className="scale-75"
                />
              </div>
              
              {/* Outbreak Stages */}
              <div 
                className="flex items-center justify-between p-2 rounded bg-gray-50 border cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onToggleOutbreakStages(!showOutbreakStages)}
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-red-600" />
                  <span className="text-xs text-gray-700">Outbreak Stages</span>
                </div>
                <Switch
                  checked={showOutbreakStages}
                  onCheckedChange={onToggleOutbreakStages}
                  className="scale-75"
                />
              </div>

              {/* Swarm Coverage */}
              <div 
                className="flex items-center justify-between p-2 rounded bg-gray-50 border cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onToggleLocustCoverage(!showLocustCoverage)}
              >
                <div className="flex items-center gap-2">
                  <Eye className="h-3 w-3 text-purple-600" />
                  <span className="text-xs text-gray-700">Swarm Coverage</span>
                </div>
                <Switch
                  checked={showLocustCoverage}
                  onCheckedChange={onToggleLocustCoverage}
                  className="scale-75"
                />
              </div>
              
              {/* Vegetation Onset */}
              <div 
                className="flex items-center justify-between p-2 rounded bg-gray-50 border cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onToggleFeedingSusceptibility(!showFeedingSusceptibility)}
              >
                <div className="flex items-center gap-2">
                  <Leaf className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-gray-700">Vegetation Onset (Feeding Periods)</span>
                </div>
                <Switch
                  checked={showFeedingSusceptibility}
                  onCheckedChange={onToggleFeedingSusceptibility}
                  className="scale-75"
                />
              </div>
              
              {/* Swarming Susceptibility */}
              <div 
                className="flex items-center justify-between p-2 rounded bg-gray-50 border cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onToggleGregarization(!showGregarization)}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-yellow-600" />
                  <span className="text-xs text-gray-700">Swarming Susceptibility (MaxEnt 2021)</span>
                </div>
                <Switch
                  checked={showGregarization}
                  onCheckedChange={onToggleGregarization}
                  className="scale-75"
                />
              </div>
              
              {/* Breeding */}
              <div 
                className="flex items-center justify-between p-2 rounded bg-gray-50 border cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onToggleTemporalBreeding(!showTemporalBreeding)}
              >
                <div className="flex items-center gap-2">
                  <Heart className="h-3 w-3 text-pink-600" />
                  <span className="text-xs text-gray-700">Breeding Suitability</span>
                </div>
                <Switch
                  checked={showTemporalBreeding}
                  onCheckedChange={onToggleTemporalBreeding}
                  className="scale-75"
                />
              </div>

              {showTemporalBreeding && (
                <div className="ml-4 mt-2 p-2 bg-blue-50 rounded border">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-3 w-3 text-blue-600" />
                    <span className="text-xs text-gray-700 font-medium">Select Month:</span>
                  </div>
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
            </CardContent>
          )}
        </Card>

        {/* Fall Army Worm Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader 
            className="pb-2 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsFallArmywormExpanded(!isFallArmywormExpanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bug className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-800">FALL ARMY WORM</span>
              </div>
              {isFallArmywormExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          </CardHeader>
          {isFallArmywormExpanded && (
            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center justify-between p-2 rounded bg-gray-50 border">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-gray-700">Spread Distribution</span>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={() => {}}
                  className="scale-75"
                />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded bg-gray-50 border">
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-orange-600" />
                  <span className="text-xs text-gray-700">Susceptible Areas</span>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={() => {}}
                  className="scale-75"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-gray-50 border">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-3 w-3 text-blue-600" />
                  <span className="text-xs text-gray-700">Seasonal Risk</span>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={() => {}}
                  className="scale-75"
                />
              </div>
            </CardContent>
          )}
        </Card>

        {/* Quelea Birds Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader 
            className="pb-2 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsQueliaBirdsExpanded(!isQueliaBirdsExpanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-sky-600" />
                <span className="text-sm font-medium text-gray-800">QUELEA BIRDS</span>
              </div>
              {isQueliaBirdsExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          </CardHeader>
          {isQueliaBirdsExpanded && (
            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center justify-between p-2 rounded bg-gray-50 border">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-sky-600" />
                  <span className="text-xs text-gray-700">Colony Sites</span>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={() => {}}
                  className="scale-75"
                />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded bg-gray-50 border">
                <div className="flex items-center gap-2">
                  <Navigation className="h-3 w-3 text-purple-600" />
                  <span className="text-xs text-gray-700">Migration Routes</span>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={() => {}}
                  className="scale-75"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-gray-50 border">
                <div className="flex items-center gap-2">
                  <Heart className="h-3 w-3 text-pink-600" />
                  <span className="text-xs text-gray-700">Breeding Areas</span>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={() => {}}
                  className="scale-75"
                />
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}