
# docker-bitcored-bitdb

[![Build Status](https://travis-ci.org/dalijolijo/docker-bitcored-bitdb.svg?branch=master)](https://travis-ci.org/dalijolijo/docker-bitcored-bitdb)
[![Docker Pulls](https://img.shields.io/docker/pulls/dalijolijo/bitcored-bitdb.svg)](https://hub.docker.com/r/dalijolijo/bitcored-bitdb)

> Run a full Bitcore node with one command

A Docker configuration with sane defaults for running a full
Bitcore node.

## Usage

```
docker run --rm -d --name bitcored-bitdb -v /data/bitcored-bitdb:/data -p 8555:8555 -p 10.21.178.151:8556:8556 dalijolijo/bitcored-bitdb -rpcuser=root -rpcpassword=bitcore
```

If there's a `bitcore.conf` in the `/data` volume it'll be used. If not, one will be created for you with a randomly generated JSON-RPC password.

## Build image

```
docker build -t dalijolijo/bitcored-bitdb .
```

## License

MIT © LIMXTEC
