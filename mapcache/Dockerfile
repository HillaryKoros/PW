FROM ubuntu:20.04

# Set environment variable to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install MapCache and dependencies
RUN apt-get update && apt-get install -y \
    apache2 \
    libapache2-mod-mapcache \
    mapcache-tools \
    gdal-bin \
    libgdal-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy mapcache configuration
COPY mapcache/mapcache.xml /etc/mapcache/mapcache.xml

# Create cache directory and set permissions
RUN mkdir -p /var/cache/mapcache && \
    chmod -R 755 /var/cache/mapcache && \
    chmod -R 755 /etc/mapcache/ && \
    chown -R www-data:www-data /var/cache/mapcache && \
    chown -R www-data:www-data /etc/mapcache/

# Enable Apache modules
RUN a2enmod mapcache headers rewrite

# Environment variables
ENV MAPCACHE_CONFIG=/etc/mapcache/mapcache.xml

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider "http://127.0.0.1:80/?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0" || exit 1

EXPOSE 80

# Start Apache
CMD ["apache2ctl", "-D", "FOREGROUND"]