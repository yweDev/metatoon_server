# Dockerfile for mysql 

FROM mysql:8.0.32

WORKDIR /db
# ADD ./init/init.sql /docker-entrypoint-initdb.d
ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE toonsql
ENV MYSQL_USER metatoon
ENV MYSQL_PASSWORD metatoon

EXPOSE 3306
