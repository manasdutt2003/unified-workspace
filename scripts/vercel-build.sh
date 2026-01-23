#!/bin/bash
set -e # Exit on error

echo "🚀 Starting custom Vercel build script..."

# 1. Enter the app directory
cd apps/developer-portfolio

# 2. Make sure dependencies are installed (redundant check)
echo "📦 Installing Dependencies in App..."
npm install

# 3. Run the specific build
echo "🏗️ Building Portfolio..."
npm run build

echo "✅ Build complete. Checking output..."
ls -F dist/

# 4. Return to root
cd ../..

# 5. Prepare root dist
echo "🚚 Moving artifacts to root..."
rm -rf dist
mkdir dist
cp -r apps/developer-portfolio/dist/* dist/

echo "📂 Root dist contents:"
ls -F dist/

echo "🏁 Script finished successfully."
