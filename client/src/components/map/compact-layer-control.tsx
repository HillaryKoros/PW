import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layers, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CompactLayerControlProps {
  selectedBasemap: string;
  onBasemapChange: (basemap: string) => void;
  showAdminBoundaries: boolean;
  onToggleAdminBoundaries: (show: boolean) => void;
}

export default function CompactLayerControl({
  selectedBasemap,
  onBasemapChange,
  showAdminBoundaries,
  onToggleAdminBoundaries,
}: CompactLayerControlProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['basemaps', 'reference']));

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
    <div className="absolute bottom-12 right-4 z-[1000]">
      <Card className="bg-white border border-gray-300 shadow-lg w-48">
        <CardContent className="p-2">
          <div className="space-y-2">
            {/* Header */}
            <div className="flex items-center space-x-1 pb-2 border-b border-gray-200">
              <Layers size={14} />
              <span className="text-xs font-medium text-gray-700">Map Controls</span>
            </div>

            {/* Basemaps Section */}
            <div>
              <button
                onClick={() => toggleSection('basemaps')}
                className="flex items-center justify-between w-full py-1 text-xs font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Basemaps</span>
                {expandedSections.has('basemaps') ? (
                  <ChevronDown size={12} />
                ) : (
                  <ChevronRight size={12} />
                )}
              </button>
              
              {expandedSections.has('basemaps') && (
                <div className="ml-2 mt-1 space-y-1">
                  <Select value={selectedBasemap} onValueChange={onBasemapChange}>
                    <SelectTrigger className="h-6 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="osm">OpenStreetMap</SelectItem>
                      <SelectItem value="satellite">Satellite</SelectItem>
                      <SelectItem value="terrain">Terrain</SelectItem>
                      <SelectItem value="cartodb">CartoDB Light</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Reference Layers Section */}
            <div>
              <button
                onClick={() => toggleSection('reference')}
                className="flex items-center justify-between w-full py-1 text-xs font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Reference</span>
                {expandedSections.has('reference') ? (
                  <ChevronDown size={12} />
                ) : (
                  <ChevronRight size={12} />
                )}
              </button>
              
              {expandedSections.has('reference') && (
                <div className="ml-2 mt-1">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showAdminBoundaries}
                      onChange={(e) => onToggleAdminBoundaries(e.target.checked)}
                      className="w-3 h-3 rounded"
                    />
                    <span className="text-xs text-gray-600">Admin Boundaries</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}