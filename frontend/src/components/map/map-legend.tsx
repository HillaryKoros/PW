import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Minimize2, Expand } from 'lucide-react';
import { BREEDING_SUITABILITY_COLORS } from '../../lib/spatial-data';

interface MapLegendProps {
  showBreedingSuitability?: boolean;
  showTrajectory?: boolean;
  showSwarmCoverage?: boolean;
  showFeedingSusceptibility?: boolean;
  showGregarization?: boolean;
  showTemporalBreeding?: boolean;
  showOutbreakStages?: boolean;
  showHopperProbability?: boolean;
}

export default function MapLegend({ 
  showBreedingSuitability = false,
  showTrajectory = false,
  showSwarmCoverage = false,
  showFeedingSusceptibility = false,
  showGregarization = false,
  showTemporalBreeding = false,
  showOutbreakStages = false,
  showHopperProbability = false
}: MapLegendProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Don't render if no layers are visible
  if (!showBreedingSuitability && !showTrajectory && !showSwarmCoverage && !showFeedingSusceptibility && !showGregarization && !showTemporalBreeding && !showOutbreakStages && !showHopperProbability) {
    return null;
  }

  const forceShowGregarization = showGregarization;

  return (
    <div className="absolute top-4 right-4 z-[9999] pointer-events-none max-h-96 overflow-y-auto">
      <Card className="min-w-48 bg-white border border-gray-300 shadow-xl pointer-events-auto">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800">Hoppers Habitat Suitability</h2>
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
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-1 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-500 border border-gray-300"></div>
                    <span className="text-xs text-gray-700">Particle Movement Paths</span>
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

            {/* Outbreak Stages */}
            {showOutbreakStages && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Outbreak Stages</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: '#FF0000' }}></div>
                    <span className="text-xs text-gray-700">Gregarious (Swarming)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: '#FF8C00' }}></div>
                    <span className="text-xs text-gray-700">Transiens (Transitional)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: '#32CD32' }}></div>
                    <span className="text-xs text-gray-700">Solitary (Individual)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Swarm Coverage */}
            {showSwarmCoverage && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Swarm Coverage</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF0000' }}></div>
                    <span className="text-xs text-gray-700">Large Swarms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF4500' }}></div>
                    <span className="text-xs text-gray-700">Medium Swarms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FFA500' }}></div>
                    <span className="text-xs text-gray-700">Small Swarms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF8C00' }}></div>
                    <span className="text-xs text-gray-700">Very Small - Gregarious</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FFD700' }}></div>
                    <span className="text-xs text-gray-700">Very Small - Transiens</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#90EE90' }}></div>
                    <span className="text-xs text-gray-700">Very Small - Solitary</span>
                  </div>
                </div>
              </div>
            )}

            {/* Vegetation Onset */}
            {showFeedingSusceptibility && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Vegetation Onset</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#800000' }}></div>
                    <span className="text-xs text-gray-700">10+ days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF4444' }}></div>
                    <span className="text-xs text-gray-700">5-9 days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF8800' }}></div>
                    <span className="text-xs text-gray-700">2-4 days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FFCC00' }}></div>
                    <span className="text-xs text-gray-700">1 day</span>
                  </div>
                </div>
              </div>
            )}

            {/* Temporal Breeding Suitability */}
            {showTemporalBreeding && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Temporal Breeding Suitability</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF2B18' }}></div>
                    <span className="text-xs text-gray-700">High Suitability</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#33B3FD' }}></div>
                    <span className="text-xs text-gray-700">Moderate Suitability</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#F2FE2A' }}></div>
                    <span className="text-xs text-gray-700">Low Suitability</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#BDBEBE' }}></div>
                    <span className="text-xs text-gray-700">Unsuitable</span>
                  </div>
                </div>
              </div>
            )}

            {/* Swarm Susceptibility (Gregarization) */}
            {forceShowGregarization && (
              <div>
                <h4 className="text-xs font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">Swarming Susceptibility</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#006400' }}></div>
                    <span className="text-xs text-gray-700">Very High (&gt;0.8)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#B4DC64' }}></div>
                    <span className="text-xs text-gray-700">High (0.6-0.8)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#F0E664' }}></div>
                    <span className="text-xs text-gray-700">Medium-High (0.5-0.6)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FFDC64' }}></div>
                    <span className="text-xs text-gray-700">Medium (0.4-0.5)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FFC8B4' }}></div>
                    <span className="text-xs text-gray-700">Medium-Low (0.3-0.4)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FFDCD2' }}></div>
                    <span className="text-xs text-gray-700">Low (0.2-0.3)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FFEBEB' }}></div>
                    <span className="text-xs text-gray-700">Very Low (0.05-0.2)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Hoppers Habitat Suitability */}
            {showHopperProbability && (
              <div>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300 bg-transparent"></div>
                    <span className="text-xs text-gray-700">0.0 - 0.01</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#ACB334' }}></div>
                    <span className="text-xs text-gray-700">0.01 - 0.20</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FAB733' }}></div>
                    <span className="text-xs text-gray-700">0.20 - 0.40</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF9E15' }}></div>
                    <span className="text-xs text-gray-700">0.40 - 0.60</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF4E11' }}></div>
                    <span className="text-xs text-gray-700">0.60 - 0.80</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 border border-gray-300" style={{ backgroundColor: '#FF0D0D' }}></div>
                    <span className="text-xs text-gray-700">0.80 - 1.0</span>
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