start-env: 
	docker-compose up -d
	docker-compose run codypaste_service /usr/src/app/initdb.sh

test: start-env
	mocha tests/functional/**/*Tests.js

PHONY: start-env test