@echo off
echo Setting up Automated Peace...

echo.
echo Installing root dependencies...
cd /d "%~dp0"
call npm install

echo.
echo Installing backend dependencies...
cd backend
call npm install

echo.
echo Installing frontend dependencies...
cd ../frontend
call npm install

echo.
echo Setup complete!
echo.
echo To start the application:
echo 1. Start PostgreSQL database
echo 2. Run: npm run dev (from root directory)
echo.
echo Or use Docker:
echo docker-compose up -d
echo.
pause
