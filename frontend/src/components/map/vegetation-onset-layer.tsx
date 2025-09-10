import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { getMapServerUrl } from "../../utils/mapserver";

interface VegetationOnsetLayerProps {
  visible: boolean;
  opacity?: number;
}

export default function VegetationOnsetLayer({ 
  visible, 
  opacity = 0.7
}: VegetationOnsetLayerProps) {
  const map = useMap();
  const layerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!map) return;

    if (visible && !layerRef.current) {
      // Create WMS layer for vegetation onset (feeding periods) data
      const wmsLayer = L.tileLayer.wms(getMapServerUrl(), {
        layers: 'vegetation_onset',
        format: 'image/png',
        transparent: true,
        opacity: opacity,
        attribution: 'Vegetation Onset (Feeding Periods) - MapServer WMS',
        version: '1.3.0',
        maxZoom: 18,
        minZoom: 1
      });

      wmsLayer.addTo(map);
      layerRef.current = wmsLayer;
      
      console.log('Vegetation onset layer added to map');
    } else if (!visible && layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
      console.log('Vegetation onset layer removed from map');
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