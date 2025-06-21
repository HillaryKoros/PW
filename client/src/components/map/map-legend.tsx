import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minimize2, Expand } from 'lucide-react';
import { BREEDING_SUITABILITY_COLORS } from '@/lib/spatial-data';

interface MapLegendProps {
  showBreedingSuitability?: boolean;
  showOutbreakStages?: boolean;
  showTrajectory?: boolean;
}

export default function MapLegend({ 
  showBreedingSuitability = false,
  showOutbreakStages = false,
  showTrajectory = false
}: MapLegendProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Don't render if no layers are visible
  if (!showBreedingSuitability && !showOutbreakStages && !showTrajectory) {
    return null;
  }

  return (
    <div className="absolute top-4 right-4 z-[9999] pointer-events-none max-h-96 overflow-y-auto">
      <Card className="min-w-48 bg-white border border-gray-300 shadow-xl pointer-events-auto">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800">Layer Legend</h2>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-gray-100"
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
          <CardContent className="pt-0 pb-3 space-y-3">
            {/* Current Observations Group */}
            {showOutbreakStages && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Outbreak Stages</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8B0000' }}></div>
                    <span className="text-xs text-gray-700">Crisis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF0000' }}></div>
                    <span className="text-xs text-gray-700">Alert</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF8C00' }}></div>
                    <span className="text-xs text-gray-700">Alarm</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#32CD32' }}></div>
                    <span className="text-xs text-gray-700">Calm</span>
                  </div>
                </div>
              </div>
            )}

            {/* Movement Predictions Group */}
            {showTrajectory && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Movement Predictions</h4>
                <div className="space-y-1.5">
                  <div className="text-xs text-gray-600 font-medium">155 Particle Trajectories</div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'hsl(137.5, 65%, 45%)' }}></div>
                      <span className="text-xs text-gray-700">ID 1</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'hsl(275, 80%, 55%)' }}></div>
                      <span className="text-xs text-gray-700">ID 2</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'hsl(52.5, 95%, 65%)' }}></div>
                      <span className="text-xs text-gray-700">ID 3</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'hsl(190, 65%, 75%)' }}></div>
                      <span className="text-xs text-gray-700">ID 4</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 italic">+ 151 more unique colors</div>
                </div>
              </div>
            )}

            {/* Breeding Suitability */}
            {showBreedingSuitability && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Breeding Suitability</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#8B0000' }}></div>
                    <span className="text-xs text-gray-700">Very High (Class 5)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF0000' }}></div>
                    <span className="text-xs text-gray-700">High (Class 4)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF6600' }}></div>
                    <span className="text-xs text-gray-700">Moderate (Class 3)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FFAA00' }}></div>
                    <span className="text-xs text-gray-700">Low (Class 2)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FFFF99' }}></div>
                    <span className="text-xs text-gray-700">Very Low (Class 1)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#E0E0E0' }}></div>
                    <span className="text-xs text-gray-700">Unsuitable (Class 0)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Feeding Periods */}
            {(showBreedingSuitability || showOutbreakStages) && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Feeding Periods</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#8B0000' }}></div>
                    <span className="text-xs text-gray-700">8+ days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF4444' }}></div>
                    <span className="text-xs text-gray-700">5-7 days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF8800' }}></div>
                    <span className="text-xs text-gray-700">2-4 days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FFCC00' }}></div>
                    <span className="text-xs text-gray-700">1-2 days</span>
                  </div>
                </div>
              </div>
            )}

            {/* Gregarization Levels */}
            {(showBreedingSuitability || showOutbreakStages) && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Gregarization Intensity</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#CC0000' }}></div>
                    <span className="text-xs text-gray-700">Very High (80-100%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF4444' }}></div>
                    <span className="text-xs text-gray-700">High (60-80%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF8800' }}></div>
                    <span className="text-xs text-gray-700">Moderate (40-60%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FFCC00' }}></div>
                    <span className="text-xs text-gray-700">Low (20-40%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FFFF99' }}></div>
                    <span className="text-xs text-gray-700">Very Low (0-20%)</span>
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