docker network create traefik-global-proxy
# mkdir letsencrypt
# touch /letsencrypt/acme.json
# chmod 600 acme.json
# docker-compose build
# docker-compose up
# docker run -d \
#   -v /var/run/docker.sock:/var/run/docker.sock \
#   -v $PWD/traefik.toml:/traefik.toml \
#   -v $PWD/traefik_dynamic.toml:/traefik_dynamic.toml \
#   -v $PWD/acme.json:/acme.json \
#   -p 80:80 \
#   -p 443:443 \
#   --network traefik-global-proxy \
#   --name traefik \
#   traefik:v2.2
