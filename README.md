# SocketChat

A simple Chat using socket and expressjs

## Quick Start

-------------

### Using Docker

> **Note:** You need docker-compose

To start all 3 containers and having the reverse proxy listening on port 80:

```console
docker-compose up -d
```

Using Traefik instead of nginx:

```console
docker-compose -f docker-compose.yml -f docker-compose.traefik.yml up -d
```

It create 3 dockers:

- mongo: A mongo database to keep chat messages.
- server: the core [node.js](https://www.nodejs.org) server.
- reverse-proxy: A nginx reverse-proxy (to enable https).

### Using Kubernetes
