FROM node:15
RUN apt-get update && apt-get install inotify-tools --assume-yes
ENV PATH=$PATH:./node_modules/.bin
WORKDIR /app
