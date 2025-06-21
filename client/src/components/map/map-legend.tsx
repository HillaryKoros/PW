import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expand, Minimize2 } from "lucide-react";
import { useState } from "react";
import { BREEDING_SUITABILITY_COLORS, OUTBREAK_STAGE_COLORS } from "@/lib/spatial-data";

interface MapLegendProps {
  showBreedingSuitability?: boolean;
  showOutbreakStages?: boolean;
}

export default function MapLegend({ 
  showBreedingSuitability = false, 
  showOutbreakStages = true 
}: MapLegendProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="absolute top-4 right-4 min-w-48 z-50 bg-white border border-gray-300 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Legend</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 h-auto"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <Minimize2 className="text-gray-500 hover:text-gray-700" size={12} />
            ) : (
              <Expand className="text-gray-500 hover:text-gray-700" size={12} />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 pb-3 space-y-4">
          {/* Outbreak Stages */}
          {showOutbreakStages && (
            <div>
              <h4 className="text-xs font-medium text-gray-600 mb-2">Locust Phases</h4>
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF0000' }}></div>
                  <span className="text-xs text-gray-700">Gregarious (Swarming)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF8C00' }}></div>
                  <span className="text-xs text-gray-700">Transiens (Transitional)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#32CD32' }}></div>
                  <span className="text-xs text-gray-700">Solitary (Individual)</span>
                </div>
              </div>
            </div>
          )}

          {/* Trajectory Points */}
          <div>
            <h4 className="text-xs font-medium text-gray-600 mb-2">Trajectory Data</h4>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF6B6B' }}></div>
                <span className="text-xs text-gray-700">High Risk Swarm</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFA500' }}></div>
                <span className="text-xs text-gray-700">Moderate Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#90EE90' }}></div>
                <span className="text-xs text-gray-700">Low Risk</span>
              </div>
            </div>
          </div>

          {/* Breeding Suitability */}
          {showBreedingSuitability && (
            <div>
              <h4 className="text-xs font-medium text-gray-600 mb-2">Breeding Suitability</h4>
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: BREEDING_SUITABILITY_COLORS[4] }}></div>
                  <span className="text-xs text-gray-700">High Suitability</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: BREEDING_SUITABILITY_COLORS[3] }}></div>
                  <span className="text-xs text-gray-700">Moderate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: BREEDING_SUITABILITY_COLORS[2] }}></div>
                  <span className="text-xs text-gray-700">Low</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: BREEDING_SUITABILITY_COLORS[1] }}></div>
                  <span className="text-xs text-gray-700">Unsuitable</span>
                </div>
              </div>
            </div>
          )}

          {/* Trajectory Risk Levels */}
          <div>
            <h4 className="text-xs font-medium text-gray-600 mb-2">Outbreak Probability</h4>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full border border-gray-300"></div>
                <span className="text-xs text-gray-700">High Risk &gt;6</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full border border-gray-300"></div>
                <span className="text-xs text-gray-700">Moderate 3-6</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full border border-gray-300"></div>
                <span className="text-xs text-gray-700">Low Risk &lt;3</span>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
