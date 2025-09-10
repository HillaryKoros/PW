export function getMapServerUrl(): string {
  // Always use the current hostname with port 8099 for mapserver
  // This works for both development (127.0.0.1:8097) and production
  const hostname = window.location.hostname;
  
  // Use the same hostname as the frontend but different port for mapserver
  return `http://${hostname}:8099/cgi-bin/mapserv?map=/var/www/html/locust.map`;
}

export function getMapCacheUrl(): string {
  // Always use the current hostname with port 8100 for mapcache
  // This works for both development (127.0.0.1:8097) and production
  const hostname = window.location.hostname;
  
  // Use the same hostname as the frontend but different port for mapcache
  return `http://${hostname}:8100/wms`;
}