FROM golang:1.12-alpine as build
RUN apk add --update git
WORKDIR /go/src/github.com/davidegaspar/uploader
ADD src .
RUN go get -u github.com/radovskyb/watcher
RUN go build -o uploader .

FROM alpine:3.10
WORKDIR /app
# RUN apk add --update ca-certificates
COPY --from=build /go/src/github.com/davidegaspar/uploader/uploader /usr/local/bin/
