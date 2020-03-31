FROM node
RUN apt-get update && apt-get install inotify-tools --assume-yes
WORKDIR /app
