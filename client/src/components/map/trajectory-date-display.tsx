import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TrajectoryDateDisplayProps {
  currentTimeIndex: number;
  trajectoryData: any;
  visible: boolean;
}

export default function TrajectoryDateDisplay({
  currentTimeIndex,
  trajectoryData,
  visible
}: TrajectoryDateDisplayProps) {
  const [currentDate, setCurrentDate] = useState("2025-01-01");
  const [dayCount, setDayCount] = useState(1);

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
        setDayCount(currentTimeIndex + 1);
      }
    }
  }, [currentTimeIndex, trajectoryData]);

  if (!visible) return null;

  return (
    <Card className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[10000] bg-white/95 backdrop-blur-sm border border-gray-300 shadow-lg pointer-events-none">
      <CardContent className="p-3">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800">{currentDate}</div>
          <div className="text-sm text-gray-600">Animation Day {dayCount}</div>
        </div>
      </CardContent>
    </Card>
  );
}