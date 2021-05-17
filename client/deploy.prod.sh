#!/bin/sh

# serves prod build on $PORT env value or 3005 if env value is missing
npm run css && npm run build && ./node_modules/.bin/serve -s build -l ${PORT:-3005}
