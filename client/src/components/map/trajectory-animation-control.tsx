import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";
import { getDateFromTimeIndex } from "@/lib/map-utils";

interface TrajectoryAnimationControlProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  currentTimeIndex: number;
  onTimeIndexChange: (index: number) => void;
  animationSpeed: number;
  onSpeedChange: (speed: number) => void;
  trajectoryData: any;
  visible: boolean;
}

export default function TrajectoryAnimationControl({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  currentTimeIndex,
  onTimeIndexChange,
  animationSpeed,
  onSpeedChange,
  trajectoryData,
  visible
}: TrajectoryAnimationControlProps) {
  const [maxTimeIndex, setMaxTimeIndex] = useState(365);
  const [currentDate, setCurrentDate] = useState("2025-01-01");

  useEffect(() => {
    if (trajectoryData?.features) {
      // Get unique time steps from trajectory data
      const times: string[] = [];
      trajectoryData.features.forEach((f: any) => {
        if (!times.includes(f.properties.time)) {
          times.push(f.properties.time);
        }
      });
      setMaxTimeIndex(times.length - 1);
    }
  }, [trajectoryData]);

  useEffect(() => {
    if (trajectoryData?.features && trajectoryData.features.length > 0) {
      // Get unique sorted dates from trajectory data
      const times: string[] = [];
      trajectoryData.features.forEach((f: any) => {
        if (!times.includes(f.properties.time)) {
          times.push(f.properties.time);
        }
      });
      times.sort();
      
      if (currentTimeIndex < times.length) {
        const isoDate = times[currentTimeIndex] as string;
        const date = new Date(isoDate);
        setCurrentDate(date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }));
      }
    }
  }, [currentTimeIndex, trajectoryData]);

  if (!visible) return null;

  return (
    <Card className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[10000] bg-white/95 backdrop-blur-sm border border-gray-300 shadow-lg pointer-events-auto">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Date Display */}
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-800">{currentDate}</div>
            <div className="text-xs text-gray-600">Day {currentTimeIndex + 1} of {maxTimeIndex}</div>
          </div>

          {/* Play/Pause/Reset Controls */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={isPlaying ? onPause : onPlay}
              size="sm"
              className="w-8 h-8 p-0 bg-green-600 hover:bg-green-700 text-white"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </Button>
            <Button
              onClick={onReset}
              size="sm"
              variant="outline"
              className="w-8 h-8 p-0"
            >
              <RotateCcw size={14} />
            </Button>
          </div>

          {/* Timeline Slider */}
          <div className="flex-1 min-w-48">
            <input
              type="range"
              min="0"
              max={maxTimeIndex - 1}
              value={currentTimeIndex}
              onChange={(e) => onTimeIndexChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #16a34a 0%, #16a34a ${(currentTimeIndex / (maxTimeIndex - 1)) * 100}%, #e5e7eb ${(currentTimeIndex / (maxTimeIndex - 1)) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>

          {/* Speed Control */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-600">Speed:</span>
            <input
              type="range"
              min="50"
              max="500"
              value={animationSpeed}
              onChange={(e) => onSpeedChange(parseInt(e.target.value))}
              className="w-16 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}