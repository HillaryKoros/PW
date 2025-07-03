import { Card } from "../ui/card";

export default function Footer() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-[600] bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2 shadow-lg">
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center space-x-4">
          <span>© 2025 East Africa Pest Watch</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Map Attribution: OpenStreetMap Contributors</span>
        </div>
      </div>
    </div>
  );
}