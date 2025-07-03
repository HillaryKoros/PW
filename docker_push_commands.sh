#!/bin/bash

# Docker Push Commands for Pest Watch v1.0
# Run these commands manually to push to Docker Hub

echo "=== Docker Login ==="
echo "First, login to Docker Hub:"
echo "docker login"
echo ""

echo "=== Tag Images for hkoros Registry ==="
docker tag pest_watch_backend:v1.0 hkoros/pest_watch_backend:v1.0
docker tag pest_watch_frontend:v1.0 hkoros/pest_watch_frontend:v1.0
docker tag pest_watch_mapserver:v1.0 hkoros/pest_watch_mapserver:v1.0
docker tag pest_watch_mapcache:v1.0 hkoros/pest_watch_mapcache:v1.0

echo "=== Push Backend ==="
docker push hkoros/pest_watch_backend:v1.0

echo "=== Push Frontend ==="
docker push hkoros/pest_watch_frontend:v1.0

echo "=== Push MapServer ==="
docker push hkoros/pest_watch_mapserver:v1.0

echo "=== Push MapCache ==="
docker push hkoros/pest_watch_mapcache:v1.0

echo ""
echo "=== Verify Images on Docker Hub ==="
echo "Check these URLs:"
echo "https://hub.docker.com/r/hkoros/pest_watch_backend/tags"
echo "https://hub.docker.com/r/hkoros/pest_watch_frontend/tags"
echo "https://hub.docker.com/r/hkoros/pest_watch_mapserver/tags"
echo "https://hub.docker.com/r/hkoros/pest_watch_mapcache/tags"
echo ""

echo "=== Images Ready for Staging Deployment ==="
echo "On your staging server (197.254.1.10), run:"
echo "wget https://raw.githubusercontent.com/your-repo/docker-compose.staging.yml"
echo "docker-compose -f docker-compose.staging.yml up -d"