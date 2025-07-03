import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Play, Pause, RotateCcw, GripVertical } from "lucide-react";
import { getDateFromTimeIndex } from "../../lib/map-utils";

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

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
    <Card className="trajectory-animation-control fixed bottom-16 sm:bottom-20 md:bottom-24 left-2 right-2 sm:left-4 sm:right-4 lg:absolute lg:bottom-12 lg:left-1/2 lg:right-auto lg:transform lg:-translate-x-1/2 lg:w-auto bg-white/98 backdrop-blur-md border border-green-600 shadow-lg pointer-events-auto" style={{ zIndex: 999995 }}>
      <CardContent className="p-2 sm:p-3 lg:p-4">
        {/* Mobile Layout - Compact */}
        <div className="lg:hidden space-y-1.5 sm:space-y-2">
          {/* Compact Header */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm font-bold text-green-700">{currentDate}</div>
              <div className="text-xs text-gray-600">Day {currentTimeIndex + 1}/{maxTimeIndex}</div>
            </div>
            <div className="flex items-center space-x-1.5">
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
                className="w-8 h-8 p-0 border border-green-600 text-green-600 hover:bg-green-50"
              >
                <RotateCcw size={14} />
              </Button>
            </div>
          </div>

          {/* Compact Timeline */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max={maxTimeIndex - 1}
              value={currentTimeIndex}
              onChange={(e) => onTimeIndexChange(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #16a34a 0%, #16a34a ${(currentTimeIndex / (maxTimeIndex - 1)) * 100}%, #e5e7eb ${(currentTimeIndex / (maxTimeIndex - 1)) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>

          {/* Speed Control - Hidden on small mobile */}
          <div className="hidden sm:flex sm:items-center sm:justify-between">
            <span className="text-xs font-medium text-gray-700">Speed</span>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="50"
                max="500"
                value={animationSpeed}
                onChange={(e) => onSpeedChange(parseInt(e.target.value))}
                className="w-16 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center space-x-4">
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