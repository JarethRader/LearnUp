#!/bin/sh

npm run build && env NODE_ENV=production node dist/server.js