import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expand, Minimize2 } from "lucide-react";
import { useState } from "react";

export default function MapLegend() {
  const [isExpanded, setIsExpanded] = useState(true);

  const trajectoryColors = [
    { color: '#2196F3', label: 'Swarm 1' },
    { color: '#FF9800', label: 'Swarm 2' },
    { color: '#4CAF50', label: 'Swarm 3' },
    { color: '#E91E63', label: 'Swarm 4' },
    { color: '#9C27B0', label: 'Swarm 5' },
    { color: '#00BCD4', label: 'Swarm 6' },
    { color: '#FF5722', label: 'Swarm 7' },
    { color: '#795548', label: 'Swarm 8' },
  ];

  return (
    <Card className="absolute top-4 right-4 min-w-52 z-40 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Trajectory Legend</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-auto"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <Minimize2 className="text-gray-500 hover:text-gray-700" size={14} />
            ) : (
              <Expand className="text-gray-500 hover:text-gray-700" size={14} />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          {/* Trajectory Colors */}
          <div>
            <h4 className="text-xs font-medium text-gray-600 mb-2">Locust Swarms</h4>
            <div className="space-y-1.5">
              {trajectoryColors.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-1 rounded"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />
          
          {/* Map Elements */}
          <div>
            <h4 className="text-xs font-medium text-gray-600 mb-2">Map Elements</h4>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse-slow border-2 border-white shadow-sm"></div>
                <span className="text-xs text-gray-700">Current Position</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                <span className="text-xs text-gray-700">Start Position</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-gray-400 rounded"></div>
                <span className="text-xs text-gray-700">Movement Path</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Risk Levels */}
          <div>
            <h4 className="text-xs font-medium text-gray-600 mb-2">Outbreak Risk</h4>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-700">High Risk (&gt;6)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <span className="text-xs text-gray-700">Moderate (3-6)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-xs text-gray-700">Low Risk (&lt;3)</span>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
