const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'enhancement_log.txt');

const SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NVDA'];

function fetchStockData() {
    const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const price = (Math.random() * 1000).toFixed(2);
    const change = ((Math.random() * 10) - 5).toFixed(2);
    const volume = Math.floor(Math.random() * 1000000);

    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] Fetched new data for ${symbol}: $${price} (${change}%) Vol: ${volume}\n`;

    fs.appendFileSync(LOG_FILE, logEntry);
    console.log(`Updated chart data for ${symbol}`);
}

fetchStockData();
