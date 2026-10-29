#!/bin/bash
# À lancer depuis le Mac, à la racine du dépôt : envoie la version commitée (HEAD)
# sur le VPS et reconstruit le conteneur itakecare-landing. Ne touche qu'à ce conteneur.
set -euo pipefail

VPS="root@76.13.0.189"
SSH_KEY="$HOME/.ssh/id_vibecodestudio_deploy"
REMOTE_DIR="/opt/itakecare-landing"

echo "▶ Envoi de $(git rev-parse --short HEAD) vers $VPS:$REMOTE_DIR…"
git archive --format=tar HEAD | ssh -i "$SSH_KEY" "$VPS" \
  "rm -rf $REMOTE_DIR.new && mkdir -p $REMOTE_DIR.new && tar -x -C $REMOTE_DIR.new && rm -rf $REMOTE_DIR && mv $REMOTE_DIR.new $REMOTE_DIR"

echo "▶ Build et redémarrage du conteneur…"
ssh -i "$SSH_KEY" "$VPS" "cd $REMOTE_DIR && \
  docker compose -p itakecare-landing -f deploy/docker-compose.yml build --pull && \
  docker compose -p itakecare-landing -f deploy/docker-compose.yml up -d --force-recreate && \
  docker image prune -f >/dev/null && \
  docker compose -p itakecare-landing -f deploy/docker-compose.yml ps"

echo "✅ Landing pages déployées : https://www.itakecare.be/lp/sante"
