# East Africa Pest Watch System

A comprehensive pest monitoring and analysis platform for East Africa, providing real-time visualization and analysis of pest distribution, suitability maps, and trajectory predictions.

**Developed by Hillary Koros**
## Features

### Desert Locust Monitoring
- **Swarming Trajectory Analysis** - Real-time particle trajectory modeling
- **Outbreak Stage Classification** - Gregarious, Transiens, and Solitary phases
- **Swarm Coverage Mapping** - Multi-scale swarm distribution visualization
- **Vegetation Onset Detection** - Feeding period identification
- **Swarming Susceptibility** - MaxEnt 2021 predictive modeling
- **Breeding Suitability** - Monthly breeding condition assessment
- **Hoppers Habitat Suitability** - 10-day dekadal habitat predictions with red-yellow-green color scheme

### Fall Army Worm & Quelea Birds
- Placeholder sections for future expansion
- Modular architecture ready for additional pest types

### Interactive Mapping
- Real-time WMS layer visualization
- Dynamic layer controls and filtering
- Temporal data selection (2017-2024)
- Custom legends and tooltips
- Responsive mobile-friendly interface

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Frontend     │    │    Backend      │    │   MapServer     │
│   (React/Vite)  │◄──►│   (Node.js)     │◄──►│   (Apache)      │
│   Port: 8097    │    │   Port: 8098    │    │   Port: 8099    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                  │
                                  ▼
                       ┌─────────────────┐
                       │   MapCache      │
                       │   (Apache)      │
                       │   Port: 8100    │
                       └─────────────────┘
```

### Components

1. **Frontend (React + TypeScript)**
   - Modern React application with TypeScript
   - Leaflet mapping integration
   - Responsive UI with Tailwind CSS
   - Real-time data visualization

2. **Backend (Node.js + Express)**
   - REST API for data management
   - Integration with MapServer services
   - File serving and routing

3. **MapServer (Apache + CGI)**
   - WMS service for geospatial data
   - Dynamic layer rendering
   - Runtime substitution for temporal data

4. **MapCache (Apache)**
   - Tile caching for performance
   - Optimized map delivery

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Git
- 4GB+ RAM
- 10GB+ storage space

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/icpac-igad/pests-watch.git
   cd pests-watch
   ```

2. **Start the system**
   ```bash
   docker compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:8097
   - Backend API: http://localhost:8098
   - MapServer: http://localhost:8099
   - MapCache: http://localhost:8100

### Using Pre-built Images (Staging)

The system supports deployment using pre-built Docker images:

```bash
# Use the staging configuration
docker compose -f docker-compose.staging.yml up -d
```

Available images:
- `hkoros/pest_watch_backend:v1.1`
- `hkoros/pest_watch_frontend:v1.1`
- `hkoros/pest_watch_mapserver:v1.1`
- `hkoros/pest_watch_mapcache:v1.1`

## Data Requirements

### Geospatial Data Structure

```
mapserver/attached_assets/
├── hopper_suitability_VITO_tif/
│   ├── _HOPPER_PROB_2017_dekad_20170101.tif
│   ├── _HOPPER_PROB_2017_dekad_20170111.tif
│   └── ... (dekadal files 2017-2024)
├── Breeding_Suitability_raster_*.tif
├── Maxent_Prediction_2021_*.tif
└── other_data_layers.tif
```

### Supported Formats
- **Raster**: GeoTIFF (.tif, .tiff)
- **Projection**: EPSG:4326 (Geographic WGS84)
- **Extent**: East Africa (21.84°W to 51.42°E, -11.75°S to 23.15°N)

## Development

### Local Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development servers**
   ```bash
   # Frontend development
   npm run dev:frontend
   
   # Backend development
   npm run dev:backend
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

### Project Structure

```
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utilities and helpers
│   │   └── hooks/           # Custom React hooks
│   └── public/              # Static assets
├── backend/                 # Node.js backend
│   ├── routes.ts            # API routes
│   ├── index.ts             # Server entry point
│   └── storage.ts           # File management
├── mapserver/               # MapServer configuration
│   ├── mapfiles/            # Map configuration files
│   └── attached_assets/     # Geospatial data
├── docker/                  # Docker configurations
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   ├── mapserver.Dockerfile
│   └── mapcache.Dockerfile
└── shared/                  # Shared TypeScript schemas
```

### Key Features Implementation

#### Hoppers Habitat Suitability Layer
- **Color Scheme**: Red-Yellow-Green gradient for better contrast
- **Data Range**: 0.0 - 1.0 (decimal values)
- **Temporal Resolution**: 10-day dekads (2017-2024)
- **Classification**:
  - 0.0-0.01: Transparent
  - 0.01-0.20: Green (#00ff00)
  - 0.20-0.40: Light Green (#80ff00)
  - 0.40-0.60: Yellow (#ffff00)
  - 0.60-0.80: Orange (#ff8000)
  - 0.80-1.0: Red (#ff0000)

#### Dynamic Layer Management
- Runtime substitution for temporal data
- Configurable opacity and visibility
- Interactive legends and controls

## Docker Deployment

### Building Images

```bash
# Build all services
docker compose build

# Build specific service
docker compose build frontend
```

### Automated Docker Build and Push

The project uses GitHub Actions for automated Docker image building and pushing:

#### Continuous Integration
- **Trigger**: Push to `main` branch or pull request
- **Process**: Builds all Docker images and pushes to Docker Hub
- **Tags**: `latest` for main branch, `main` for development

#### Release Process
- **Trigger**: Creating a new release/tag (e.g., `v1.2`)
- **Process**: Builds and pushes versioned images
- **Tags**: Version tag (e.g., `v1.2`) and `latest`

#### Manual Docker Operations (if needed)

```bash
# Tag images with version
docker tag pest_watch-backend:latest hkoros/pest_watch_backend:v1.1
docker tag pest_watch-frontend:latest hkoros/pest_watch_frontend:v1.1
docker tag pest_watch-mapserver:latest hkoros/pest_watch_mapserver:v1.1
docker tag pest_watch-mapcache:latest hkoros/pest_watch_mapcache:v1.1

# Push to Docker Hub
docker push hkoros/pest_watch_backend:v1.1
docker push hkoros/pest_watch_frontend:v1.1
docker push hkoros/pest_watch_mapserver:v1.1
docker push hkoros/pest_watch_mapcache:v1.1
```

### Environment Configuration

Create environment-specific compose files:

- `docker-compose.yml` - Local development
- `docker-compose.staging.yml` - Staging deployment
- `docker-compose.prod.yml` - Production deployment

### Health Checks

The system includes health checks for critical services:

```yaml
healthcheck:
  test: ["CMD", "wget", "--spider", "http://localhost:80/cgi-bin/mapserv"]
  interval: 30s
  timeout: 10s
  retries: 3
```

## Performance Optimization

### MapServer Optimizations
- GDAL caching configuration
- Connection pooling
- Efficient raster processing

### Frontend Optimizations
- Code splitting and lazy loading
- Optimized bundle sizes
- Responsive image loading

### Caching Strategy
- MapCache for tile optimization
- Browser caching for static assets
- API response caching

## Configuration

### MapServer Configuration

Edit `mapserver/mapfiles/locust.map` for:
- Layer definitions
- Data source paths
- Styling and classification
- Metadata and projections

### Frontend Configuration

Key configuration files:
- `vite.config.ts` - Build configuration
- `tailwind.config.ts` - Styling configuration
- `tsconfig.json` - TypeScript configuration

## API Endpoints

### Backend API

- `GET /api/health` - Health check
- `GET /api/layers` - Available map layers
- `POST /api/data` - Data upload/management
- `GET /assets/*` - Static file serving

### MapServer WMS

- **GetCapabilities**: `/cgi-bin/mapserv?SERVICE=WMS&REQUEST=GetCapabilities`
- **GetMap**: `/cgi-bin/mapserv?SERVICE=WMS&REQUEST=GetMap&...`
- **GetFeatureInfo**: `/cgi-bin/mapserv?SERVICE=WMS&REQUEST=GetFeatureInfo&...`

## Security Considerations

- Input validation and sanitization
- CORS configuration
- Docker security best practices
- File upload restrictions
- Environment variable protection

## Troubleshooting

### Common Issues

1. **MapServer Not Responding**
   ```bash
   # Check MapServer health
   docker logs pest_watch_mapserver
   
   # Test WMS service
   wget "http://localhost:8099/cgi-bin/mapserv?SERVICE=WMS&REQUEST=GetCapabilities"
   ```

2. **Frontend Build Failures**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

3. **Memory Issues**
   ```bash
   # Increase Docker memory limits
   docker compose down
   # Edit docker-compose.yml memory limits
   docker compose up -d
   ```

### Logs and Monitoring

```bash
# View all service logs
docker compose logs -f

# View specific service logs
docker compose logs -f frontend
docker compose logs -f mapserver
```

## Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### GitHub Actions Setup

To enable automated Docker builds, configure these secrets in your GitHub repository:

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub access token

The workflow will automatically:
- Build and test on pull requests
- Build and push images on main branch commits
- Create versioned releases when tags are created

### Code Standards

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Docker for consistent environments

### Testing

```bash
# Run frontend tests
npm run test:frontend

# Run backend tests
npm run test:backend

# Integration tests
npm run test:integration
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:

- **Developer**: Hillary Koros
- **Organization**: ICPAC (IGAD Climate Prediction and Applications Centre)
- **Repository**: https://github.com/icpac-igad/pests-watch
- **Issues**: https://github.com/icpac-igad/pests-watch/issues

## Version History

### v1.1 (Current)
- Updated Hoppers Habitat Suitability layer with red-yellow-green color scheme
- Implemented decimal value ranges (0.0-1.0)
- Enhanced layer legends and controls
- Improved Docker deployment configuration
- Comprehensive documentation

### v1.0
- Initial release with core pest monitoring features
- MapServer integration
- Responsive frontend interface
- Docker containerization

---

**Note**: This system requires geospatial datasets that are not included in the repository due to size constraints. Contact the development team for access to the required data files.

*Developed for East Africa pest monitoring and food security.*