# East Africa Pest Watch

A comprehensive GIS application for monitoring locust outbreaks and pest management in East Africa.


## Quick Start

### Local Development
```bash
# Build and start all services
docker-compose up -d --build
```

### Production Deployment
```bash
# Use tagged images for production
docker-compose -f docker-compose.staging.yml up -d
```

## Services

After deployment, the following services will be available:

- **Frontend**: http://localhost:8097 - Main web application
- **Backend**: http://localhost:5000 - REST API server
- **MapServer**: http://localhost:8099 - WMS/WFS geospatial services
- **MapCache**: http://localhost:8100 - Tile caching service

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    East Africa Pest Watch v1.0             │
│                     Docker Container Stack                  │
└─────────────────────────────────────────────────────────────┘

    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │  Frontend   │    │   Backend   │    │ MapServer   │
    │ (React/Vite)│────│ (Node.js/   │────│ (Apache/    │
    │  Port: 8097 │    │ Express)    │    │ MapServer)  │
    │             │    │ Port: 8098  │    │ Port: 8099  │
    └─────────────┘    └─────────────┘    └─────────────┘
           │                   │                   │
           │                   │           ┌─────────────┐
           │                   │           │  MapCache   │
           │                   │───────────│ (Apache/    │
           │                               │ mod_mapcache│
           │                               │ Port: 8100  │
           │                               └─────────────┘
           │
    ┌─────────────────────────────────────────────────────────┐
    │              Geospatial Data Layers                     │
    │  • Breeding Suitability (Jan, Feb, Apr, Jul, Nov, Dec) │
    │  • Administrative Boundaries (Admin0, Admin1)          │
    │  • Locust Outbreak Stages & Swarm Coverage            │
    │  • MaxEnt Swarming Susceptibility                      │
    │  • Vegetation Onset (Feeding Periods)                  │
    └─────────────────────────────────────────────────────────┘
```

### Container Images
- **pest_watch_frontend:v1.0** - React/TypeScript frontend
- **pest_watch_backend:v1.0** - Node.js API server  
- **pest_watch_mapserver:v1.0** - MapServer with all geospatial data
- **pest_watch_mapcache:v1.0** - Tile caching service

## Features

### Core Functionality
- **Interactive Map Visualization** with multiple geospatial layers
- **Temporal Breeding Suitability Analysis** (6 months: Jan, Feb, Apr, Jul, Nov, Dec)
- **Locust Outbreak Monitoring** with outbreak stages and swarm coverage
- **Administrative Boundary Overlays** (Country and State level)
- **MaxEnt Swarming Susceptibility** modeling
- **Vegetation Onset Analysis** for feeding period monitoring

### Technical Features
- **Containerized Architecture** for easy deployment
- **WMS/WFS Geospatial Services** via MapServer
- **Tile Caching** for optimal performance via MapCache
- **Responsive Web Interface** built with React/TypeScript
- **RESTful API** for data access
- **Production-Ready Deployment** with Docker images

### Data Layers
- ✅ **Breeding Suitability** - Temporal analysis across multiple months
- ✅ **Administrative Boundaries** - Admin0 (Countries) & Admin1 (States)
- ✅ **Locust Data** - Outbreak stages, swarm coverage, trajectories
- ✅ **Environmental Data** - Vegetation indices and feeding periods
- ✅ **Susceptibility Modeling** - MaxEnt prediction models

## Development

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Docker Development

```bash
# Build and start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Stop services
docker compose down

# Rebuild specific service
docker compose up -d --build mapserver
```

## Configuration

### Environment Variables

- `NODE_ENV`: Environment (development/production)
- `PORT`: Backend server port (default: 5000)
- `MAPSERVER_URL`: MapServer endpoint
- `MAPCACHE_URL`: MapCache endpoint

### MapServer Configuration

MapServer configuration is located in `mapserver/mapfiles/locust.map`. This file defines:

- Data sources and layers
- Styling and symbology
- WMS/WFS service metadata
- Projection settings



## Deployment

### Local Development
```bash
# Clone repository
git clone <repository-url>
cd pest_watch

# Build and start services
docker-compose up -d --build

# Access application at http://localhost:8097
```

## API Endpoints

### Backend API

- `GET /api/admin0` - Administrative level 0 boundaries
- `GET /api/admin1` - Administrative level 1 boundaries  
- `GET /api/locust/outbreaks` - Locust outbreak data
- `GET /api/locust/breeding` - Breeding suitability data

### MapServer WMS

- **GetCapabilities**: `http://localhost:8099/cgi-bin/mapserv?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities`
- **GetMap**: `http://localhost:8099/cgi-bin/mapserv?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=admin0&...`



### Testing Services

```bash
# Test frontend
curl http://localhost:8097

# Test backend
curl http://localhost:5000/api/admin0

# Test MapServer
curl "http://localhost:8099/cgi-bin/mapserv?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities"

# Test MapCache
curl http://localhost:8100
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Maintainer

**Maintained by**: Hillary Koros  
**Email**: koroshillary12@gmail.com  
**Organization**: IGAD-ICPAC  

## Support

For support and questions, please contact the IGAD-ICPAC team.