# capsule

pir + raspi cam + s3 + sns

## raspi setup
```sh
# enable camera
raspi-config
```

## install

this project includes packages that can only be build inside a specific docker container.

```
docker build -t capsule-build -f Dockerfile.build .
docker rm capsule-build
docker run -it --name capsule-build -v ${PWD}:/app capsule-build /bin/sh
# now packages can be installed
```

## build
```
docker build -t capsule -f Dockerfile .
```

## run (raspi)
```
docker run -it capsule /bin/sh
docker run -it --privileged capsule
```

## .env
```
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
SNS_ARN=...
```
