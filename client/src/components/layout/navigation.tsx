import { Bug, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <nav className="pest-green-600 text-white shadow-lg relative z-50 h-20">
      <div className="max-w-full mx-0 px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Bug className="text-pest-green-600 text-xl" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold">EAST AFRICA</h1>
                <p className="text-sm text-pest-green-200">PEST WATCH</p>
              </div>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-pest-green-200 font-medium">HOME</a>
            <a href="#" className="text-pest-green-200 hover:text-white font-medium">MAPVIEWER</a>
            <a href="#" className="text-white hover:text-pest-green-200 font-medium">ANALYTICS</a>
            <a href="#" className="text-white hover:text-pest-green-200 font-medium">PARTNERS</a>
            <a href="#" className="text-white hover:text-pest-green-200 font-medium">ABOUT</a>
            <a href="#" className="text-white hover:text-pest-green-200 font-medium">CONTACT</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <Bug size={24} />
          </button>
          
          {/* Settings Icon */}
          <div className="hidden md:block">
            <Button className="w-10 h-10 p-0 pest-green-700 rounded-full hover:bg-pest-green-800">
              <Settings className="text-white" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
