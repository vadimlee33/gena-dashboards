@echo off
echo Starting JSON Server and Next.js development servers...

start "JSON Server" cmd /k "npm run json-server"
timeout /t 3 /nobreak > nul
start "Next.js" cmd /k "npm run dev"

echo Both servers are starting...
echo JSON Server will be available at: http://localhost:3001
echo Next.js will be available at: http://localhost:3000
echo.
echo Press any key to close all servers...
pause > nul

taskkill /f /im node.exe 