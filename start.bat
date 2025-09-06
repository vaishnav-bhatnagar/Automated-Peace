@echo off
echo Starting Automated Peace Application...

echo.
echo Choose startup method:
echo 1. Docker (Recommended)
echo 2. Local Development
echo 3. Exit
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto docker
if "%choice%"=="2" goto local
if "%choice%"=="3" goto exit

:docker
echo.
echo Starting with Docker...
docker-compose up -d
echo.
echo Application started!
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:3001
echo.
echo To seed the database, run:
echo docker-compose exec backend npm run db:seed
echo.
pause
goto exit

:local
echo.
echo Starting local development...
echo Make sure PostgreSQL is running on localhost:5432
echo.
start cmd /k "cd /d %~dp0\backend && npm run dev"
timeout /t 3 /nobreak > nul
start cmd /k "cd /d %~dp0\frontend && npm start"
echo.
echo Applications starting...
echo Frontend: http://localhost:3000
echo Backend: http://localhost:3001
echo.
pause
goto exit

:exit
exit
