export function getMapServerUrl(): string {
  // In production/staging, use the current host with port 8098
  // In development, use localhost
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isDevelopment) {
    return 'http://localhost:8099/cgi-bin/mapserv?map=/var/www/html/locust.map';
  }
  
  // For staging/production, use the current hostname with port 8099
  return `http://${window.location.hostname}:8099/cgi-bin/mapserv?map=/var/www/html/locust.map`;
}

export function getMapCacheUrl(): string {
  // MapCache WMS endpoint for improved performance
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isDevelopment) {
    return 'http://localhost:8100/wms';
  }
  
  // For staging/production, use the current hostname with port 8100
  return `http://${window.location.hostname}:8100/wms`;
}