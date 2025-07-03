import { Card, CardContent } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Layers, Map, Globe } from "lucide-react";
import { useState } from "react";

interface IconLayerControlProps {
  selectedBasemap: string;
  onBasemapChange: (basemap: string) => void;
  showAdminBoundaries: boolean;
  onToggleAdminBoundaries: (show: boolean) => void;
  showAdmin0?: boolean;
  onToggleAdmin0?: (show: boolean) => void;
  showAdmin1?: boolean;
  onToggleAdmin1?: (show: boolean) => void;
}

export default function IconLayerControl({
  selectedBasemap,
  onBasemapChange,
  showAdminBoundaries,
  onToggleAdminBoundaries,
  showAdmin0 = true,
  onToggleAdmin0,
  showAdmin1 = true,
  onToggleAdmin1,
}: IconLayerControlProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="absolute bottom-4 right-4 z-[1000]">
      {!isExpanded ? (
        /* Collapsed Icon State */
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-white hover:bg-gray-50 border border-gray-300 shadow-lg rounded p-2 transition-colors"
        >
          <Layers size={18} className="text-gray-700" />
        </button>
      ) : (
        /* Expanded Control State */
        <Card className="bg-white border border-gray-300 shadow-lg w-56">
          <CardContent className="p-3">
            <div className="space-y-3">
              {/* Header with close button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Layers size={14} />
                  <span className="text-sm font-medium text-gray-700">Map Controls</span>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-600 text-lg"
                >
                  ×
                </button>
              </div>



              {/* Basemap Selection */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Map size={12} />
                  <label className="text-xs font-medium text-gray-700">Basemap</label>
                </div>
                <Select value={selectedBasemap} onValueChange={onBasemapChange}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="osm">OpenStreetMap</SelectItem>
                    <SelectItem value="satellite">Satellite</SelectItem>
                    <SelectItem value="terrain">Terrain</SelectItem>
                    <SelectItem value="cartodb">CartoDB Light</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="icpac-droughtwatch">ICPAC Basemap</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Overlay Layers */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Globe size={12} />
                  <label className="text-xs font-medium text-gray-700">Overlays</label>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showAdmin0}
                      onChange={(e) => onToggleAdmin0?.(e.target.checked)}
                      className="w-3 h-3 rounded"
                    />
                    <span className="text-xs text-gray-600">Admin 0</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showAdmin1}
                      onChange={(e) => onToggleAdmin1?.(e.target.checked)}
                      className="w-3 h-3 rounded"
                    />
                    <span className="text-xs text-gray-600">Admin 1</span>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}