import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface OutbreakStagesLayerProps {
  visible: boolean;
  opacity?: number;
}

export default function OutbreakStagesLayer({ 
  visible, 
  opacity = 0.8
}: OutbreakStagesLayerProps) {
  const map = useMap();
  const layerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!map) return;

    if (visible && !layerRef.current) {
      // Create WMS layer for outbreak stages GeoJSON data through MapServer
      const wmsLayer = L.tileLayer.wms('/api/mapserver', {
        layers: 'outbreak_stages',
        format: 'image/svg+xml',
        transparent: true,
        opacity: opacity,
        attribution: 'Locust Outbreak Stages - ELRP Model'
      } as any);

      wmsLayer.addTo(map);
      layerRef.current = wmsLayer;
      
      console.log('Outbreak stages layer added to map');
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