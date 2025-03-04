#!/bin/bash

# Change directory to front end
cd bini_academy

# Installs node modules if there none
if [ ! -d "node_modules" ]; then
  echo "node_modules not found. Running npm install..."
  npm install
fi

# Run the front end server
npm run dev &
FRONTEND_PID=$!

# Change directory to backend
cd ../backend

# Run the backend server
php -S localhost:8000 &
BACKEND_PID=$!

# Sends message when the servers are stopped
trap "echo 'Stopping servers...'; kill $FRONTEND_PID $BACKEND_PID; exit" SIGINT

wait
