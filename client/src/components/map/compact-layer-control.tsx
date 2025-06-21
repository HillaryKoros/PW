import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layers, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CompactLayerControlProps {
  selectedBasemap: string;
  onBasemapChange: (basemap: string) => void;
  showAdminBoundaries: boolean;
  onToggleAdminBoundaries: (show: boolean) => void;
  showBreedingSuitability?: boolean;
  onToggleBreedingSuitability?: (show: boolean) => void;
  showFeedingSusceptibility?: boolean;
  onToggleFeedingSusceptibility?: (show: boolean) => void;
  showGregarization?: boolean;
  onToggleGregarization?: (show: boolean) => void;
  showLocustCoverage?: boolean;
  onToggleLocustCoverage?: (show: boolean) => void;
  showTemporalBreeding?: boolean;
  onToggleTemporalBreeding?: (show: boolean) => void;
  showTrajectory?: boolean;
  onToggleTrajectory?: (show: boolean) => void;
  selectedBreedingMonth?: string;
  onBreedingMonthChange?: (month: string) => void;
}

export default function CompactLayerControl({
  selectedBasemap,
  onBasemapChange,
  showAdminBoundaries,
  onToggleAdminBoundaries,
  showBreedingSuitability = false,
  onToggleBreedingSuitability,
  showFeedingSusceptibility = false,
  onToggleFeedingSusceptibility,
  showGregarization = false,
  onToggleGregarization,
  showLocustCoverage = false,
  onToggleLocustCoverage,
  showTemporalBreeding = false,
  onToggleTemporalBreeding,
  showTrajectory = false,
  onToggleTrajectory,
  selectedBreedingMonth = "jan",
  onBreedingMonthChange,
}: CompactLayerControlProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['raster', 'vector']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="absolute bottom-4 right-4 z-[1000] max-h-80 overflow-y-auto">
      <Card className="bg-white border border-gray-300 shadow-lg w-56">
        <CardContent className="p-2">
          <div className="space-y-2">
            {/* Header */}
            <div className="flex items-center gap-1 pb-1 border-b border-gray-200">
              <Layers size={12} className="text-gray-600" />
              <span className="text-xs font-medium text-gray-700">Layers</span>
            </div>
            
            {/* Basemap */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-1">Basemap</h4>
              <Select value={selectedBasemap} onValueChange={onBasemapChange}>
                <SelectTrigger className="w-full h-6 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="osm">OpenStreetMap</SelectItem>
                  <SelectItem value="esri-satellite">Satellite</SelectItem>
                  <SelectItem value="terrain">Terrain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Raster Layers */}
            <div>
              <div 
                className="flex items-center justify-between cursor-pointer py-1"
                onClick={() => toggleSection('raster')}
              >
                <span className="text-xs font-medium text-gray-700">Raster Layers</span>
                {expandedSections.has('raster') ? 
                  <ChevronDown size={12} className="text-gray-500" /> :
                  <ChevronRight size={12} className="text-gray-500" />
                }
              </div>
              {expandedSections.has('raster') && (
                <div className="ml-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-600">Breeding Suitability</label>
                    <Switch
                      checked={showBreedingSuitability}
                      onCheckedChange={onToggleBreedingSuitability}
                      className="scale-75"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-600">Feeding Susceptibility</label>
                    <Switch
                      checked={showFeedingSusceptibility}
                      onCheckedChange={onToggleFeedingSusceptibility}
                      className="scale-75"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-600">Gregarization</label>
                    <Switch
                      checked={showGregarization}
                      onCheckedChange={onToggleGregarization}
                      className="scale-75"
                    />
                  </div>
                  {showTemporalBreeding && (
                    <div className="ml-2 mt-1">
                      <Select value={selectedBreedingMonth} onValueChange={onBreedingMonthChange}>
                        <SelectTrigger className="w-full h-5 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jan">January</SelectItem>
                          <SelectItem value="feb">February</SelectItem>
                          <SelectItem value="mar">March</SelectItem>
                          <SelectItem value="apr">April</SelectItem>
                          <SelectItem value="may">May</SelectItem>
                          <SelectItem value="jun">June</SelectItem>
                          <SelectItem value="jul">July</SelectItem>
                          <SelectItem value="aug">August</SelectItem>
                          <SelectItem value="sep">September</SelectItem>
                          <SelectItem value="oct">October</SelectItem>
                          <SelectItem value="nov">November</SelectItem>
                          <SelectItem value="dec">December</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Vector Layers */}
            <div>
              <div 
                className="flex items-center justify-between cursor-pointer py-1"
                onClick={() => toggleSection('vector')}
              >
                <span className="text-xs font-medium text-gray-700">Vector Layers</span>
                {expandedSections.has('vector') ? 
                  <ChevronDown size={12} className="text-gray-500" /> :
                  <ChevronRight size={12} className="text-gray-500" />
                }
              </div>
              {expandedSections.has('vector') && (
                <div className="ml-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-600">Swarm Coverage</label>
                    <Switch
                      checked={showLocustCoverage}
                      onCheckedChange={onToggleLocustCoverage}
                      className="scale-75"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-600">Particle Trajectories</label>
                    <Switch
                      checked={showTrajectory}
                      onCheckedChange={onToggleTrajectory}
                      className="scale-75"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-600">Boundaries</label>
                    <Switch
                      checked={showAdminBoundaries}
                      onCheckedChange={onToggleAdminBoundaries}
                      className="scale-75"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}