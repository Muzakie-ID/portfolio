#!/bin/bash

# Portfolio VPS Setup Script
# Usage: bash setup-vps.sh

set -e

echo "========================================="
echo "Portfolio VPS Setup Script"
echo "========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi

# Setup directory
SETUP_DIR="/root/portfolio"

echo -e "${YELLOW}Step 1: Update system${NC}"
apt update && apt upgrade -y
echo -e "${GREEN}✓ System updated${NC}"
echo ""

echo -e "${YELLOW}Step 2: Install Docker${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    echo -e "${GREEN}✓ Docker installed${NC}"
else
    echo -e "${GREEN}✓ Docker already installed${NC}"
fi
echo ""

echo -e "${YELLOW}Step 3: Install Docker Compose${NC}"
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✓ Docker Compose installed${NC}"
else
    echo -e "${GREEN}✓ Docker Compose already installed${NC}"
fi
echo ""

echo -e "${YELLOW}Step 4: Verify installations${NC}"
docker --version
docker-compose --version
echo -e "${GREEN}✓ Versions verified${NC}"
echo ""

echo -e "${YELLOW}Step 5: Navigate to portfolio directory${NC}"
cd $SETUP_DIR
echo -e "${GREEN}✓ In directory: $(pwd)${NC}"
echo ""

echo -e "${YELLOW}Step 6: Configure environment${NC}"
if [ ! -f ".env.production" ]; then
    if [ -f ".env.vps" ]; then
        cp .env.vps .env.production
        echo -e "${GREEN}✓ Environment file created from .env.vps${NC}"
    else
        echo -e "${RED}✗ .env.vps not found${NC}"
    fi
else
    echo -e "${GREEN}✓ Environment file already exists${NC}"
fi
echo ""

echo -e "${YELLOW}Step 7: Build Docker image${NC}"
docker-compose build
echo -e "${GREEN}✓ Docker image built${NC}"
echo ""

echo -e "${YELLOW}Step 8: Start container${NC}"
docker-compose up -d
echo -e "${GREEN}✓ Container started${NC}"
echo ""

echo -e "${YELLOW}Step 9: Verify deployment${NC}"
sleep 3
if docker-compose ps | grep -q "portfolio-app"; then
    echo -e "${GREEN}✓ Container is running${NC}"
    docker-compose logs --tail=20 portfolio
else
    echo -e "${RED}✗ Container is not running${NC}"
    docker-compose logs portfolio
fi
echo ""

echo "========================================="
echo -e "${GREEN}Setup completed!${NC}"
echo "========================================="
echo ""
echo "Portfolio is now running at:"
echo "  http://your-vps-ip:8089"
echo ""
echo "Useful commands:"
echo "  View logs:         docker-compose logs -f portfolio"
echo "  Stop container:    docker-compose down"
echo "  Restart:           docker-compose restart"
echo "  View status:       docker-compose ps"
echo ""
