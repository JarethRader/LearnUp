#!/bin/sh

npm run css && env NODE_ENV=development webpack serve --host 0.0.0.0 --port ${PORT} --mode development --config webpack.dev.js