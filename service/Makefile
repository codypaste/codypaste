node_modules: package.json
	npm install --quiet
	
start-env: node_modules
	docker-compose up -d
	docker-compose run codypaste_service /usr/src/app/initdb.sh

test: start-env
	./node_modules/mocha/bin/mocha tests/functional/**/*Tests.js

PHONY: start-env test