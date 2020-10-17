#!/usr/bin/env bash

if [ -z "${TURN_OFF_ERREXIT}" ]; then
  set -o errexit  # fail on simple (non-piped) error
fi
set -o pipefail # also fail on piped commands (e.g. cat myfile.txt | grep timo)
set -o nounset  # fail when accessing unset vars

# See https://superuser.com/a/181543 for explanations of why the script below is used.

inotifywait --event modify,create,delete --monitor --recursive src content templates |
while read -r directory event filename src; do
  echo "Watcher saw event '${event}' for file 'src/*,**/${filename}', building again...";
  "$@"
done