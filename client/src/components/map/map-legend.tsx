import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expand, Minimize2 } from "lucide-react";
import { useState } from "react";

export default function MapLegend() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="absolute top-4 right-4 min-w-48 z-40 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Legend</h3>
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
        <CardContent className="pt-0">
          <div>
            <h4 className="text-xs font-medium text-gray-600 mb-3">Outbreak Probability</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-700">High Risk &gt;6</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                <span className="text-xs text-gray-700">Moderate 3-6</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                <span className="text-xs text-gray-700">Low Risk &lt;3</span>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
