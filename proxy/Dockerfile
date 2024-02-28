FROM nginx:1.25.3-alpine-slim

COPY ssl/fullchain.pem /etc/letsencrypt/live/stopwatch.cloudside.it/fullchain.pem
COPY ssl/privkey.pem /etc/letsencrypt/live/stopwatch.cloudside.it/privkey.pem
COPY nginx.conf /etc/nginx/conf.d/default.conf
