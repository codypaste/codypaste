#!/usr/bin/sh

VERSION=$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json)
COMMIT_HASH=$(git rev-parse --verify HEAD)
BUILD_DATETIME=$(date -u "+%Y-%m-%dT%H:%M:%SZ")

printf '{
  "version": "%s",
  "buildDatetime": "%s",
  "commitHash": "%s"
}' $VERSION $BUILD_DATETIME $COMMIT_HASH > 'build-info.json'