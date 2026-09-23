@echo off
REM Autostart the portfolio dev server and open it in the browser.
cd /d "C:\Users\venky\Portfolio"
start "Portfolio Dev Server" powershell -NoProfile -ExecutionPolicy Bypass -Command "npm run dev -- --port 5173 --host"
timeout /t 6 /nobreak >nul
start http://localhost:5173/portfolio/
