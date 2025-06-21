import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expand, Minimize2 } from "lucide-react";
import { useState } from "react";
import { BREEDING_SUITABILITY_COLORS, OUTBREAK_STAGE_COLORS } from "@/lib/spatial-data";

interface MapLegendProps {
  showBreedingSuitability?: boolean;
  showOutbreakStages?: boolean;
  showTrajectory?: boolean;
}

export default function MapLegend({ 
  showBreedingSuitability = false, 
  showOutbreakStages = true,
  showTrajectory = false
}: MapLegendProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Don't show legend if no layers are active
  if (!showBreedingSuitability && !showOutbreakStages && !showTrajectory) {
    return null;
  }

  return (
    <div className="absolute bottom-4 right-4 z-[9999] pointer-events-none">
      <Card className="min-w-48 bg-white border border-gray-300 shadow-xl pointer-events-auto">
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
          {showTrajectory && (
            <div>
              <h4 className="text-xs font-medium text-gray-600 mb-2">Swarm Trajectories (155 Particles)</h4>
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(137.5, 65%, 45%)' }}></div>
                  <span className="text-xs text-gray-700">Particle 1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(275, 80%, 55%)' }}></div>
                  <span className="text-xs text-gray-700">Particle 2</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(52.5, 95%, 65%)' }}></div>
                  <span className="text-xs text-gray-700">Particle 3</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(190, 65%, 75%)' }}></div>
                  <span className="text-xs text-gray-700">Particle 4</span>
                </div>
                <div className="text-xs text-gray-500 italic">Each particle (1-155) has unique color</div>
              </div>
            </div>
          )}

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


        </CardContent>
      )}
    </Card>
    </div>
  );
}
