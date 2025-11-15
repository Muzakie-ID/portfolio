# Quick Deploy Guide

Portfolio Anda siap untuk di-deploy ke VPS di `/root/portfolio`

## Option 1: Automatic Deploy (Recommended)

### Dari Local Machine (Windows PowerShell):

```powershell
# Navigate ke portfolio folder
cd C:\laragon\www\tailwindcss\portfolio

# Run deploy script
.\deploy-to-vps.ps1 -VpsIp your-vps-ip

# Contoh:
.\deploy-to-vps.ps1 -VpsIp 123.45.67.89
```

Script ini akan:
1. ✅ Upload seluruh project ke `/root/portfolio`
2. ✅ Install Docker & Docker Compose
3. ✅ Build image
4. ✅ Start container
5. ✅ Verify deployment

## Option 2: Manual Deploy

### Step 1: SSH ke VPS
```bash
ssh root@your-vps-ip
```

### Step 2: Clone atau upload project
```bash
# Option A: Clone dari Git
cd /root
git clone https://github.com/Muzakie-ID/portfolio.git

# Option B: Upload dari local
# Dari local machine:
scp -r C:\laragon\www\tailwindcss\portfolio root@your-vps-ip:/root/
```

### Step 3: Navigate ke folder
```bash
cd /root/portfolio
```

### Step 4: Run setup script
```bash
bash setup-vps.sh
```

## Option 3: Manual Docker Commands

```bash
cd /root/portfolio

# Build image
docker-compose build

# Run container
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f portfolio
```

## Verify Deployment

```bash
# Check dari VPS
curl http://localhost:8089

# Check dari local machine
curl http://your-vps-ip:8089

# Atau buka di browser:
# http://your-vps-ip:8089
```

## Common Commands After Deployment

```bash
cd /root/portfolio

# View logs real-time
docker-compose logs -f portfolio

# Restart container
docker-compose restart portfolio

# Stop container
docker-compose down

# Update aplikasi
git pull origin main
docker-compose build --no-cache
docker-compose up -d

# View container status
docker-compose ps

# View resource usage
docker stats portfolio-app
```

## Setup Domain dengan Nginx & SSL

Lihat `VPS-SETUP.md` untuk instruksi lengkap tentang:
- Setup Nginx reverse proxy
- SSL dengan Certbot
- Auto-start pada boot

## Troubleshooting

### Port 8089 tidak bisa diakses
1. Cek firewall VPS
2. Cek apakah container sedang jalan: `docker-compose ps`
3. Cek logs: `docker-compose logs portfolio`

### Container restart terus
```bash
# Lihat error
docker-compose logs portfolio

# Rebuild
docker-compose build --no-cache
docker-compose up -d
```

### Out of memory
- Upgrade VPS specs
- Atau limit memory di docker-compose.yaml

## File Penting

- `docker-compose.yaml` - Docker Compose config
- `Dockerfile` - Build instructions
- `setup-vps.sh` - Setup script untuk Linux
- `deploy-to-vps.ps1` - Deploy script untuk Windows
- `VPS-SETUP.md` - Dokumentasi lengkap

## Support

Untuk bantuan lebih lanjut, lihat:
- `VPS-SETUP.md` - Panduan setup lengkap
- `DOCKER.md` - Docker documentation
- `README.md` - Project documentation

---

**Location**: `/root/portfolio`
**Port**: `8089`
**Domain**: (optional, configure Nginx)

Happy deploying! 🚀
