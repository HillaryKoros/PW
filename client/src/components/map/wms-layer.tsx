import { useEffect, useRef } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { buildWMSUrl } from "@/lib/mapserver-config";

interface WMSLayerProps {
  layer: string;
  mapfile: string;
  visible: boolean;
  opacity?: number;
  useCache?: boolean;
  zIndex?: number;
  title?: string;
}

export default function WMSLayer({
  layer,
  mapfile,
  visible,
  opacity = 1,
  useCache = false,
  zIndex = 1,
  title = "WMS Layer"
}: WMSLayerProps) {
  const map = useMap();
  const layerRef = useRef<L.TileLayer.WMS | null>(null);

  useEffect(() => {
    if (!map) return;

    // Remove existing layer if it exists
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }

    if (visible) {
      // Create WMS layer
      const wmsLayer = L.tileLayer.wms(
        useCache ? "http://localhost:8081/mapcache" : "http://localhost:8080/cgi-bin/mapserv",
        {
          layers: layer,
          map: mapfile,
          format: "image/png",
          transparent: true,
          version: "1.3.0",
          crs: L.CRS.EPSG4326,
          opacity: opacity,
          zIndex: zIndex,
          attribution: `${title} - ELRP Model Output`
        }
      );

      // Add layer to map
      wmsLayer.addTo(map);
      layerRef.current = wmsLayer;
    }

    // Cleanup function
    return () => {
      if (layerRef.current && map) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [map, layer, mapfile, visible, opacity, useCache, zIndex, title]);

  // Update opacity when it changes
  useEffect(() => {
    if (layerRef.current && visible) {
      layerRef.current.setOpacity(opacity);
    }
  }, [opacity, visible]);

  return null; // This component doesn't render anything directly
}