package main

import (
    "fmt"
    "time"
)

func main() {

  uploader := getS3Uploader("eu-west-1")

  for {
    file := getFirstFile(".",".jpg")
    if file != nil {
      fmt.Printf(file.Name())
      uploadToS3(uploader, file.Name(), "963345548549-capsule")
      fmt.Printf("...uploaded")
      removeFile(file.Name())
      fmt.Printf("...deleted.\n")
      time.Sleep(time.Second)
    } else {
      fmt.Printf("no files found.\n")
      time.Sleep(time.Second * 10)
    }
  }
}
