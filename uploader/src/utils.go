package main

import (
    "os"
    "log"
    "io/ioutil"
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
