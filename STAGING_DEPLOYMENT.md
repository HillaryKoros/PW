# Pest Watch Staging Deployment Guide

## Prerequisites on Staging Server (197.254.1.10)

1. **Docker and Docker Compose installed**
2. **Access to hkoros registry** (login with `docker login`)

## Deployment Steps

### 1. Create deployment directory
```bash
mkdir -p /opt/pest_watch
cd /opt/pest_watch
```

### 2. Download the staging compose file
```bash
wget https://raw.githubusercontent.com/your-repo/pest_watch/main/docker-compose.staging.yml
# Or copy the docker-compose.staging.yml file to the server
```

### 3. Login to Docker registry
```bash
docker login
# Use your hkoros credentials
```

### 4. Pull the tagged images
```bash
docker pull hkoros/pest_watch_backend:v1.0
docker pull hkoros/pest_watch_frontend:v1.0
docker pull hkoros/pest_watch_mapserver:v1.0
docker pull hkoros/pest_watch_mapcache:v1.0
```

### 5. Start the application
```bash
docker-compose -f docker-compose.staging.yml up -d
```

### 6. Verify deployment
```bash
# Check all containers are running
docker-compose -f docker-compose.staging.yml ps

# Check logs if needed
docker-compose -f docker-compose.staging.yml logs -f
```

## Access URLs on Staging Server

- **Frontend**: http://197.254.1.10:8097
- **Backend API**: http://197.254.1.10:8098
- **MapServer**: http://197.254.1.10:8099
- **MapCache**: http://197.254.1.10:8100

## Important Notes

### Data Persistence
- **YES**: All data files (GeoTIFF, shapefiles, etc.) are baked into the Docker images
- **YES**: MapServer configuration files are included in the images
- **YES**: All breeding suitability layers will work on staging as they do locally

### What's Included in Images
- ✅ All MapServer mapfiles (`/etc/mapserver/mapfiles/`)
- ✅ All data assets (`/etc/mapserver/attached_assets/`)
- ✅ Frontend build with all components
- ✅ Backend API with all endpoints
- ✅ MapCache configuration

### Updating the Application
To update to a new version:
```bash
# Stop current deployment
docker-compose -f docker-compose.staging.yml down

# Pull new version (e.g., v1.1)
docker pull hkoros/pest_watch_backend:v1.1
docker pull hkoros/pest_watch_frontend:v1.1
docker pull hkoros/pest_watch_mapserver:v1.1
docker pull hkoros/pest_watch_mapcache:v1.1

# Update docker-compose.staging.yml to use v1.1 tags
# Then restart
docker-compose -f docker-compose.staging.yml up -d
```

## Troubleshooting

### If breeding layers don't work:
1. Check MapServer logs: `docker logs pest_watch_mapserver`
2. Test direct WMS: `curl "http://197.254.1.10:8099/cgi-bin/mapserv?SERVICE=WMS&REQUEST=GetCapabilities"`

### If frontend doesn't load:
1. Check frontend logs: `docker logs pest_watch_frontend`
2. Verify nginx config is working

### General health check:
```bash
# Check all services
docker-compose -f docker-compose.staging.yml ps
```