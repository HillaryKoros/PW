import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';

interface SwarmCoverageLayerProps {
  visible: boolean;
  opacity?: number;
}

interface SwarmFeature {
  type: "Feature";
  properties: {
    [key: string]: any;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

interface SwarmData {
  type: "FeatureCollection";
  features: SwarmFeature[];
}

export default function SwarmCoverageLayer({ 
  visible, 
  opacity = 0.7 
}: SwarmCoverageLayerProps) {
  const [swarmData, setSwarmData] = useState<SwarmData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible && !swarmData) {
      loadSwarmData();
    }
  }, [visible, swarmData]);

  const loadSwarmData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Convert shapefile to GeoJSON using a conversion service or API
      // For now, we'll use a placeholder endpoint that should handle shapefile conversion
      const response = await fetch('/api/swarm-coverage');
      
      if (!response.ok) {
        throw new Error(`Failed to load swarm coverage data: ${response.status}`);
      }
      
      const data = await response.json();
      setSwarmData(data);
    } catch (err) {
      console.error('Error loading swarm coverage data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load swarm coverage data');
    } finally {
      setLoading(false);
    }
  };

  const getSwarmStyle = (feature?: any) => {
    // Style based on swarm properties
    const intensity = feature?.properties?.intensity || 0.5;
    const swarmType = feature?.properties?.type || 'unknown';
    
    let color = '#ff4444'; // Default red
    let fillOpacity = 0.6;
    
    // Different colors for different swarm types/intensities
    if (swarmType === 'breeding') {
      color = '#ffaa00';
    } else if (swarmType === 'feeding') {
      color = '#44ff44';
    } else if (swarmType === 'migration') {
      color = '#4444ff';
    }
    
    // Adjust opacity based on intensity
    fillOpacity = Math.max(0.3, intensity * 0.8);
    
    return {
      color: color,
      fillColor: color,
      weight: 2,
      opacity: opacity,
      fillOpacity: fillOpacity * (opacity || 1),
      dashArray: swarmType === 'predicted' ? '5, 5' : undefined
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      const props = feature.properties;
      const popupContent = `
        <div class="p-2">
          <h3 class="font-bold text-sm mb-1">Swarm Coverage</h3>
          ${props.type ? `<p><strong>Type:</strong> ${props.type}</p>` : ''}
          ${props.intensity ? `<p><strong>Intensity:</strong> ${(props.intensity * 100).toFixed(1)}%</p>` : ''}
          ${props.area ? `<p><strong>Area:</strong> ${props.area} km²</p>` : ''}
          ${props.date ? `<p><strong>Date:</strong> ${props.date}</p>` : ''}
          ${props.density ? `<p><strong>Density:</strong> ${props.density}</p>` : ''}
        </div>
      `;
      layer.bindPopup(popupContent);
    }
  };

  if (!visible) return null;
  
  if (loading) {
    return null; // Could add a loading indicator
  }
  
  if (error) {
    console.warn('Swarm coverage layer error:', error);
    return null;
  }
  
  if (!swarmData || !swarmData.features.length) {
    return null;
  }

  return (
    <GeoJSON
      key={`swarm-coverage-${opacity}`}
      data={swarmData}
      style={getSwarmStyle}
      onEachFeature={onEachFeature}
    />
  );
}