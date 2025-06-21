import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

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
      // Create WMS layer for temporal breeding suitability TIFF data through MapServer
      const wmsLayer = L.tileLayer.wms('/api/mapserver', {
        layers: `temporal_breeding_${selectedMonth.toLowerCase()}`,
        format: 'image/svg+xml',
        transparent: true,
        opacity: opacity,
        attribution: `Breeding Suitability ${selectedMonth.toUpperCase()} - ELRP Model`
      } as any);

      wmsLayer.addTo(map);
      layerRef.current = wmsLayer;
      
      console.log(`Temporal breeding suitability layer for ${selectedMonth} added to map`);
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