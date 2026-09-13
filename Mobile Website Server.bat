@echo off
title Mobile Website Launcher
cd /d "C:\Users\hp\Desktop\Websites\mobie lwebsite\oppo-k13-gaming-landing-page"
if not exist "node_modules\.bin\vite.cmd" (
  echo First run: installing dependencies, please wait...
  call npm install
  if errorlevel 1 (
    echo Install failed. Check your internet and try again.
    pause
    exit /b 1
  )
)
echo Starting server at http://localhost:5173 ...
start "Mobile Website (server - close this window to stop)" cmd /k "npm run dev -- --port 5173 --strictPort"
timeout /t 6 /nobreak >nul
start "" "http://localhost:5173"
exit
