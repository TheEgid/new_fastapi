.PHONY: docs clean

DB_CONTAINER = db_postgres

LOCAL_DUMP_PATH = backend/my_backup.txt

COMMAND = docker-compose run --rm backend_server /bin/bash -c

include .env
export

all: build deploy restore test


build:
	docker-compose up -d
	docker inspect $(DB_CONTAINER) | grep IPAddress
	docker ps
	echo "Ok!";
	#$(COMMAND) "dockerize -wait http://pgadmin:80 -timeout 10s";


deploy:
	$(COMMAND) "alembic upgrade head";


restore:
	@cat $(LOCAL_DUMP_PATH) | docker exec -i $(DB_CONTAINER) psql -U $(DB_USER) -d $(DB_NAME) < $(LOCAL_DUMP_PATH);
	@echo "Restored! `date +%F--%H-%M`";


backup:
	@sudo docker exec -i $(DB_CONTAINER) pg_dump --data-only --username $(DB_USER) $(DB_NAME) > $(LOCAL_DUMP_PATH);
	@echo "Backed up! `date +%F--%H-%M`";

#	@sudo docker exec -i $(DB_CONTAINER) psql -d database1 -f $(LOCAL_DUMP_PATH);
#	@sudo docker exec -i $(DB_CONTAINER) pg_restore -U postgres_user -v -d database_name < /dir_backup_outside_container/file_name.tar


test:
	$(COMMAND) "pytest";


dockerclean:
	docker system prune -f
	docker system prune -f --volumes