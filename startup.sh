#!/bin/bash
set -e

# ─── Config ───────────────────────────────────────────────────────────────────
REPO_URL="https://github.com/YOUR_USERNAME/my_website.git"   # <-- update this
APP_DIR="/var/www/my_website"
NODE_VERSION="22"
PORT=80

# ─── System packages ──────────────────────────────────────────────────────────
apt-get update -y
apt-get install -y curl git nginx

# ─── Node.js ──────────────────────────────────────────────────────────────────
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
  apt-get install -y nodejs
fi

# ─── Clone or pull ────────────────────────────────────────────────────────────
if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" pull
else
  git clone "$REPO_URL" "$APP_DIR"
fi

# ─── Build ────────────────────────────────────────────────────────────────────
cd "$APP_DIR"
npm ci
npm run build          # outputs to dist/

# ─── Nginx ────────────────────────────────────────────────────────────────────
cat > /etc/nginx/sites-available/my_website <<EOF
server {
    listen ${PORT};
    server_name _;

    root ${APP_DIR}/dist;
    index index.html;

    # SPA fallback — all routes serve index.html
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
}
EOF

ln -sf /etc/nginx/sites-available/my_website /etc/nginx/sites-enabled/my_website
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl restart nginx

echo "Done — site live on port ${PORT}"
