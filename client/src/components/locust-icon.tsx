// Locust SVG icon component for trajectory markers
export default function LocustIcon({ 
  size = 24, 
  color = "#9C27B0", 
  className = "" 
}: { 
  size?: number; 
  color?: string; 
  className?: string; 
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Locust body */}
      <ellipse cx="12" cy="12" rx="8" ry="3" fill={color} opacity="0.8" />
      
      {/* Head */}
      <circle cx="12" cy="8" r="2" fill={color} />
      
      {/* Antennae */}
      <path 
        d="M10.5 7 L9 5.5 M13.5 7 L15 5.5" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      
      {/* Wings */}
      <ellipse cx="8" cy="10" rx="3" ry="1.5" fill={color} opacity="0.6" transform="rotate(-30 8 10)" />
      <ellipse cx="16" cy="10" rx="3" ry="1.5" fill={color} opacity="0.6" transform="rotate(30 16 10)" />
      
      {/* Legs */}
      <path 
        d="M6 13 L4 15 M8 14 L6 16 M10 14 L8 16" 
        stroke={color} 
        strokeWidth="1" 
        strokeLinecap="round"
      />
      <path 
        d="M18 13 L20 15 M16 14 L18 16 M14 14 L16 16" 
        stroke={color} 
        strokeWidth="1" 
        strokeLinecap="round"
      />
      
      {/* Segmentation lines */}
      <line x1="6" y1="12" x2="18" y2="12" stroke="white" strokeWidth="0.5" opacity="0.7" />
      <line x1="8" y1="11" x2="16" y2="11" stroke="white" strokeWidth="0.5" opacity="0.5" />
      <line x1="8" y1="13" x2="16" y2="13" stroke="white" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}