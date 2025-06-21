import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layers } from "lucide-react";

interface LayerControlProps {
  selectedBasemap: string;
  onBasemapChange: (basemap: string) => void;
  showAdminBoundaries: boolean;
  onToggleAdminBoundaries: (show: boolean) => void;
}

export default function LayerControl({
  selectedBasemap,
  onBasemapChange,
  showAdminBoundaries,
  onToggleAdminBoundaries,
}: LayerControlProps) {
  return (
    <div className="absolute bottom-4 right-4 z-[1000]">
      <Card className="bg-white border-2 border-gray-300 shadow-lg w-8 h-8 flex items-center justify-center group hover:w-72 hover:h-auto transition-all duration-200">
        <Layers size={16} className="text-gray-600 group-hover:hidden" />
        
        <CardContent className="hidden group-hover:block p-3 w-full">
          <div className="space-y-3">
            {/* Basemap Selection */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2">Basemap</h4>
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

            {/* Administrative Boundaries */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="admin-boundaries" className="text-xs text-gray-600">Country Boundaries</label>
                <Switch
                  id="admin-boundaries"
                  checked={showAdminBoundaries}
                  onCheckedChange={onToggleAdminBoundaries}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}