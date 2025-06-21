import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="relative">
        {/* Hero Section */}
        <div className="bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          <div 
            className="h-96 bg-cover bg-center"
            style={{
              backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                <svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="locustGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" style="stop-color:#90EE90;stop-opacity:1"/>
                      <stop offset="100%" style="stop-color:#228B22;stop-opacity:1"/>
                    </radialGradient>
                  </defs>
                  <rect width="1200" height="400" fill="#1a4d1a"/>
                  <g transform="translate(300,100)">
                    <!-- Stylized locust -->
                    <ellipse cx="200" cy="100" rx="60" ry="30" fill="url(#locustGrad)"/>
                    <ellipse cx="170" cy="85" rx="15" ry="8" fill="#32CD32"/>
                    <ellipse cx="230" cy="85" rx="15" ry="8" fill="#32CD32"/>
                    <path d="M 140 100 Q 120 80 100 90 Q 90 100 100 110 Q 120 120 140 100" fill="#7CFC00"/>
                    <path d="M 260 100 Q 280 80 300 90 Q 310 100 300 110 Q 280 120 260 100" fill="#7CFC00"/>
                    <circle cx="180" cy="90" r="3" fill="#000"/>
                    <circle cx="220" cy="90" r="3" fill="#000"/>
                  </g>
                </svg>
              `)}`
            }}
          >
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
              <div className="text-white max-w-2xl">
                <h1 className="text-5xl font-bold mb-6">East Africa Pest Watch</h1>
                <p className="text-xl mb-8 text-green-100">
                  Monitoring pest conditions in East Africa
                </p>
                <Link href="/mapviewer">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                    Explore Map
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Partners</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
              <div className="bg-gray-100 h-16 w-32 rounded flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">WORLD BANK GROUP</span>
              </div>
              <div className="bg-gray-100 h-16 w-32 rounded flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">DEVEX</span>
              </div>
              <div className="bg-gray-100 h-16 w-32 rounded flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">ICIPE</span>
              </div>
              <div className="bg-gray-100 h-16 w-32 rounded flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">CGIAR</span>
              </div>
              <div className="bg-gray-100 h-16 w-32 rounded flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">FAO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">EA</span>
                  </div>
                  <span className="font-bold text-gray-800">East Africa Pest Watch</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  IOAD Climate Prediction and Applications Centre<br/>
                  (ICPAC)Ngong Town, Kibiko A Road-P.O BOX<br/>
                  10304-00100
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-green-600">About</a></li>
                  <li><a href="#" className="hover:text-green-600">Team</a></li>
                  <li><a href="#" className="hover:text-green-600">Blog</a></li>
                  <li><a href="#" className="hover:text-green-600">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-green-600">Help</a></li>
                  <li><a href="#" className="hover:text-green-600">Advertise</a></li>
                </ul>
                <h3 className="font-semibold text-gray-800 mb-4 mt-6">Social</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-green-600">Twitter</a></li>
                  <li><a href="#" className="hover:text-green-600">Instagram</a></li>
                  <li><a href="#" className="hover:text-green-600">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}