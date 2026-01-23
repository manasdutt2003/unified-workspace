const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log("🚀 Starting Cross-Platform Build...");

const appDir = path.join(__dirname, '../apps/developer-portfolio');
const rootDist = path.join(__dirname, '../dist');

try {
    // 1. Install Dependencies at ROOT (Essential for Monorepo links)
    console.log("📦 Installing Dependencies at Root...");
    execSync('npm install --include=dev', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });

    // 2. Install Dependencies in App (Essential for 'vite' binary)
    console.log("📦 Installing Dependencies in App...");
    execSync('npm install --include=dev', { cwd: appDir, stdio: 'inherit' });

    // 2. Build the App
    console.log("🏗️ Building Portfolio...");
    execSync('npm run build', { cwd: appDir, stdio: 'inherit' });

    // 3. Prepare Root Dist
    console.log("🚚 Moving artifacts to root...");
    if (fs.existsSync(rootDist)) {
        fs.rmSync(rootDist, { recursive: true, force: true });
    }
    fs.mkdirSync(rootDist);

    // 4. Copy Copy Copy
    const srcDist = path.join(appDir, 'dist');
    // Simple recursive copy function since fs.cp is Node 16.7+ (Vercel has 20, but safe is safe)
    fs.cpSync(srcDist, rootDist, { recursive: true });

    console.log("📂 Root dist contents:");
    console.log(fs.readdirSync(rootDist));

    console.log("🏁 Build finished successfully.");

} catch (error) {
    console.error("❌ Build Failed:", error.message);
    process.exit(1);
}
