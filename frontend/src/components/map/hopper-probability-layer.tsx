import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import HopperProbabilityLegend from "./hopper-probability-legend";

interface HopperProbabilityLayerProps {
  visible: boolean;
  dekad: string; // Format: YYYYMMDD (e.g., "20240101")
  opacity?: number;
}

export default function HopperProbabilityLayer({
  visible,
  dekad,
  opacity = 0.7
}: HopperProbabilityLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (!visible) return;

    // Construct the WMS layer URL with the selected dekad
    const wmsUrl = process.env.NODE_ENV === 'production' 
      ? 'http://mapserver/cgi-bin/mapserv'
      : 'http://localhost:8099/cgi-bin/mapserv';

    // Extract year from dekad string (format: YYYYMMDD)
    const year = dekad.substring(0, 4);
    
    // Create WMS layer for hopper probability with runtime substitution
    const hopperLayer = L.tileLayer.wms(wmsUrl, {
      layers: 'hopper_probability',
      format: 'image/png',
      transparent: true,
      version: '1.3.0',
      crs: L.CRS.EPSG4326,
      opacity: opacity,
      map: '/etc/mapserver/mapfiles/locust.map',
      // Runtime substitution parameters
      year: year,
      dekad: dekad
    } as any);

    // Add layer to map
    hopperLayer.addTo(map);

    // Cleanup function to remove layer when component unmounts or visibility changes
    return () => {
      map.removeLayer(hopperLayer);
    };
  }, [map, visible, dekad, opacity]);

  return <HopperProbabilityLegend visible={visible} />;
}

// Helper function to generate dekad dates
export function generateDekadDates(startYear: number, endYear: number): Array<{value: string, label: string}> {
  const dekads: Array<{value: string, label: string}> = [];
  
  for (let year = startYear; year <= endYear; year++) {
    for (let month = 1; month <= 12; month++) {
      // First dekad: days 1-10
      dekads.push({
        value: `${year}${String(month).padStart(2, '0')}01`,
        label: `${year}-${String(month).padStart(2, '0')}-01 to 10`
      });
      
      // Second dekad: days 11-20
      dekads.push({
        value: `${year}${String(month).padStart(2, '0')}11`,
        label: `${year}-${String(month).padStart(2, '0')}-11 to 20`
      });
      
      // Third dekad: days 21-end of month
      dekads.push({
        value: `${year}${String(month).padStart(2, '0')}21`,
        label: `${year}-${String(month).padStart(2, '0')}-21 to end`
      });
    }
  }
  
  return dekads;
}

// Generate list of available dekads based on the TIFF files
export const AVAILABLE_DEKADS = generateDekadDates(2017, 2024);

// Color legend for hopper probability
export const HOPPER_PROBABILITY_LEGEND = [
  { value: 0, color: "#eaeaea", label: "0% - No Risk" },
  { value: 25, color: "#ffebbf", label: "25% - Low" },
  { value: 50, color: "#ffd37f", label: "50% - Moderate" },
  { value: 75, color: "#ffaa00", label: "75% - High" },
  { value: 98, color: "#ff5500", label: "98%+ - Very High" }
];