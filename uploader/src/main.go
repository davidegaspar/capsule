package main

import (
    "fmt"
    "time"
)

func main() {

    for {
        fmt.Println("checking...")
        file := getFirstFile(".",".jpg")
        if file != nil {
          fmt.Println(file.Name())
          // upload to s3
          // delete file
        } else {
          fmt.Println("no files")
        }
        time.Sleep(time.Second * 10)
    }
}
