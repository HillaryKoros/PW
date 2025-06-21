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

  const getStageColor = (stage: string, phase: string): string => {
    const stageColors = {
      'Crisis Stage': '#FF0000',
      'Alert Stage': '#FF8C00', 
      'Alarm Stage': '#FFD700',
      'Calm Stage': '#90EE90'
    };
    
    // Slightly modify color based on phase
    let baseColor = stageColors[stage as keyof typeof stageColors] || '#CCCCCC';
    
    if (phase === 'gregarious') {
      // Gregarious phase - more intense color
      return baseColor;
    } else if (phase === 'transiens') {
      // Transiens phase - intermediate color
      return baseColor + 'CC'; // Add transparency
    } else {
      // Solitary phase - lighter color
      return baseColor + '88'; // More transparency
    }
  };

  const getStageRadius = (stage: string, phase: string): number => {
    const baseRadii = {
      'Crisis Stage': 8,
      'Alert Stage': 6,
      'Alarm Stage': 4,
      'Calm Stage': 3
    };
    
    let baseRadius = baseRadii[stage as keyof typeof baseRadii] || 3;
    
    // Adjust radius based on phase
    if (phase === 'gregarious') {
      return baseRadius + 2; // Larger for gregarious
    } else if (phase === 'transiens') {
      return baseRadius + 1; // Medium for transiens
    } else {
      return baseRadius; // Normal for solitary
    }
  };

  const getPhaseLabel = (phase: string): string => {
    const labels = {
      'gregarious': 'Gregarious (Swarming)',
      'transiens': 'Transiens (Transitional)', 
      'solitary': 'Solitary (Individual)'
    };
    return labels[phase as keyof typeof labels] || phase;
  };

  if (!visible || !outbreakData) {
    return null;
  }

  return (
    <GeoJSON
      data={outbreakData}
      pointToLayer={(feature, latlng) => {
        const stage = feature.properties.outbreak_stage;
        const phase = feature.properties.locust_phase;
        const color = getStageColor(stage, phase);
        const radius = getStageRadius(stage, phase);
        
        return L.circleMarker(latlng, {
          radius: radius,
          fillColor: color,
          color: '#FFFFFF',
          weight: 2,
          opacity: opacity,
          fillOpacity: opacity * 0.7
        });
      }}
      onEachFeature={(feature, layer) => {
        const props = feature.properties;
        const phaseLabel = getPhaseLabel(props.locust_phase);
        
        layer.bindPopup(`
          <div style="min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; color: #333; font-size: 14px;">
              <span style="color: ${getStageColor(props.outbreak_stage, props.locust_phase).replace(/[0-9A-F]{2}$/i, '')};">●</span>
              ${props.outbreak_stage}
            </h4>
            <div style="background: #f5f5f5; padding: 8px; border-radius: 4px; margin-bottom: 8px;">
              <p style="margin: 2px 0; font-weight: bold;">Phase: ${phaseLabel}</p>
              <p style="margin: 2px 0;">Density: ${props.locust_density}</p>
              <p style="margin: 2px 0;">Type: ${props.locust_type}</p>
            </div>
            <div style="font-size: 12px; color: #666;">
              <p style="margin: 2px 0;"><strong>Environment:</strong></p>
              <p style="margin: 2px 0;">• Vegetation: ${props.vegetation_state}</p>
              <p style="margin: 2px 0;">• Land Cover: ${props.land_cover}</p>
              <p style="margin: 2px 0;">• Soil: ${props.soil_moisture}</p>
              <p style="margin: 2px 0;">• Temperature: ${props.temperature}</p>
            </div>
          </div>
        `);
      }}
    />
  );
}