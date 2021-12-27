include .env

TAG := agusrani/jwt-auth-security
IDS != docker ps | grep $(TAG) | awk '{ print $$1 }'

all: build run

build:
	docker build . --rm -t $(TAG)

run:
	docker run --rm --init --env-file=./.env -p $(PORT):$(PORT) $(TAG)

stop:
	echo $(IDS) | tr ' ' '\n' | xargs --no-run-if-empty docker stop

clean:
	-docker rmi $(TAG)
	-docker image prune

exec:
	docker exec -it $(word 1,$(IDS)) /bin/ash

logs:
	docker logs $(word 1,$(IDS)) -f

.PHONY: all build run stop clean exec logs