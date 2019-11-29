# Capsule

pir + raspi cam + s3 + sns

## Raspi setup

#### docker
```sh
curl -sSL https://get.docker.com | sh
```

#### camera
```sh
# enable camera
raspi-config
```

## Build (raspi only)

```sh
docker build -t capsule -f Dockerfile .
```

## Run (raspi only)

#### .env
```
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
SNS_ARN=...
```

#### usage
```sh
docker run -d --name capsule --privileged --pid=host --restart unless-stopped --env-file .env capsule
docker logs -f capsule
# cleanup
docker stop capsule
docker rm capsule
```

## Publish
```sh
docker login docker.pkg.github.com -u davidegaspar -p $GITHUB_TOKEN
docker tag capsule docker.pkg.github.com/davidegaspar/capsule/capsule:latest
docker push docker.pkg.github.com/davidegaspar/capsule/capsule:latest
docker pull docker.pkg.github.com/davidegaspar/capsule/capsule:latest
```

## Local development

this project includes packages that can only be built inside a development docker container

#### build development container
```sh
docker build -t capsule-build -f Dockerfile.build .
```

#### usage
```sh
docker run -it --rm --name capsule-build -v ${PWD}/app:/app capsule-build /bin/sh
# now packages can be installed
# npm install ...
```
