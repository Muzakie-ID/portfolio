# Quick Start - Untuk VPS dengan Docker Sudah Installed

Jika Docker dan Docker Compose sudah terinstall di VPS Anda, ikuti langkah ini:

## Step 1: Upload Project ke VPS

Dari local machine:

```bash
scp -r C:\laragon\www\tailwindcss\portfolio root@your-vps-ip:/root/
```

Atau gunakan PowerShell:

```powershell
scp -r .\portfolio root@your-vps-ip:/root/
```

## Step 2: SSH ke VPS

```bash
ssh root@your-vps-ip
```

## Step 3: Navigate ke Folder

```bash
cd /root/portfolio
```

## Step 4: Build & Deploy

```bash
# Build image
docker-compose build

# Jalankan container
docker-compose up -d

# Verify
docker-compose ps
```

## Step 5: Verifikasi

```bash
# Test dari VPS
curl http://localhost:8089

# Lihat logs
docker-compose logs -f portfolio
```

## Selesai! 🎉

Portfolio sudah berjalan di `http://your-vps-ip:8089`

## Useful Commands

```bash
# Stop container
docker-compose down

# Restart
docker-compose restart portfolio

# View logs real-time
docker-compose logs -f portfolio

# Update & redeploy
git pull origin main
docker-compose build --no-cache
docker-compose up -d
```

## Files yang Digunakan

- `docker-compose.yaml` - Config untuk container
- `Dockerfile` - Build instructions

Itu saja! Super simple. 💪
