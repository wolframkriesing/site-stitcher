#!/usr/bin/env bash

# See https://superuser.com/a/181543 for explanations of why the script below is used.

inotifywait --event modify,create,delete --monitor src |
while read -r directory event filename src; do
  echo "Watcher saw event '${event}' for file 'src/${filename}', building again...";
  npm run build
done