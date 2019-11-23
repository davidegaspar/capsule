set -ex

NAME=capsule

docker run \
  -it \
  --name $NAME \
  -v ${PWD}:/app \
  --restart unless-stopped \
  node:lts-alpine \
  /bin/sh

# docker logs -f $NAME
