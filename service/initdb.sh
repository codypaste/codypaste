#!/bin/sh

set -e

./node_modules/knex/bin/cli.js migrate:latest --env 'development'