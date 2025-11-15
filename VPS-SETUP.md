# VPS Setup Guide untuk Portfolio

## Struktur Direktori di VPS

```
/root/
├── portfolio/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   ├── .env.vps
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── styles/
│   └── [file lainnya]
```

## Setup di VPS

### 1. Prerequisites

```bash
# Login ke VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version
```

### 2. Clone atau Upload Project

```bash
# Option A: Clone dari Git
cd /root
git clone https://github.com/Muzakie-ID/portfolio.git
cd portfolio

# Option B: Upload via SCP
# Dari local machine:
scp -r ./portfolio root@your-vps-ip:/root/
```

### 3. Konfigurasi Environment

```bash
# Copy environment file VPS
cd /root/portfolio
cp .env.vps .env.production

# Edit sesuai kebutuhan
nano .env.production
```

### 4. Build dan Deploy

```bash
# Masuk ke direktori portfolio
cd /root/portfolio

# Build image (pertama kali saja)
docker-compose build

# Jalankan container
docker-compose up -d

# Cek status
docker-compose ps

# Lihat logs
docker-compose logs -f portfolio
```

### 5. Verifikasi

```bash
# Test dari VPS
curl http://localhost:8089

# Test dari local
curl http://your-vps-ip:8089
```

## Management Commands

### Jalankan aplikasi
```bash
cd /root/portfolio
docker-compose up -d

# Atau jika menggunakan docker compose v2+
docker compose up -d
```

### Stop aplikasi
```bash
docker-compose down
```

### Restart aplikasi
```bash
docker-compose restart portfolio
```

### Lihat logs real-time
```bash
docker-compose logs -f portfolio
```

### Container stats
```bash
docker stats portfolio-app
```

### Rebuild image
```bash
docker-compose build --no-cache
docker-compose up -d
```

## Nginx Reverse Proxy (Optional)

Jika ingin menggunakan domain custom dengan SSL:

### Install Nginx
```bash
apt install nginx -y
```

### Konfigurasi Nginx (/etc/nginx/sites-available/portfolio)
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:8089;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Enable config
```bash
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### SSL dengan Certbot
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Auto-Start pada Boot

### Systemd service (/etc/systemd/system/portfolio.service)
```ini
[Unit]
Description=Portfolio Docker Container
After=docker.service
Requires=docker.service

[Service]
Type=simple
WorkingDirectory=/root/portfolio
ExecStart=/usr/bin/docker-compose -f /root/portfolio/docker-compose.yaml up -d
ExecStop=/usr/bin/docker-compose -f /root/portfolio/docker-compose.yaml down
Restart=unless-stopped
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### Enable service
```bash
systemctl daemon-reload
systemctl enable portfolio
systemctl start portfolio
```

## Troubleshooting

### Port 8089 sudah digunakan
```bash
# Cari proses yang menggunakan port
lsof -i :8089

# Atau ubah port di docker-compose.yml
# ports:
#   - "8090:3000"
```

### Container tidak jalan
```bash
# Cek logs
docker-compose logs portfolio

# Cek health
docker-compose ps

# Restart
docker-compose restart portfolio
```

### Out of memory
```bash
# Limit memory di docker-compose.yml
# services:
#   portfolio:
#     mem_limit: 512m
#     memswap_limit: 1g
```

### Disk space
```bash
# Cek disk
df -h

# Cleanup Docker
docker system prune -a
```

## Monitoring

### Status container
```bash
docker-compose ps
```

### Resource usage
```bash
docker stats portfolio-app
```

### Logs
```bash
# Last 100 lines
docker-compose logs --tail=100 portfolio

# Real-time logs
docker-compose logs -f portfolio

# Logs dengan timestamp
docker-compose logs --timestamps portfolio
```

## Backup & Update

### Backup data
```bash
cd /root
tar -czf portfolio-backup-$(date +%Y%m%d).tar.gz portfolio/
```

### Update aplikasi
```bash
cd /root/portfolio

# Pull latest changes
git pull origin main

# Rebuild dan restart
docker-compose build --no-cache
docker-compose up -d

# Atau single command
docker-compose up -d --build
```

## Port Information

- **8089**: Port eksternal (akses dari browser)
- **3000**: Port internal container (aplikasi Next.js)

Mapping: `8089:3000` = localhost:8089 → container:3000

## Support

Untuk bantuan lebih lanjut:
- Docker docs: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- Next.js: https://nextjs.org/docs/
