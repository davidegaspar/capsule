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

## config
```json
{
  "sns_arn": "arn:aws:sns:us-east-1:11111:sometopic"
}
```

## service
```
sudo cp capsule /etc/init.d/capsule
sudo chmod +x /etc/init.d/capsule
sudo /etc/init.d/capsule start
sudo /etc/init.d/capsule stop
sudo update-rc.d capsule defaults
```
