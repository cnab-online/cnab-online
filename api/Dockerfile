FROM php:5.6-apache

RUN apt-get update && apt-get install -y zlib1g-dev \
    && apt-get install -y libmemcached-dev \
    && pecl install memcached \
    && docker-php-ext-enable memcached

RUN apt-get install -y libpq-dev \
    && docker-php-ext-install -j$(nproc) pdo_pgsql

RUN pecl install apcu-4.0.10
RUN docker-php-ext-enable apcu

RUN docker-php-ext-install -j$(nproc) opcache \
    && docker-php-ext-enable opcache

RUN curl -LO https://phar.phpunit.de/phpunit.phar \
    && chmod +x phpunit.phar \
    && mv phpunit.phar /usr/local/bin/phpunit
