import { useEffect, useRef, useState } from "react";
import { useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";

interface OutbreakStagesLayerProps {
  visible: boolean;
  opacity?: number;
}

interface OutbreakFeature {
  type: "Feature";
  properties: {
    outbreak_stage: string;
    locust_density: string;
    locust_phase: string;
    locust_type: string;
    vegetation_state: string;
    land_cover: string;
    soil_moisture: string;
    temperature: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

interface OutbreakData {
  type: "FeatureCollection";
  features: OutbreakFeature[];
}

export default function OutbreakStagesLayer({ 
  visible, 
  opacity = 0.8
}: OutbreakStagesLayerProps) {
  const map = useMap();
  const [outbreakData, setOutbreakData] = useState<OutbreakData | null>(null);

  useEffect(() => {
    if (visible && !outbreakData) {
      fetch('/api/outbreak-stages')
        .then(response => response.json())
        .then(data => {
          setOutbreakData(data);
          console.log('Authentic outbreak stages data loaded:', data.features.length, 'points');
        })
        .catch(error => {
          console.error('Error loading outbreak stages data:', error);
        });
    }
  }, [visible, outbreakData]);

  const getStageColor = (stage: string): string => {
    const colors = {
      'Crisis Stage': '#FF0000',
      'Alert Stage': '#FF8C00',
      'Alarm Stage': '#FFD700',
      'Calm Stage': '#90EE90'
    };
    return colors[stage as keyof typeof colors] || '#CCCCCC';
  };

  const getStageRadius = (stage: string): number => {
    const radii = {
      'Crisis Stage': 8,
      'Alert Stage': 6,
      'Alarm Stage': 4,
      'Calm Stage': 3
    };
    return radii[stage as keyof typeof radii] || 3;
  };

  if (!visible || !outbreakData) {
    return null;
  }

  return (
    <GeoJSON
      data={outbreakData}
      pointToLayer={(feature, latlng) => {
        const stage = feature.properties.outbreak_stage;
        const color = getStageColor(stage);
        const radius = getStageRadius(stage);
        
        return L.circleMarker(latlng, {
          radius: radius,
          fillColor: color,
          color: '#FFFFFF',
          weight: 1,
          opacity: opacity,
          fillOpacity: opacity * 0.8
        });
      }}
      onEachFeature={(feature, layer) => {
        const props = feature.properties;
        layer.bindPopup(`
          <div>
            <h4><strong>${props.outbreak_stage}</strong></h4>
            <p><strong>Locust Density:</strong> ${props.locust_density}</p>
            <p><strong>Phase:</strong> ${props.locust_phase}</p>
            <p><strong>Type:</strong> ${props.locust_type}</p>
            <p><strong>Vegetation:</strong> ${props.vegetation_state}</p>
            <p><strong>Land Cover:</strong> ${props.land_cover}</p>
            <p><strong>Soil:</strong> ${props.soil_moisture}</p>
            <p><strong>Temperature:</strong> ${props.temperature}</p>
          </div>
        `);
      }}
    />
  );
}