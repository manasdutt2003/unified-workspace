const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data/price_history.json');

const COINS = ['ETH', 'BTC', 'SOL', 'MATIC', 'USDC'];
const BASE_PRICES = {
    'ETH': 2500,
    'BTC': 65000,
    'SOL': 140,
    'MATIC': 0.85,
    'USDC': 1.00
};

function logCryptoPrices() {
    // Ensure data directory exists
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    let history = [];
    if (fs.existsSync(DATA_FILE)) {
        try {
            history = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
            // Keep file size manageable
            if (history.length > 100) {
                history = history.slice(-100);
            }
        } catch (e) {
            history = [];
        }
    }

    const timestamp = new Date().toISOString();
    const newEntry = {
        timestamp: timestamp,
        prices: {}
    };

    // Simulate price fluctuations
    COINS.forEach(coin => {
        const base = BASE_PRICES[coin];
        const fluctuation = (Math.random() - 0.5) * 0.05 * base; // +/- 2.5%
        newEntry.prices[coin] = parseFloat((base + fluctuation).toFixed(2));
    });

    history.push(newEntry);

    fs.writeFileSync(DATA_FILE, JSON.stringify(history, null, 2));
    console.log(`Logged new crypto prices at ${timestamp}`);
}

logCryptoPrices();
