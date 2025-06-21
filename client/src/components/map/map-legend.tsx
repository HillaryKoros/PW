import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expand } from "lucide-react";

export default function MapLegend() {
  return (
    <Card className="absolute top-4 right-4 min-w-48 z-40">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Legend</h3>
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <Expand className="text-gray-500 hover:text-gray-700" size={12} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
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
          <hr className="my-2" />
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-blue-500"></div>
            <span className="text-xs text-gray-700">Trajectory Path</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse-slow"></div>
            <span className="text-xs text-gray-700">Active Swarm</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
