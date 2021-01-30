FROM node:15
RUN apt-get update && apt-get install inotify-tools --assume-yes
RUN apt-get -y install webp
ENV PATH=$PATH:./node_modules/.bin
WORKDIR /app
