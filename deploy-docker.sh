#!/bin/bash

# build docker image
docker build -f frontend.Dockerfile -t multimap1:app1.0 .



#list docker images to check build was successfull
docker image ls

# start container
docker run -it --rm \
-v ${PWD}:/app \
-v /app/node_modules \
--network 'host' \
multimap1:app1.0 

# docker-compose up -d

# docker build --tag mmap:1.1

# docker run --publish 8000:8080 --detach --name mm1 mmap:1.0