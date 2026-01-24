const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log("🚀 Starting Clean Build Script...");

const appDir = path.join(__dirname, '../apps/developer-portfolio');

try {
    // 1. Install Dependencies at ROOT
    console.log("📦 (1/3) Installing Root Dependencies...");
    execSync('npm install --include=dev', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });

    // 2. Install Dependencies in APP
    console.log("📦 (2/3) Installing App Dependencies...");
    execSync('npm install --include=dev', { cwd: appDir, stdio: 'inherit' });

    // 3. Build the App
    console.log("🏗️ (3/3) Building Portfolio...");

    // Add local .bin to PATH to ensure 'vite' command is found
    const env = { ...process.env };
    const binPath = path.join(appDir, 'node_modules', '.bin');
    env.PATH = `${binPath}${path.delimiter}${env.PATH}`;

    console.log(`Using PATH with: ${binPath}`);

    // Simple command - let the OS resolve 'vite' from PATH
    execSync('vite build', { cwd: appDir, stdio: 'inherit', env: env });

    console.log("✅ Build finished. Checking output folder:");
    // Print first 10 files to verify output
    const distFiles = fs.readdirSync(path.join(appDir, 'dist'));
    console.log(distFiles.slice(0, 10));

    console.log("🏁 Output confirmed in apps/developer-portfolio/dist");

} catch (error) {
    console.error("❌ Build Failed:", error.message);
    process.exit(1);
}
