#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
yarn add mysql
yarn run build
npm run typeorm migration:run -- -d dist/data-source
