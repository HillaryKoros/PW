import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface LocustCoverageLayerProps {
  visible: boolean;
  opacity?: number;
}

export default function LocustCoverageLayer({ 
  visible, 
  opacity = 0.7
}: LocustCoverageLayerProps) {
  const map = useMap();
  const layerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!map) return;

    if (visible && !layerRef.current) {
      // Create WMS layer for locust coverage shapefile data through MapServer
      const wmsLayer = L.tileLayer.wms('/api/mapserver', {
        layers: 'locust_coverage',
        format: 'image/svg+xml',
        transparent: true,
        opacity: opacity,
        attribution: 'Locust Swarm Coverage Data - ELRP Model'
      } as any);

      wmsLayer.addTo(map);
      layerRef.current = wmsLayer;
      
      console.log('Locust coverage layer added to map');
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