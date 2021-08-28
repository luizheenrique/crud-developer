FROM phpdockerio/php74-fpm:latest

RUN apt-get update; \
    apt-get -y --no-install-recommends install \
        git \ 
        php7.4-intl \ 
        php7.4-mysql \ 
        php7.4-sqlite3; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

WORKDIR "/var/www/api"