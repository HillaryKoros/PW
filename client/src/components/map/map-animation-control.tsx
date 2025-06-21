import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw } from "lucide-react";

interface MapAnimationControlProps {
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

export default function MapAnimationControl({
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
}: MapAnimationControlProps) {
  if (!visible || !trajectoryData) return null;

  const maxTimeIndex = trajectoryData?.features?.length ? Math.max(...trajectoryData.features.map((f: any) => parseInt(f.properties.time))) : 100;
  const currentDate = "Apr 14, 2025"; // Based on reference interface

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[1000] pointer-events-auto">
      <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-4 min-w-96">
        {/* Date Display */}
        <div className="text-center text-sm font-medium text-gray-700 mb-3">
          {currentDate}
        </div>
        
        {/* Timeline Slider */}
        <div className="mb-3">
          <Slider
            value={[currentTimeIndex]}
            onValueChange={(value) => onTimeIndexChange(value[0])}
            max={maxTimeIndex}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Day 1 of 365</span>
            <span>Speed</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-2">
          <Button
            onClick={onReset}
            size="sm"
            variant="outline"
            className="text-xs px-3 py-1"
          >
            <RotateCcw size={14} />
          </Button>
          <Button
            onClick={isPlaying ? onPause : onPlay}
            size="sm"
            variant="outline"
            className="text-xs px-3 py-1"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </Button>
          
          {/* Speed Control */}
          <div className="flex items-center space-x-2 ml-4">
            <span className="text-xs text-gray-500">Speed</span>
            <Slider
              value={[animationSpeed]}
              onValueChange={(value) => onSpeedChange(value[0])}
              max={1000}
              min={50}
              step={50}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}