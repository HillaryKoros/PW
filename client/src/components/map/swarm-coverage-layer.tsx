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
    // Style based on actual shapefile geometry
    // Since the shapefile appears to be polygon coverage areas
    return {
      color: '#ff4444',
      fillColor: '#ff4444',
      weight: 2,
      opacity: opacity,
      fillOpacity: 0.6 * (opacity || 1),
      dashArray: undefined
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const popupContent = `
      <div class="p-2">
        <h3 class="font-bold text-sm mb-1">Locust Swarm Coverage 2024</h3>
        <p class="text-sm">Historical swarm coverage area</p>
      </div>
    `;
    layer.bindPopup(popupContent);
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