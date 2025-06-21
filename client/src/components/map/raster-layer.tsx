import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface RasterLayerProps {
  url: string;
  visible: boolean;
  opacity?: number;
  bounds?: [[number, number], [number, number]];
  colorMap?: string;
}

export default function RasterLayer({ 
  url, 
  visible, 
  opacity = 0.7, 
  bounds,
  colorMap = "viridis"
}: RasterLayerProps) {
  const map = useMap();
  const layerRef = useRef<L.ImageOverlay | null>(null);

  useEffect(() => {
    if (!map) return;

    if (visible && !layerRef.current) {
      // Create WMS layer for TIFF raster data
      const wmsLayer = L.tileLayer.wms('/api/wms', {
        layers: 'feeding_susceptibility',
        format: 'image/png',
        transparent: true,
        opacity: opacity,
        styles: `colormap=${colorMap}`,
        attribution: 'Feeding Susceptibility Data'
      });

      wmsLayer.addTo(map);
      layerRef.current = wmsLayer as any;
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
  }, [map, visible, opacity, colorMap]);

  useEffect(() => {
    if (layerRef.current && visible) {
      layerRef.current.setOpacity(opacity);
    }
  }, [opacity, visible]);

  return null;
}