import { Card } from "@/components/ui/card";

export default function Footer() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-[600] bg-white/90 backdrop-blur-sm border-t border-gray-200/50 px-4 py-1.5 shadow-sm">
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center space-x-3">
          <span>© 2025 East Africa Pest Watch</span>
          <span className="text-gray-400">|</span>
          <span>ELRP Model Output</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>Data Sources: FAO, USAID, NASA</span>
          <span className="text-gray-400">|</span>
          <span>Last Updated: June 2025</span>
        </div>
      </div>
    </div>
  );
}