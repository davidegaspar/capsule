# watcher

Watches the `PIR` and triggers `raspistill` and `SNS`

## Build (raspi only)

```sh
docker build -t watcher -f Dockerfile .
```

## Run (raspi only)

#### .env
```
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
API_KEY=...
RESOURCE_ID=...
LOG_LEVEL=...
```

#### usage
```sh
docker run -d --name watcher --privileged --pid=host --restart unless-stopped --env-file .env watcher
docker logs -f watcher
# cleanup
docker stop watcher && docker rm watcher
```

## Publish
```sh
docker login docker.pkg.github.com -u davidegaspar -p $GITHUB_TOKEN
docker tag watcher docker.pkg.github.com/davidegaspar/capsule/watcher:latest
docker push docker.pkg.github.com/davidegaspar/capsule/watcher:latest
docker pull docker.pkg.github.com/davidegaspar/capsule/watcher:latest
```
