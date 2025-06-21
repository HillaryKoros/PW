import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layers, Map, Globe } from "lucide-react";

interface LayerControlProps {
  showBreedingSuitability: boolean;
  onToggleBreedingSuitability: (show: boolean) => void;
  showOutbreakStages: boolean;
  onToggleOutbreakStages: (show: boolean) => void;
  selectedBasemap: string;
  onBasemapChange: (basemap: string) => void;
  showAdminBoundaries: boolean;
  onToggleAdminBoundaries: (show: boolean) => void;
  showFeedingSusceptibility?: boolean;
  onToggleFeedingSusceptibility?: (show: boolean) => void;
}

export default function LayerControl({
  showBreedingSuitability,
  onToggleBreedingSuitability,
  showOutbreakStages,
  onToggleOutbreakStages,
  selectedBasemap,
  onBasemapChange,
  showAdminBoundaries,
  onToggleAdminBoundaries,
  showFeedingSusceptibility = false,
  onToggleFeedingSusceptibility
}: LayerControlProps) {
  return (
    <Card className="absolute bottom-4 right-4 min-w-72 z-[1000] bg-white border-2 border-gray-400 shadow-xl">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Basemap Selection */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Map size={14} className="text-gray-600" />
              <h4 className="text-xs font-medium text-gray-700">Basemap</h4>
            </div>
            <Select value={selectedBasemap} onValueChange={onBasemapChange}>
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="osm">OpenStreetMap</SelectItem>
                <SelectItem value="esri-satellite">ESRI Satellite</SelectItem>
                <SelectItem value="google-satellite">Google Satellite</SelectItem>
                <SelectItem value="esri-terrain">ESRI Terrain</SelectItem>
                <SelectItem value="terrain">OpenTopo Terrain</SelectItem>
                <SelectItem value="cartodb">CartoDB Positron</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Administrative Layers */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Globe size={14} className="text-gray-600" />
              <h4 className="text-xs font-medium text-gray-700">Administrative</h4>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="admin-boundaries" className="text-xs text-gray-600">Country Boundaries</label>
              <Switch
                id="admin-boundaries"
                checked={showAdminBoundaries}
                onCheckedChange={onToggleAdminBoundaries}
              />
            </div>
          </div>

          {/* Model Output Layers */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Layers size={14} className="text-gray-600" />
              <h4 className="text-xs font-medium text-gray-700">Model Outputs</h4>
            </div>
            <div className="space-y-2">
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
                <label htmlFor="feeding-susceptibility" className="text-xs text-gray-600">Feeding Susceptibility</label>
                <Switch
                  id="feeding-susceptibility"
                  checked={showFeedingSusceptibility}
                  onCheckedChange={onToggleFeedingSusceptibility}
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="temporal-breeding" className="text-xs text-gray-500">Temporal Breeding</label>
                <Switch
                  id="temporal-breeding"
                  checked={false}
                  disabled
                  onCheckedChange={() => {}}
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="gregarization" className="text-xs text-gray-500">Gregarization & Swarming</label>
                <Switch
                  id="gregarization"
                  checked={false}
                  disabled
                  onCheckedChange={() => {}}
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="feeding-susceptibility" className="text-xs text-gray-500">Feeding Susceptibility</label>
                <Switch
                  id="feeding-susceptibility"
                  checked={false}
                  disabled
                  onCheckedChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}