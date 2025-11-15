# Portfolio Quick Deploy Script
# Run this on your local machine to deploy to VPS

param(
    [string]$VpsIp = "",
    [string]$VpsUser = "root",
    [string]$ProjectPath = ".\portfolio"
)

$ErrorActionPreference = "Stop"

# Colors
function Write-Success { Write-Host $args -ForegroundColor Green }
function Write-Error { Write-Host $args -ForegroundColor Red }
function Write-Warning { Write-Host $args -ForegroundColor Yellow }

# Check if parameters are provided
if ([string]::IsNullOrEmpty($VpsIp)) {
    Write-Warning "Usage: .\deploy-to-vps.ps1 -VpsIp <your-vps-ip> -VpsUser root -ProjectPath .\portfolio"
    Write-Warning ""
    Write-Warning "Example:"
    Write-Warning "  .\deploy-to-vps.ps1 -VpsIp 123.45.67.89"
    exit 1
}

Write-Warning "========================================="
Write-Warning "Portfolio Deploy to VPS"
Write-Warning "========================================="
Write-Warning ""
Write-Warning "VPS IP: $VpsIp"
Write-Warning "VPS User: $VpsUser"
Write-Warning "Project Path: $ProjectPath"
Write-Warning ""

# Check if project path exists
if (-not (Test-Path $ProjectPath)) {
    Write-Error "Project path not found: $ProjectPath"
    exit 1
}

Write-Warning "Step 1: Upload project to VPS"
Write-Warning "This may take a few minutes..."
try {
    scp -r "$ProjectPath" "${VpsUser}@${VpsIp}:/root/"
    Write-Success "✓ Project uploaded successfully"
} catch {
    Write-Error "✗ Upload failed: $_"
    exit 1
}

Write-Warning ""
Write-Warning "Step 2: Run setup script on VPS"
try {
    ssh "${VpsUser}@${VpsIp}" "cd /root/portfolio && bash setup-vps.sh"
    Write-Success "✓ Setup completed on VPS"
} catch {
    Write-Error "✗ Setup failed: $_"
    exit 1
}

Write-Warning ""
Write-Success "========================================="
Write-Success "Deployment completed!"
Write-Success "========================================="
Write-Success ""
Write-Success "Your portfolio is now live at:"
Write-Success "  http://${VpsIp}:8089"
Write-Success ""
