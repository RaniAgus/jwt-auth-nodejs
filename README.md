# jwt-auth-nodejs

## Requirements

- docker: https://docs.docker.com/engine/install/ubuntu/
- docker-compose: https://docs.docker.com/compose/install/

## Environment variables

- `SECRET_KEY`: Symmetric key used for encryption
- `EXAMPLE_PORT`: Port where the `example` service will be running
- `SECURITY_PORT`: Port where the `security` service will be running

## Build & Run

1. Create `.env` file based in `.env.example`

2. Execute:

```
$ docker-compose up
```
