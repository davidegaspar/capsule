# uploader

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
docker stop uploader
docker rm uploader
```
