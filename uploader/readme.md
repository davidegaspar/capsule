# uploader

## build
```sh
docker build -t uploader -f Dockerfile .
```

## run
```sh
docker run -d --name uploader --restart unless-stopped --env-file .env -v ${PWD}:/app uploader
docker run -it --rm --name uploader --env-file .env -v ${PWD}:/app uploader /bin/sh
docker logs -f uploader
# cleanup
docker stop uploader
docker rm uploader
```
