MAIN_CONTAINER = node
COMPOSE = docker-compose -f ./docker/docker-compose.yml -p typescript_boilerplate

build: service_build yarn_install migration_up

service_build:
	DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 $(COMPOSE) build

db_init:
	$(COMPOSE) run db docker-entrypoint.sh

yarn_install:
	$(COMPOSE) run $(MAIN_CONTAINER) yarn install

migration_create:
	$(COMPOSE) run $(MAIN_CONTAINER) yarn migration:create

migration_up:
	${COMPOSE} run ${MAIN_CONTAINER} yarn migration:up

prisma_generate:
	${COMPOSE} run ${MAIN_CONTAINER} yarn prisma:generate

up:
	$(COMPOSE) up ${ARG}

test:
	$(COMPOSE) run $(MAIN_CONTAINER) yarn test $(path)

watch_test:
	$(COMPOSE) run $(MAIN_CONTAINER) yarn test:watch $(path)

db_up:
	$(COMPOSE) up db

down:
	$(COMPOSE) down

start:
	make up ARG=-d

stop:
	$(COMPOSE) stop

backend_test:
	$(COMPOSE) run $(MAIN_CONTAINER) yarn server test $(path)

restart:
	$(COMPOSE) stop $(MAIN_CONTAINER);
	$(COMPOSE) up $(MAIN_CONTAINER);

sh:
	$(COMPOSE) run $(MAIN_CONTAINER) sh

clean:
	$(COMPOSE) down -v --rmi all
