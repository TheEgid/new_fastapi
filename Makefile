.PHONY: docs clean

DB_CONTAINER=db_postgres
LOCAL_DUMP_PATH=my_backup.sql

COMMAND = docker-compose run --rm backend_server /bin/bash -c

include .env
export

all: build

build:
	docker-compose up #-d
	docker inspect $(DB_CONTAINER) | grep IPAddress
	docker ps
	echo "Ok!";

backup:
	docker exec -i $(DB_CONTAINER) pg_dump --username $(DB_USER) $(DB_NAME) > $(LOCAL_DUMP_PATH)

#restore--
#psql -d database1 -f '/opt/my_backup.sql'

#cat $(LOCAL_DUMP_PATH) | docker exec -i $(DB_CONTAINER) pg_restore -U $(DB_USER) -d $(DB_NAME);

test:
	docker-compose up -d;
	$(COMMAND) "pytest";


dockerclean:
	docker system prune -f
	docker system prune -f --volumes
