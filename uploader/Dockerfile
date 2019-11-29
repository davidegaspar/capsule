FROM golang:1.12-alpine as build
RUN apk add --update git
WORKDIR /go/src/github.com/davidegaspar/uploader
ADD src .
RUN go get -u github.com/aws/aws-sdk-go/aws
RUN go build -o uploader .

FROM alpine:3.10
RUN apk add --update ca-certificates
WORKDIR /app
CMD ["uploader"]
COPY --from=build /go/src/github.com/davidegaspar/uploader/uploader /usr/local/bin/
