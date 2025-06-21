import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Create multiple animated SVG backgrounds
  const backgroundImages = [
    // Image 1: Locust swarm formation
    `data:image/svg+xml;base64,${btoa(`
      <svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="swarmGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:0.8"/>
            <stop offset="100%" style="stop-color:#8B0000;stop-opacity:1"/>
          </radialGradient>
        </defs>
        <rect width="1200" height="400" fill="#2C1810"/>
        <g>
          <!-- Multiple locusts in swarm formation -->
          <ellipse cx="200" cy="150" rx="40" ry="20" fill="url(#swarmGrad)" opacity="0.9"/>
          <ellipse cx="280" cy="120" rx="35" ry="18" fill="url(#swarmGrad)" opacity="0.8"/>
          <ellipse cx="350" cy="180" rx="45" ry="22" fill="url(#swarmGrad)" opacity="0.9"/>
          <ellipse cx="420" cy="140" rx="38" ry="19" fill="url(#swarmGrad)" opacity="0.7"/>
          <ellipse cx="500" cy="200" rx="42" ry="21" fill="url(#swarmGrad)" opacity="0.8"/>
          <ellipse cx="580" cy="110" rx="40" ry="20" fill="url(#swarmGrad)" opacity="0.9"/>
          <ellipse cx="650" cy="170" rx="37" ry="18" fill="url(#swarmGrad)" opacity="0.8"/>
          <ellipse cx="720" cy="130" rx="43" ry="22" fill="url(#swarmGrad)" opacity="0.9"/>
        </g>
      </svg>
    `)}`,
    
    // Image 2: Agricultural landscape
    `data:image/svg+xml;base64,${btoa(`
      <svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1"/>
            <stop offset="50%" style="stop-color:#90EE90;stop-opacity:1"/>
            <stop offset="100%" style="stop-color:#228B22;stop-opacity:1"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="400" fill="url(#fieldGrad)"/>
        <g>
          <!-- Agricultural fields -->
          <rect x="0" y="300" width="400" height="100" fill="#8FBC8F"/>
          <rect x="400" y="280" width="400" height="120" fill="#9ACD32"/>
          <rect x="800" y="290" width="400" height="110" fill="#7CFC00"/>
          <!-- Crop rows -->
          <line x1="50" y1="320" x2="350" y2="320" stroke="#556B2F" stroke-width="2"/>
          <line x1="50" y1="340" x2="350" y2="340" stroke="#556B2F" stroke-width="2"/>
          <line x1="50" y1="360" x2="350" y2="360" stroke="#556B2F" stroke-width="2"/>
        </g>
      </svg>
    `)}`,
    
    // Image 3: East Africa map outline
    `data:image/svg+xml;base64,${btoa(`
      <svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="mapGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#4169E1;stop-opacity:0.6"/>
            <stop offset="100%" style="stop-color:#000080;stop-opacity:1"/>
          </radialGradient>
        </defs>
        <rect width="1200" height="400" fill="#1a1a2e"/>
        <g transform="translate(400,50)">
          <!-- Simplified East Africa outline -->
          <path d="M 100 50 L 250 80 L 280 150 L 320 220 L 290 280 L 200 300 L 120 280 L 80 200 L 90 120 Z" 
                fill="url(#mapGrad)" stroke="#FFD700" stroke-width="2"/>
          <!-- Locust outbreak points -->
          <circle cx="150" cy="120" r="8" fill="#FF4500" opacity="0.8"/>
          <circle cx="200" cy="160" r="6" fill="#FF6347" opacity="0.9"/>
          <circle cx="240" cy="200" r="7" fill="#FF0000" opacity="0.8"/>
          <circle cx="180" cy="240" r="5" fill="#DC143C" opacity="0.9"/>
        </g>
      </svg>
    `)}`,
    
    // Image 4: Monitoring technology
    `data:image/svg+xml;base64,${btoa(`
      <svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1E90FF;stop-opacity:1"/>
            <stop offset="100%" style="stop-color:#000080;stop-opacity:1"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="400" fill="#0F0F23"/>
        <g>
          <!-- Satellite -->
          <rect x="500" y="100" width="60" height="40" fill="url(#techGrad)"/>
          <rect x="480" y="110" width="20" height="20" fill="#32CD32"/>
          <rect x="580" y="110" width="20" height="20" fill="#32CD32"/>
          <!-- Signal waves -->
          <circle cx="530" cy="120" r="80" fill="none" stroke="#00FFFF" stroke-width="2" opacity="0.6"/>
          <circle cx="530" cy="120" r="120" fill="none" stroke="#00FFFF" stroke-width="1" opacity="0.4"/>
          <circle cx="530" cy="120" r="160" fill="none" stroke="#00FFFF" stroke-width="1" opacity="0.3"/>
        </g>
      </svg>
    `)}`
  ];

  // Auto-advance images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="relative">
        {/* Hero Section with Animated Backgrounds */}
        <div className="bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          <div 
            className="h-96 bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url('${backgroundImages[currentImageIndex]}')`
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