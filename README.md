# Capsule

pir + raspi cam + s3 + sns

## Raspi setup

### 1. install docker
```sh
curl -sSL https://get.docker.com | sh
```

### 2. enable camera
```sh
raspi-config
```

### 3. clone
```sh
git clone ...
```

### 4. build + run

Follow the insctructions for each app:
- [watcher](watcher)
- [uploader](uploader)

## Next
- tune alarms https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html
- create UI to get and set recording
- show dash https://aws.amazon.com/blogs/devops/building-an-amazon-cloudwatch-dashboard-outside-of-the-aws-management-console/
