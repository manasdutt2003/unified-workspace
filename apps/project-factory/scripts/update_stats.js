const fs = require('fs');
const path = require('path');

const STATS_FILE = path.join(__dirname, 'data/template_usage.json');

const PROJECT_TYPES = ['React App', 'Node API', 'Python Script', 'Docker Service'];
const FEATURES = ['Auth', 'Database', 'CI/CD', 'Testing', 'Linting'];

function updateTemplateStats() {
    // Ensure data directory exists
    const dir = path.dirname(STATS_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    let stats = {
        totalGenerations: 0,
        popularTypes: {},
        featureUsage: {}
    };

    if (fs.existsSync(STATS_FILE)) {
        try {
            stats = JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
        } catch (e) {
            // Keep default
        }
    }

    // Simulate new project generation
    stats.totalGenerations += Math.floor(Math.random() * 3) + 1;

    // Update popular types
    const type = PROJECT_TYPES[Math.floor(Math.random() * PROJECT_TYPES.length)];
    if (!stats.popularTypes[type]) stats.popularTypes[type] = 0;
    stats.popularTypes[type]++;

    // Update feature usage
    const featureCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < featureCount; i++) {
        const feature = FEATURES[Math.floor(Math.random() * FEATURES.length)];
        if (!stats.featureUsage[feature]) stats.featureUsage[feature] = 0;
        stats.featureUsage[feature]++;
    }

    stats.lastUpdated = new Date().toISOString();

    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
    console.log(`Updated template stats: ${type} with ${featureCount} features`);
}

updateTemplateStats();
