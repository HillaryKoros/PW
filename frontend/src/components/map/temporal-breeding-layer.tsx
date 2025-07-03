import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { getMapServerUrl } from "../../utils/mapserver";

interface TemporalBreedingLayerProps {
  visible: boolean;
  selectedMonth: string;
  opacity?: number;
}

export default function TemporalBreedingLayer({ 
  visible, 
  selectedMonth,
  opacity = 0.7
}: TemporalBreedingLayerProps) {
  const map = useMap();
  const layerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!map) return;

    // Remove existing layer if it exists
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    if (visible && selectedMonth) {
      // Map frontend month names to MapServer layer names
      const monthLayerMap: { [key: string]: string } = {
        'jan': 'breeding_january_2025',
        'feb': 'breeding_february_2025', 
        'apr': 'breeding_april_2024',
        'jul': 'breeding_july_2024',
        'nov': 'breeding_november_2024',
        'dec': 'breeding_december_2024'
      };
      
      const layerName = monthLayerMap[selectedMonth.toLowerCase()];
      
      if (!layerName) {
        console.warn(`No layer mapping found for month: ${selectedMonth}`);
        return;
      }
      
      console.log(`Loading breeding layer: ${layerName} for month: ${selectedMonth}`);
      
      // Create WMS layer for temporal breeding suitability TIFF data through MapServer
      const baseUrl = getMapServerUrl();
      const urlWithCacheBust = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}t=${Date.now()}&cache=${Math.random()}`;
      console.log(`WMS URL: ${urlWithCacheBust}`);
      const wmsLayer = L.tileLayer.wms(urlWithCacheBust, {
        layers: layerName,
        format: 'image/png',
        transparent: true,
        opacity: opacity,
        attribution: `Breeding Suitability ${selectedMonth.toUpperCase()} - ELRP Model`,
        version: '1.1.1',
        // Add cache-busting parameter to force refresh
        maxZoom: 18,
        minZoom: 1
      });

      // Add error handling for failed tile loads
      wmsLayer.on('tileerror', (e) => {
        console.error(`Failed to load breeding layer tile: ${layerName}`, e);
      });

      // Add success handler to confirm layer loading
      wmsLayer.on('tileload', () => {
        console.log(`Successfully loaded breeding layer tile: ${layerName}`);
      });

      // Add click event for breeding suitability info
      wmsLayer.on('click', (e) => {
        L.popup()
          .setLatLng(e.latlng)
          .setContent(`
            <div class="p-2">
              <h3 class="font-semibold text-sm">Breeding Suitability - ${selectedMonth.toUpperCase()}</h3>
              <p class="text-xs text-gray-600">Location: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}</p>
              <p class="text-xs text-gray-600">ELRP Model Output</p>
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
  }, [map, visible, selectedMonth, opacity]);

  useEffect(() => {
    if (layerRef.current && visible) {
      layerRef.current.setOpacity(opacity);
    }
  }, [opacity, visible]);

  return null;
}