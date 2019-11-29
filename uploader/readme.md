# uploader

Watches the `raspistill` folder and uploads `.jpg` to `S3`.

## Build (raspi only)

```sh
docker build -t uploader -f Dockerfile .
```

## Run (raspi only)

#### .env

```
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
```

#### usage

```sh
docker run -d --name uploader --restart unless-stopped --env-file .env -v /root/raspistill/:/app uploader
docker run -it --rm --name uploader --env-file .env -v /root/raspistill/:/app uploader /bin/sh
docker logs -f uploader
# cleanup
docker stop uploader && docker rm uploader
```

## Publish
```sh
docker login docker.pkg.github.com -u davidegaspar -p $GITHUB_TOKEN
docker tag uploader docker.pkg.github.com/davidegaspar/capsule/uploader:latest
docker push docker.pkg.github.com/davidegaspar/capsule/uploader:latest
docker pull docker.pkg.github.com/davidegaspar/capsule/uploader:latest
```
