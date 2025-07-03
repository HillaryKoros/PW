FROM ubuntu:20.04

# Set environment variable to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install MapServer and dependencies
RUN apt-get update && apt-get install -y \
    apache2 \
    cgi-mapserver \
    mapserver-bin \
    gdal-bin \
    python3-gdal \
    libproj-dev \
    libapache2-mod-fcgid \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache modules
RUN a2enmod cgi fcgid headers rewrite

# Copy mapfiles and configuration
COPY mapserver/mapfiles/ /etc/mapserver/mapfiles/
COPY mapserver/apache.conf /etc/apache2/sites-available/mapserver.conf

# Create data directory (will be mounted from host)
RUN mkdir -p /data/attached_assets

# Enable the site and disable default
RUN a2ensite mapserver && a2dissite 000-default

# Set permissions
RUN chmod -R 755 /etc/mapserver/ && \
    chmod -R 755 /data/ && \
    chown -R www-data:www-data /etc/mapserver/ && \
    chown -R www-data:www-data /data/

# Environment variables
ENV MS_MAPFILE=/etc/mapserver/mapfiles/locust.map
ENV MS_MODE=map
ENV MS_DEBUGLEVEL=2

EXPOSE 80

# Start Apache
CMD ["apache2ctl", "-D", "FOREGROUND"]