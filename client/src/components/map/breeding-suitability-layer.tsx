import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface BreedingSuitabilityLayerProps {
  visible: boolean;
  opacity?: number;
}

export default function BreedingSuitabilityLayer({ 
  visible, 
  opacity = 0.7
}: BreedingSuitabilityLayerProps) {
  const map = useMap();
  const layerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!map) return;

    if (visible && !layerRef.current) {
      // Create WMS layer for breeding suitability TIFF data through MapServer
      const wmsLayer = L.tileLayer.wms('/api/mapserver', {
        layers: 'breeding_suitability',
        format: 'image/svg+xml',
        transparent: true,
        opacity: opacity,
        attribution: 'Breeding Suitability Data - ELRP Model'
      } as any);

      wmsLayer.addTo(map);
      layerRef.current = wmsLayer;
      
      console.log('Breeding suitability layer added to map');
    } else if (!visible && layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [map, visible, opacity]);

  useEffect(() => {
    if (layerRef.current && visible) {
      layerRef.current.setOpacity(opacity);
    }
  }, [opacity, visible]);

  return null;
}