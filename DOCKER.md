# Portfolio Docker Setup

Panduan untuk menjalankan Portfolio menggunakan Docker dan Docker Compose.

## Prerequisites

- Docker (versi 20.10+)
- Docker Compose (versi 1.29+)

## Quick Start

### Menggunakan Docker Compose (Recommended)

1. **Build dan jalankan aplikasi:**
```bash
cd portfolio
docker-compose up --build
```

Aplikasi akan tersedia di `http://localhost:3000`

2. **Menjalankan di background:**
```bash
docker-compose up -d
```

3. **Melihat logs:**
```bash
docker-compose logs -f portfolio
```

4. **Stop aplikasi:**
```bash
docker-compose down
```

### Menggunakan Docker langsung

1. **Build image:**
```bash
docker build -t portfolio:latest .
```

2. **Jalankan container:**
```bash
docker run -d \
  --name portfolio \
  -p 3000:3000 \
  -e NODE_ENV=production \
  portfolio:latest
```

3. **Stop container:**
```bash
docker stop portfolio
docker rm portfolio
```

## File Structure

```
portfolio/
├── Dockerfile           # Multi-stage Dockerfile untuk production build
├── docker-compose.yml   # Docker Compose configuration
├── .dockerignore       # Files to exclude from Docker build
├── .env.production     # Production environment variables
└── DOCKER.md          # This file
```

## Dockerfile Details

Image menggunakan:
- **Base Image:** `node:18-alpine` (lightweight & production-ready)
- **Multi-stage build:** Mengurangi ukuran final image
- **dumb-init:** Handle signals dengan benar
- **Health checks:** Monitor kesehatan container

### Stages:

**Builder Stage:**
- Install dependencies
- Build aplikasi Next.js
- Generate optimized bundle

**Production Stage:**
- Hanya copy production files
- Minimal dependencies
- Optimized untuk performa

## Docker Compose Details

### Services:
- **portfolio:** Next.js aplikasi
  - Port: 3000
  - Auto-restart: `unless-stopped`
  - Health check: Enabled

### Features:
- Network isolation
- Health checks
- Volume mounting untuk public files
- Automatic restart policy

## Environment Variables

### Production (`.env.production`)
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Customize saat runtime:
```bash
docker-compose up -e NODE_ENV=development
```

## Health Checks

Container memiliki health check yang dijalankan setiap 30 detik:
- Start period: 40s
- Timeout: 10s
- Retries: 3

## Performance Tips

1. **Image Size Optimization:**
   - Multi-stage build mengurangi size ~60%
   - Alpine Linux lebih kecil dari Debian
   - Production dependencies only

2. **Build Cache:**
   - Copy package.json terlebih dahulu
   - Docker cache layer dependencies
   - Faster rebuilds

3. **Container Optimization:**
   - dumb-init untuk proper signal handling
   - Health checks untuk automatic recovery
   - Correct restart policy

## Troubleshooting

### Port sudah digunakan
```bash
# Change port di docker-compose.yml
# ports:
#   - "3001:3000"
docker-compose up --build
```

### Container exit dengan error
```bash
docker-compose logs portfolio
```

### Clear everything dan rebuild
```bash
docker-compose down -v
docker-compose up --build
```

### Hapus unused images
```bash
docker image prune -a
```

## Production Deployment

### Dengan environment variables:
```bash
docker-compose -f docker-compose.yml \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_API_URL=https://api.example.com \
  up -d
```

### Scale dengan Kubernetes:
```bash
kubectl apply -f k8s/deployment.yaml
```

## Next Steps

- Kustomisasi `docker-compose.yml` untuk kebutuhan Anda
- Add reverse proxy (Nginx/Traefik) jika diperlukan
- Setup CI/CD pipeline untuk automated deployment
- Monitor container metrics dengan Docker stats

```bash
docker stats portfolio
```

## Support

Untuk masalah lebih lanjut, cek:
- Docker logs: `docker-compose logs`
- Next.js documentation: https://nextjs.org/docs
- Docker best practices: https://docs.docker.com/develop/dev-best-practices/
