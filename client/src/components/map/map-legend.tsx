import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expand, Minimize2 } from "lucide-react";
import { useState } from "react";
import { BREEDING_SUITABILITY_COLORS, OUTBREAK_STAGE_COLORS } from "@/lib/spatial-data";

export default function MapLegend() {
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
        <CardContent className="pt-0 pb-3">
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
