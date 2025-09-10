import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { getMapServerUrl } from "../../utils/mapserver";

interface AdminBoundariesLayerProps {
  visible: boolean;
  showAdmin0?: boolean;
  showAdmin1?: boolean;
  opacity?: number;
}

export default function AdminBoundariesLayer({ 
  visible, 
  showAdmin0 = true, 
  showAdmin1 = false, 
  opacity = 0.7 
}: AdminBoundariesLayerProps) {
  const map = useMap();
  const admin0LayerRef = useRef<L.TileLayer | null>(null);
  const admin1LayerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!map) return;

    // Create custom pane for admin boundaries to ensure they're always on top
    if (!map.getPane('adminPane')) {
      const adminPane = map.createPane('adminPane');
      adminPane.style.zIndex = '1000';
      adminPane.style.pointerEvents = 'none'; // Allow click-through for better UX
    }

    // Admin0 layer management
    if (showAdmin0 && !admin0LayerRef.current && visible) {
      const admin0Layer = L.tileLayer.wms(getMapServerUrl(), {
        layers: 'admin0',
        format: 'image/png',
        transparent: true,
        opacity: opacity,
        crs: L.CRS.EPSG3857,
        attribution: 'Administrative Boundaries - Countries',
        pane: 'adminPane'
      });
      
      admin0Layer.addTo(map);
      admin0LayerRef.current = admin0Layer;
      console.log('Admin0 WMS layer added to map with custom pane');
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
        crs: L.CRS.EPSG3857,
        attribution: 'Administrative Boundaries - States/Provinces',
        pane: 'adminPane'
      });
      
      admin1Layer.addTo(map);
      admin1LayerRef.current = admin1Layer;
      console.log('Admin1 WMS layer added to map');
    } else if (!showAdmin1 && admin1LayerRef.current) {
      map.removeLayer(admin1LayerRef.current);
      admin1LayerRef.current = null;
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