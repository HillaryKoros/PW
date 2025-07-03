import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { getMapServerUrl } from "../../utils/mapserver";

interface AdminBoundariesWMSLayerProps {
  visible: boolean;
  showAdmin0?: boolean;
  showAdmin1?: boolean;
  opacity?: number;
}

export default function AdminBoundariesWMSLayer({ 
  visible, 
  showAdmin0 = true, 
  showAdmin1 = false, 
  opacity = 0.7 
}: AdminBoundariesWMSLayerProps) {
  const map = useMap();
  const admin0LayerRef = useRef<L.TileLayer | null>(null);
  const admin1LayerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!map) return;

    // Admin0 layer management
    if (showAdmin0 && !admin0LayerRef.current && visible) {
      const admin0Layer = L.tileLayer.wms(getMapServerUrl(), {
        layers: 'admin0',
        format: 'image/png',
        transparent: true,
        opacity: opacity,
        crs: L.CRS.EPSG3857,
        attribution: 'Administrative Boundaries - Countries'
      });
      
      admin0Layer.addTo(map);
      admin0LayerRef.current = admin0Layer;
      console.log('Admin0 WMS layer added to map');
    } else if (!showAdmin0 && admin0LayerRef.current) {
      map.removeLayer(admin0LayerRef.current);
      admin0LayerRef.current = null;
      console.log('Admin0 WMS layer removed from map');
    }

    // Admin1 layer management
    if (showAdmin1 && !admin1LayerRef.current && visible) {
      const admin1Layer = L.tileLayer.wms(getMapServerUrl(), {
        layers: 'admin1',
        format: 'image/png',
        transparent: true,
        opacity: opacity * 0.6,
        attribution: 'Administrative Boundaries - States/Provinces'
      });
      
      admin1Layer.addTo(map);
      admin1LayerRef.current = admin1Layer;
      console.log('Admin1 WMS layer added to map');
    } else if (!showAdmin1 && admin1LayerRef.current) {
      map.removeLayer(admin1LayerRef.current);
      admin1LayerRef.current = null;
      console.log('Admin1 WMS layer removed from map');
    }

    // Cleanup on visibility change
    if (!visible) {
      if (admin0LayerRef.current) {
        map.removeLayer(admin0LayerRef.current);
        admin0LayerRef.current = null;
      }
      if (admin1LayerRef.current) {
        map.removeLayer(admin1LayerRef.current);
        admin1LayerRef.current = null;
      }
    }

    return () => {
      if (admin0LayerRef.current) {
        map.removeLayer(admin0LayerRef.current);
        admin0LayerRef.current = null;
      }
      if (admin1LayerRef.current) {
        map.removeLayer(admin1LayerRef.current);
        admin1LayerRef.current = null;
      }
    };
  }, [map, visible, showAdmin0, showAdmin1, opacity]);

  // Update opacity when it changes
  useEffect(() => {
    if (admin0LayerRef.current && visible && showAdmin0) {
      admin0LayerRef.current.setOpacity(opacity);
    }
    if (admin1LayerRef.current && visible && showAdmin1) {
      admin1LayerRef.current.setOpacity(opacity * 0.6);
    }
  }, [opacity, visible, showAdmin0, showAdmin1]);

  return null;
}