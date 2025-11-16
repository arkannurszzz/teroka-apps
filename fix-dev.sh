#!/bin/bash

echo "🧹 Cleaning up all Next.js processes..."

# Kill all Next.js processes
pkill -f "next dev" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true

# Kill processes on common Next.js ports
lsof -ti:3000,3001,3002,3003 | xargs kill -9 2>/dev/null || true

# Remove .next directory
rm -rf .next 2>/dev/null || true

echo "✅ Cleanup complete!"
echo "🚀 Starting fresh development server..."

# Start new dev server
npm run dev