import { Card } from "@/components/ui/card";

export default function Footer() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-[500] bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center space-x-4">
          <span>© 2025 East Africa Pest Watch</span>
          <span>|</span>
          <span>ELRP Model Output</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Data Sources: FAO, USAID, NASA</span>
          <span>|</span>
          <span>Last Updated: June 2025</span>
        </div>
      </div>
    </div>
  );
}