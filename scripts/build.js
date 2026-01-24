const { execSync } = require('child_process');
const path = require('path');

console.log("🚀 Starting Direct Build...");

const appDir = path.join(__dirname, '../apps/developer-portfolio');

try {
    // 1. Install Dependencies at ROOT
    console.log("📦 (1/3) Installing Root Dependencies...");
    execSync('npm install --include=dev', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });

    // 2. Install Dependencies in APP
    console.log("📦 (2/3) Installing App Dependencies...");
    execSync('npm install --include=dev', { cwd: appDir, stdio: 'inherit' });

    // 3. Build the App (Explicitly run Vite to avoid recursive 'npm run build' loop)
    console.log("🏗️ (3/3) Building Portfolio...");
    execSync('npx vite build', { cwd: appDir, stdio: 'inherit' });

    console.log("✅ Build finished. Checking output folder:");
    console.log(fs.readdirSync(path.join(appDir, 'dist'))); // Verify it exists!

    console.log("🏁 Output should be in apps/developer-portfolio/dist");

} catch (error) {
    console.error("❌ Build Failed:", error.message);
    process.exit(1);
}
