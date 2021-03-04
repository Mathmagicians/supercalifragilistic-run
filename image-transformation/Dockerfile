FROM alpine:latest
RUN apk add --no-cache --update gcc make automake autoconf libtool musl-dev zlib-dev git openssl nodejs nodejs-npm imagemagick

RUN git clone https://github.com/skyrpex/potrace.git && \
    cd potrace && \
    autoreconf -i && \
    ./configure && make && make install

RUN npm install -g svgo

WORKDIR /images

# Usage

# docker build -t bivihoba/potrace .
# docker run --rm -it --name potrace -v $(pwd):/images bivihoba/potrace /bin/sh
# convert original.jpg temp.svg
# potrace -s temp.ppm -o temp.svg --color=#cccccc --flat -u 1 --longcoding --turdsize=100 --opttolerance 0.4 --turnpolicy majority
# svgo temp.svg original.svg

# Credits
# https://twitter.com/Martin_Adams/status/918481948217049088
# https://twitter.com/mikaelainalem/status/918213244954861569

# See Also
# https://gist.github.com/bivihoba/7e615e8c0b4485ff284778977240fbb9

# Agata's magick formula (assuming images in input folder, and results in output folder of the mounted workdir
#ls -1 $PWD/output/tmp/*.pnm | xargs -n 1 -I FILE  basename FILE .pnm   | xargs -n 1 -t -I FILE potrace -s -o output/FILE.svg --flat -u 1 --longcoding --turdsize=100 --opttoler
 #ance 0.4 --turnpolicy majority -W 200pt -H 200pt output/tmp/FILE.pnm
 # ... and ... a second run:
 #svgo output/*.svg
 # TODO make this into a script / or entry point