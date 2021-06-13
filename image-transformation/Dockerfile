FROM alpine:latest as potrace
WORKDIR /images
RUN apk add --no-cache --update gcc make automake autoconf libtool musl-dev zlib-dev git openssl nodejs nodejs-npm imagemagick

RUN git clone https://github.com/skyrpex/potrace.git && \
    cd potrace && \
    autoreconf -i && \
    ./configure && make && make install

RUN npm install -g svgo
ENTRYPOINT ["/bin/bash"]

FROM potrace AS convert-to-pnm
COPY ./input .
RUN ls -al .
RUN  mkdir /out && for f in *.jpeg ; do (echo "converting $f -- $(basename $f .jpeg)" && convert $f "/out/$(basename $f .jpeg).pnm" ); done

FROM convert-to-pnm AS magic
COPY --from=convert-to-pnm /out /images/tmp
RUN mkdir /svg && for f in /images/tmp/* ; do (echo "processing $f --  -- $(basename $f .pnm)" && \
    potrace -s -o "/svg/$(basename $f .pnm).svg" --flat -u 1 --longcoding --turdsize=100 --opttolerance 0.4 --turnpolicy majority  -W 200pt -H 200pt $f\
    ); done && \
    svgo /svg/*.svg

FROM scratch AS output
COPY --from=magic /svg .
