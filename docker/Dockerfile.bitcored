FROM debian:stable-slim
LABEL maintainer="LIMXTEC developer"

COPY ./bin /usr/local/bin
COPY ./VERSION /tmp
COPY ./CHECKSUM /tmp

RUN chmod a+x /usr/local/bin/* && \
    apt-get update && \
    apt-get install -y --no-install-recommends wget ca-certificates tar && \
    VERSION=`cat /tmp/VERSION` && \
    wget https://github.com/dalijolijo/BitCore/releases/download/${VERSION}/bitcore-${VERSION}-x86_64-linux-gnu_no-wallet.tar.gz -O /tmp/prebuilt.tar.gz && \
    echo "$(cat /tmp/CHECKSUM)  /tmp/prebuilt.tar.gz" | sha256sum -c && \
    tar xzf /tmp/prebuilt.tar.gz -C /tmp/ && \
    chmod a+x /tmp/bin/bitcored && \
    mv /tmp/bin/bitcored /usr/local/bin && \
    apt-get -y autoremove && \
    apt-get purge -y wget ca-certificates && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

VOLUME ["/data"]
ENV HOME /data
ENV DATA /data
WORKDIR /data

EXPOSE 8555 8556 28556

ENTRYPOINT ["init"]
