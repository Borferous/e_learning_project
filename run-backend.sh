#!/bin/bash

# Change directory to backend
cd backend

# Run the backend server
php -S localhost:8000 &

# Capture process ID
BACKEND_PID=$!

# Handle termination (Ctrl+C)
trap "echo 'Stopping backend server...'; kill $BACKEND_PID; exit" SIGINT

wait
