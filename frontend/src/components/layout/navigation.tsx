import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-green-800 text-white px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center p-1">
              <img 
                src="/assets/igad_green.2cd2dd13361e3b8ebdd6_1750589107298.png" 
                alt="IGAD Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-wide">EAST AFRICA</h1>
              <p className="text-xs text-green-200 font-medium">PEST WATCH</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 ml-8">
            <Link href="/" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              location === "/" 
                ? "bg-white text-green-700 font-semibold" 
                : "text-white hover:bg-green-600"
            }`}>
              HOME
            </Link>
            <Link href="/mapviewer" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              location === "/mapviewer" 
                ? "bg-yellow-500 text-black font-semibold" 
                : "text-white hover:bg-green-600"
            }`}>
              MAPVIEWER
            </Link>
            <Link href="/analytics" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              location === "/analytics" 
                ? "bg-white text-green-700 font-semibold" 
                : "text-white hover:bg-green-600"
            }`}>
              ANALYTICS
            </Link>
            <a href="#" className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-green-600">
              PARTNERS
            </a>
            <a href="#" className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-green-600">
              ABOUT
            </a>
            <a href="#" className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-green-600">
              CONTACT
            </a>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex space-x-2">
            <Link href="/" className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              location === "/" 
                ? "bg-white text-green-700 font-semibold" 
                : "text-white hover:bg-green-600"
            }`}>
              HOME
            </Link>
            <Link href="/mapviewer" className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              location === "/mapviewer" 
                ? "bg-yellow-500 text-black font-semibold" 
                : "text-white hover:bg-green-600"
            }`}>
              MAPVIEWER
            </Link>
            <Link href="/analytics" className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              location === "/analytics" 
                ? "bg-white text-green-700 font-semibold" 
                : "text-white hover:bg-green-600"
            }`}>
              ANALYTICS
            </Link>
          </div>
        </div>
        
        <div className="flex items-center">
          {/* Search icon placeholder */}
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21l-4.35-4.35"/>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}
