import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
// Use public assets paths for all logos
const worldBankLogo = "/assets/World_Bank_Group_logo.svg_1750589140555.png";
const igadLogo = "/assets/igad_green.2cd2dd13361e3b8ebdd6_1750589107298.png";
const icipeLogo = "/assets/icipeLogo_1750589140554.png";
const tmgLogo = "/assets/TMG_logo_transparent_1750806744684.png";
const dlcoLogo = "/assets/cropped-DLCO-EA-Logo-Header_1750806744686.png";
const dlrLogo = "/assets/dlr-logo.png";

export default function Home() {
  // Animation for pest images
  const pestImages = [
    {
      src: "/assets/locust.jpg",
      title: "Desert Locust",
      description: "Monitoring locust swarms across East Africa"
    },
    {
      src: "/assets/fall-army-worm.jpg", 
      title: "Fall Army Worm",
      description: "Tracking crop damage and infestation patterns"
    },
    {
      src: "/assets/quelea-bird.jpg",
      title: "Quelea Birds", 
      description: "Monitoring bird pest populations and migration"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % pestImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [pestImages.length]);

  return (
    <div className="flex-1 bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 flex flex-col justify-between">
        {/* Hero Section with animated pest images */}
        <div className="bg-black relative overflow-hidden flex-1">
          {/* Animated background images */}
          {pestImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url('${image.src}')`
              }}
            />
          ))}
          
          {/* Content overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">East Africa Pest Watch</h1>
              <p className="text-xl mb-8 opacity-90">
                Monitoring pest conditions in East Africa
              </p>
              <Link href="/mapviewer">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                  Explore Map
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="py-12 bg-white border-t-4 border-green-600">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Partners</h2>
            <div className="flex flex-wrap justify-center items-center gap-12">
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex items-center justify-center h-28 w-52 hover:shadow-xl transition-all hover:scale-105">
                <img src={worldBankLogo} alt="World Bank Group" className="max-h-16 max-w-full object-contain" />
              </div>
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex items-center justify-center h-28 w-52 hover:shadow-xl transition-all hover:scale-105">
                <img src={dlcoLogo} alt="DLCO-EA" className="max-h-16 max-w-full object-contain" />
              </div>
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex items-center justify-center h-28 w-52 hover:shadow-xl transition-all hover:scale-105">
                <img src={icipeLogo} alt="ICIPE" className="max-h-16 max-w-full object-contain" />
              </div>
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex items-center justify-center h-28 w-52 hover:shadow-xl transition-all hover:scale-105">
                <img src={dlrLogo} alt="DLR German Aerospace Centre" className="max-h-16 max-w-full object-contain" />
              </div>
              <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex items-center justify-center h-28 w-52 hover:shadow-xl transition-all hover:scale-105">
                <img src={tmgLogo} alt="Töpfer Müller Gaßner" className="max-h-16 max-w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-2 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-green-100">
            <Link href="/mapviewer" className="hover:text-white">Map Viewer</Link>
            <span>•</span>
            <Link href="/analytics" className="hover:text-white">Analytics</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-white">About</Link>
            <span>•</span>
            <Link href="/partners" className="hover:text-white">Partners</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}