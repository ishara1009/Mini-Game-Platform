# Mini Game Platform - Quick Start Script (PowerShell)

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  MINI GAME PLATFORM - QUICK START" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Change to script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host ""
Write-Host "📁 Location: $scriptPath" -ForegroundColor Green
Write-Host ""

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "🔄 Installing dependencies..." -ForegroundColor Yellow
    Write-Host "(This may take 2-5 minutes)" -ForegroundColor Yellow
    Write-Host ""
    
    npm install
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "❌ ERROR: npm install failed!" -ForegroundColor Red
        Write-Host "Make sure Node.js is installed: https://nodejs.org/" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Starting Development Server..." -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Application will open at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

Start-Sleep -Seconds 2

npm start
