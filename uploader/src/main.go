package main

import (
    "fmt"
    "time"
)

func main() {

    for {
        file := getFirstFile(".",".jpg")
        if file != nil {
          fmt.Printf(file.Name())
          // upload to s3
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
