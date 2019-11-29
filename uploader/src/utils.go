package main

import (
    "os"
    "log"
    "io/ioutil"
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/s3/s3manager"
)

func getFirstFile(dir string, ext string) (os.FileInfo) {

  files, err := ioutil.ReadDir(dir)
  if err != nil {
    log.Fatal(err)
  }

  var file os.FileInfo
  for _, f := range files {
    name := f.Name()
    if (len(name) >= len(ext) && name[len(name)-len(ext):] == ext) {
      file = f
      break
    }
  }

  return file
}

func removeFile(name string)  {
  err := os.Remove(name)
  if err != nil {
    log.Fatal(err)
  }
}

func getS3Uploader(region string) (*s3manager.Uploader) {
  sess := session.Must(session.NewSessionWithOptions(session.Options{
       Config: aws.Config{Region: aws.String(region)},
  }))
  uploader := s3manager.NewUploader(sess)
  return uploader
}

func uploadToS3(uploader *s3manager.Uploader, name string, bucket string) {
  f, err  := os.Open(name)
  if err != nil {
      log.Fatal(err)
  }
  _, err = uploader.Upload(&s3manager.UploadInput{
      Bucket: aws.String(bucket),
      Key:    aws.String(name),
      Body:   f,
  })
  if err != nil {
      log.Fatal(err)
  }
}
