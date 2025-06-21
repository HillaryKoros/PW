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
    <div className="absolute bottom-4 right-4 z-[1000] max-h-96 overflow-y-auto">
      <Card className="bg-white border border-gray-300 shadow-lg w-48">
        <CardContent className="p-2">
          <div className="space-y-2">
            {/* Header */}
            <div className="flex items-center gap-1 pb-1 border-b border-gray-200">
              <Layers size={12} className="text-gray-600" />
              <span className="text-xs font-medium text-gray-700">Layers</span>
            </div>
            
            {/* Basemap Selection */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-1">Basemap</h4>
              <Select value={selectedBasemap} onValueChange={onBasemapChange}>
                <SelectTrigger className="w-full h-6 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="osm">OpenStreetMap</SelectItem>
                  <SelectItem value="esri-satellite">ESRI Satellite</SelectItem>
                  <SelectItem value="google-satellite">Google Satellite</SelectItem>
                  <SelectItem value="esri-terrain">ESRI Terrain</SelectItem>
                  <SelectItem value="terrain">Terrain</SelectItem>
                  <SelectItem value="cartodb">Light</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Administrative Boundaries */}
            <div className="flex items-center justify-between">
              <label htmlFor="admin-boundaries" className="text-xs text-gray-600">Boundaries</label>
              <Switch
                id="admin-boundaries"
                checked={showAdminBoundaries}
                onCheckedChange={onToggleAdminBoundaries}
                className="scale-75"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}