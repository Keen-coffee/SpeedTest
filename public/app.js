const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const router = express.Router();
const templateEngine = require('lodash');

// Serve static files from the public directory
const staticFileMiddleware = serveStatic(path.join(__dirname, '../public'));

router.get('/', staticFileMiddleware);

// Test results display
router.post('/test', async (req, res) => {
    try {
        // Run Speedtest
        const {speedtest} = require('speedtest');

        const client = new speedtest({
            host: 'www.cloudflare.com',
            port: 3000,
            provider: 'cloudflare',
        });

        // Run test
        const result = await client.testX();

        // Store the results
        fs.writeFileSync(
            path.join(__dirname, '../templates/result.html'),
            `<h1>Test Results</h1>
             <p>Download Speed: ${result.download / 1000000} Mbps</p>
             <p>Upload Speed: ${result.upload / 1000000} Mbps</p>`
        );

        res.sendFile(path.join(__dirname, '../templates/result.html'));
    } catch (error) {
        console.error('Speedtest error:', error);
        res.status(500).send('Error running speed test');
    }
});

module.exports = router;