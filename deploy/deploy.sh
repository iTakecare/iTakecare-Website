#!/bin/bash
# À lancer sur le VPS. Ne touche qu'au conteneur itakecare-landing.
set -e
cd /opt/itakecare-landing
git pull origin main
docker compose -f deploy/docker-compose.yml build --no-cache
docker compose -f deploy/docker-compose.yml up -d
docker image prune -f
