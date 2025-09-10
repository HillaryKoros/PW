FROM ubuntu:20.04

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

# Install dependencies
RUN apt-get update && apt-get install -y \
    apache2 \
    cgi-mapserver \
    mapserver-bin \
    gdal-bin \
    python3-gdal \
    libproj-dev \
    libapache2-mod-fcgid \
    tzdata \
    wget \
    && ln -fs /usr/share/zoneinfo/UTC /etc/localtime \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Enable required Apache modules
RUN a2enmod cgi headers rewrite

# Copy MapServer configuration files
COPY mapserver/mapfiles/ /tmp/mapfiles/
COPY mapserver/apache.conf /etc/apache2/sites-available/mapserver.conf

# Create directories and move files with proper ownership
RUN mkdir -p /etc/mapserver/mapfiles /etc/mapserver/attached_assets /var/run/apache2 && \
    mv /tmp/mapfiles/* /etc/mapserver/mapfiles/ && \
    rmdir /tmp/mapfiles && \
    echo "# Placeholder for attached assets - add your geospatial data files here" > /etc/mapserver/attached_assets/README.md && \
    chown -R www-data:www-data /etc/mapserver /var/run/apache2 && \
    chmod -R 755 /etc/mapserver/ && \
    cp /etc/mapserver/mapfiles/locust.map /var/www/html/locust.map && \
    chown www-data:www-data /var/www/html/locust.map

# Enable MapServer site and disable default
RUN a2ensite mapserver && a2dissite 000-default

# Expose Apache port
EXPOSE 80

# Set environment variables
ENV MS_MAPFILE=/var/www/html/locust.map

# Create startup script to ensure runtime directory exists and clean sockets
RUN echo '#!/bin/bash\nmkdir -p /var/run/apache2\nchown www-data:www-data /var/run/apache2\nfind /var/run/apache2 -name "cgisock.*" -delete\nrm -f /var/run/apache2/apache2.pid\nexec apache2ctl -D FOREGROUND' > /usr/local/bin/start-apache.sh && \
    chmod +x /usr/local/bin/start-apache.sh

# Start Apache in foreground with runtime directory creation
CMD ["/usr/local/bin/start-apache.sh"]