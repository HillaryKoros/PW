import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface MapSidebarProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  activeDataType: string;
  onDataTypeChange: (type: string) => void;
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

  return (
    <div className="w-72 bg-white shadow-lg flex-shrink-0 border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-800">Layers</h2>
      </div>
      
      {/* Layer Controls - Scrollable */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Data Controls */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Data Controls</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded border border-blue-200">
              <input 
                type="radio" 
                id="monitoring-data" 
                name="data-type"
                className="text-blue-600"
                defaultChecked
              />
              <label htmlFor="monitoring-data" className="text-xs text-gray-700 font-medium">Monitoring Data</label>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded border border-gray-200">
              <input 
                type="radio" 
                id="forecast-data" 
                name="data-type"
                className="text-blue-600"
              />
              <label htmlFor="forecast-data" className="text-xs text-gray-700">Forecast Data</label>
            </div>
          </div>
        </div>

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


      </div>
    </div>
  );
}
