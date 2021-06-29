#!/bin/sh
for file in /usr/share/nginx/html/js/app.*.js;
do
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi
  envsubst '\$VUE_APP_HUE_BRIDGE_IP \$VUE_APP_HUE_USERNAME \$VUE_APP_POLLING_RATE \$VUE_APP_CALENDAR_API' < $file.tmpl.js > $file
done
echo "Starting Nginx"
nginx -g 'daemon off;'