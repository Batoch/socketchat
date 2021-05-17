# SocketChat

A simple Chat using socket and expressjs

## Quick Start

-------------

### Using Docker

> **Note:** You need docker-compose

X86:

```console
docker-compose -f docker-compose.yml -d
```

ARM:

```console
docker-compose -f docker-compose.yml -f docker-compose.arm.yml up -d
```

It create 3 dockers:

- mongo: A mongo database to stock chat messages.
- server: the core [node.js](https://www.nodejs.org) server.
- reverse-proxy: A nginx reverse-proxy to enable https.

### Using Kubernetes
