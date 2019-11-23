# capsule
security system

## raspi setup
```sh
# enable camera
raspi-config
```

## install

```
npm i
npm install onoff
```

## service
```
sudo cp capsule /etc/init.d/capsule
sudo chmod +x /etc/init.d/capsule
sudo /etc/init.d/capsule start
sudo /etc/init.d/capsule stop
sudo update-rc.d capsule defaults
```


## stuff
```
docker build -t capsule .
docker run -it capsule /bin/sh
```

## .env
```
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
SNS_ARN=...
```
