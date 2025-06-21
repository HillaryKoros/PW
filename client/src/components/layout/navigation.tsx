import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-green-700 text-white px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">EA</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold">East Africa</h1>
              <p className="text-sm text-green-200">PEST WATCH</p>
            </div>
          </div>
          
          <div className="flex space-x-6 ml-8">
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
        </div>
        
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-green-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
