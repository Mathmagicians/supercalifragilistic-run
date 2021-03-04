#!/bin/bash
#first input parameter is the folder with input images, second with output images.
#script will scan for files with .jpeg extension
echo Hello, looking for images in: $1, and will provide outputs: in $2. Watch the magick happen.

for file in $1
do
  echo $(basename $file .jpeg)
done

#ls -1 $PWD/$1/*.jpeg | xargs -n 1 -I FILE  basename FILE .jpeg | xargs -n 1 -I FILE convert $1/FILE.jpeg > $2/tmp/FILE.pnm
