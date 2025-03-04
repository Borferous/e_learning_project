#!/bin/bash

# Change directory to frontend
cd bini_academy

# Installs node modules if there are none
if [ ! -d "node_modules" ]; then
  echo "node_modules not found. Running npm install..."
  npm install
fi

# Run the frontend server
npm run dev &

# Capture process ID
FRONTEND_PID=$!

# Handle termination (Ctrl+C)
trap "echo 'Stopping frontend server...'; kill $FRONTEND_PID; exit" SIGINT

wait
