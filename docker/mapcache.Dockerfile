FROM ubuntu:20.04

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

# Install dependencies
RUN apt-get update && apt-get install -y \
    apache2 \
    libapache2-mod-mapcache \
    mapcache-tools \
    gdal-bin \
    libgdal-dev \
    tzdata \
    wget \
    && ln -fs /usr/share/zoneinfo/UTC /etc/localtime \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Copy MapCache configuration
COPY mapcache/mapcache.xml /etc/mapcache/mapcache.xml
COPY docker/apache-mapcache.conf /etc/apache2/sites-available/mapcache.conf

# Create cache directory and set permissions
RUN mkdir -p /var/cache/mapcache && \
    chmod -R 755 /var/cache/mapcache && \
    chmod -R 755 /etc/mapcache/ && \
    chown -R www-data:www-data /var/cache/mapcache && \
    chown -R www-data:www-data /etc/mapcache/

# Enable required Apache modules and site
RUN a2enmod mapcache headers rewrite && \
    a2ensite mapcache && \
    a2dissite 000-default

# Expose Apache port
EXPOSE 80

# Set environment variable
ENV MAPCACHE_CONFIG=/etc/mapcache/mapcache.xml

# Start Apache in foreground
CMD ["apache2ctl", "-D", "FOREGROUND"]