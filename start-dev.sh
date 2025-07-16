#!/bin/bash

echo "Starting JSON Server and Next.js development servers..."

# Start JSON Server in the background
echo "Starting JSON Server..."
npm run json-server &
JSON_SERVER_PID=$!

# Wait a moment for JSON Server to start
sleep 3

# Start Next.js in the background
echo "Starting Next.js..."
npm run dev &
NEXTJS_PID=$!

echo "Both servers are starting..."
echo "JSON Server will be available at: http://localhost:3001"
echo "Next.js will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers..."

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "Stopping all servers..."
    kill $JSON_SERVER_PID 2>/dev/null
    kill $NEXTJS_PID 2>/dev/null
    # Also kill any remaining node processes for this project
    pkill -f "json-server.*db.json" 2>/dev/null
    pkill -f "next dev" 2>/dev/null
    echo "All servers stopped."
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for user to press Ctrl+C
wait 