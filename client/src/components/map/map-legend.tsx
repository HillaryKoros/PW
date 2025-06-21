import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minimize2, Expand } from 'lucide-react';
import { BREEDING_SUITABILITY_COLORS } from '@/lib/spatial-data';

interface MapLegendProps {
  showBreedingSuitability?: boolean;
  showTrajectory?: boolean;
  showSwarmCoverage?: boolean;
  showFeedingSusceptibility?: boolean;
  showGregarization?: boolean;
  showTemporalBreeding?: boolean;
}

export default function MapLegend({ 
  showBreedingSuitability = false,
  showTrajectory = false,
  showSwarmCoverage = false,
  showFeedingSusceptibility = false,
  showGregarization = false,
  showTemporalBreeding = false
}: MapLegendProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Don't render if no layers are visible
  if (!showBreedingSuitability && !showTrajectory && !showSwarmCoverage && !showFeedingSusceptibility && !showGregarization && !showTemporalBreeding) {
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


            {/* Trajectory Particles */}
            {showTrajectory && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Particle Trajectories</h4>
                <div className="space-y-1.5">
                  <div className="text-xs text-gray-600">Each particle has unique color</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-1 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-500 border border-gray-300"></div>
                    <span className="text-xs text-gray-700">155 Particles</span>
                  </div>
                </div>
              </div>
            )}

            {/* Breeding Suitability */}
            {showBreedingSuitability && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Breeding Suitability</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#800000' }}></div>
                    <span className="text-xs text-gray-700">Very High</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF4444' }}></div>
                    <span className="text-xs text-gray-700">High</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF8800' }}></div>
                    <span className="text-xs text-gray-700">Moderate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FFCC00' }}></div>
                    <span className="text-xs text-gray-700">Low</span>
                  </div>
                </div>
              </div>
            )}

            {/* Swarm Coverage */}
            {showSwarmCoverage && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Swarm Coverage 2024</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#ff4444' }}></div>
                    <span className="text-xs text-gray-700">Historical Coverage Areas</span>
                  </div>
                </div>
              </div>
            )}

            {/* Feeding Susceptibility */}
            {showFeedingSusceptibility && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Feeding Periods</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#800000' }}></div>
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


          </CardContent>
        )}
      </Card>
    </div>
  );
}