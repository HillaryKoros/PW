import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { getMapServerUrl } from "../../utils/mapserver";

interface GregarizationLayerProps {
  visible: boolean;
  opacity?: number;
}

export default function GregarizationLayer({ 
  visible, 
  opacity = 0.7
}: GregarizationLayerProps) {
  const map = useMap();
  const layerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!map) return;

    if (visible && !layerRef.current) {
      // Create WMS layer for Maxent prediction TIFF data through MapServer
      const wmsLayer = L.tileLayer.wms(getMapServerUrl(), {
        layers: 'maxent_prediction_2021',
        format: 'image/png',
        transparent: true,
        opacity: opacity,
        crs: L.CRS.EPSG4326,
        attribution: 'MaxEnt Prediction 2021 - MapServer WMS'
      });

      // Add click event for gregarization info
      wmsLayer.on('click', (e) => {
        const popup = L.popup()
          .setLatLng(e.latlng)
          .setContent(`
            <div class="p-2">
              <h3 class="font-semibold text-sm">Gregarization/Swarming</h3>
              <p class="text-xs text-gray-600">Location: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}</p>
              <p class="text-xs text-gray-600">MaxEnt Prediction 2021</p>
            </div>
          `)
          .openOn(map);
      });

      wmsLayer.addTo(map);
      layerRef.current = wmsLayer;
      
      console.log('Gregarization/swarming layer added to map');
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