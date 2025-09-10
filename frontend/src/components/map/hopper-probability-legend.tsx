import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface HopperProbabilityLegendProps {
  visible: boolean;
}

export default function HopperProbabilityLegend({ visible }: HopperProbabilityLegendProps) {
  const map = useMap();
  const [legendControl, setLegendControl] = useState<L.Control | null>(null);

  useEffect(() => {
    if (!visible) {
      // Remove legend if not visible
      if (legendControl) {
        map.removeControl(legendControl);
        setLegendControl(null);
      }
      return;
    }

    // Create legend control
    const legend = new L.Control({ position: "topright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "hopper-probability-legend");
      div.style.cssText = `
        background: white;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        border: 1px solid #ccc;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 12px;
        line-height: 1.4;
        min-width: 150px;
      `;

      div.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 8px; color: #374151;">
          Hoppers Habitat Suitability
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 16px; height: 16px; background: transparent; border: 1px solid #ccc; border-radius: 2px;"></div>
            <span style="color: #6b7280;">0.0 - 0.01</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 16px; height: 16px; background: #ACB334; border: 1px solid #ccc; border-radius: 2px;"></div>
            <span style="color: #6b7280;">0.01 - 0.20</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 16px; height: 16px; background: #FAB733; border: 1px solid #ccc; border-radius: 2px;"></div>
            <span style="color: #6b7280;">0.20 - 0.40</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 16px; height: 16px; background: #FF9E15; border: 1px solid #ccc; border-radius: 2px;"></div>
            <span style="color: #6b7280;">0.40 - 0.60</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 16px; height: 16px; background: #FF4E11; border: 1px solid #ccc; border-radius: 2px;"></div>
            <span style="color: #6b7280;">0.60 - 0.80</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 16px; height: 16px; background: #FF0D0D; border: 1px solid #ccc; border-radius: 2px;"></div>
            <span style="color: #6b7280;">0.80 - 1.0</span>
          </div>
        </div>
      `;

      return div;
    };

    map.addControl(legend);
    setLegendControl(legend);

    // Cleanup function
    return () => {
      if (legend) {
        map.removeControl(legend);
      }
    };
  }, [map, visible]);

  return null;
}