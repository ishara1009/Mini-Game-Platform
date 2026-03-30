@echo off
REM Mini Game Platform - Quick Start Script
REM This script helps you start the development server

echo.
echo ============================================
echo   MINI GAME PLATFORM - QUICK START
echo ============================================
echo.

REM Get current directory
cd /d "%~dp0"

echo.
echo Checking if node_modules exists...
if not exist "node_modules" (
    echo.
    echo Installing dependencies... (this may take a few minutes)
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: npm install failed. Make sure Node.js is installed.
        echo Visit: https://nodejs.org/
        pause
        exit /b 1
    )
) else (
    echo ✓ Dependencies already installed
)

echo.
echo ============================================
echo   Starting Development Server...
echo ============================================
echo.
echo The application will open at: http://localhost:3000
echo.
echo Press Ctrl+C in the terminal to stop the server
echo.

timeout /t 2

call npm start
