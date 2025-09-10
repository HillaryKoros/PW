import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { getMapServerUrl } from "../../utils/mapserver";

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
  const layerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!map) return;

    // Remove existing layer if it exists
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    if (visible && dekad) {
      // Extract year from dekad for runtime substitution
      const year = dekad.substring(0, 4);
      
      console.log(`Loading hoppers habitat suitability layer for dekad: ${dekad}, year: ${year}`);
      
      // Create WMS layer with runtime substitution parameters
      const baseUrl = getMapServerUrl();
      const urlWithCacheBust = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}t=${Date.now()}&cache=${Math.random()}`;
      console.log(`WMS URL: ${urlWithCacheBust}`);
      
      const wmsLayer = L.tileLayer.wms(urlWithCacheBust, {
        layers: 'hopper_probability',
        format: 'image/png',
        transparent: true,
        opacity: opacity,
        attribution: `Hoppers Habitat Suitability - Dekad ${dekad}`,
        version: '1.1.1',
        // Runtime substitution parameters
        year: year,
        dekad: dekad,
        maxZoom: 18,
        minZoom: 1
      } as any);

      // Add error handling for failed tile loads
      wmsLayer.on('tileerror', (e) => {
        console.error(`Failed to load hoppers habitat suitability tile for dekad: ${dekad}`, e);
      });

      // Add success handler to confirm layer loading
      wmsLayer.on('tileload', () => {
        console.log(`Successfully loaded hoppers habitat suitability tile for dekad: ${dekad}`);
      });

      // Add click event for hopper probability info
      wmsLayer.on('click', (e: any) => {
        const latlng = e.latlng;
        L.popup()
          .setLatLng(latlng)
          .setContent(`
            <div class="p-2">
              <h3 class="font-semibold text-sm">Hoppers Habitat Suitability</h3>
              <p class="text-xs text-gray-600">Dekad: ${dekad}</p>
              <p class="text-xs text-gray-600">Location: ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}</p>
              <p class="text-xs text-gray-600">VITO Model Output</p>
            </div>
          `)
          .openOn(map);
      });

      wmsLayer.addTo(map);
      layerRef.current = wmsLayer;
    }

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [map, visible, dekad, opacity]);

  useEffect(() => {
    if (layerRef.current && visible) {
      layerRef.current.setOpacity(opacity);
    }
  }, [opacity, visible]);

  return null;
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

// Color legend for hopper habitat suitability
export const HOPPER_PROBABILITY_LEGEND = [
  { value: 0, color: "#ACB334", label: "0-20% - Very Low" },
  { value: 25, color: "#FAB733", label: "20-40% - Low" },
  { value: 50, color: "#FF9E15", label: "40-60% - Moderate" },
  { value: 75, color: "#FF4E11", label: "60-80% - High" },
  { value: 98, color: "#FF0D0D", label: "80%+ - Very High" }
];