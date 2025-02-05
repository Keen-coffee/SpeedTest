const express = require('express');
const cors = require('cors');
const SpeedTest = require('@cloudflare/speedtest');

const app = express();
app.use(cors());
app.use(express.json());

// Speedtest configuration
const options = {
  provider: 'speedtest',
  host: 'api.speedtest.net',
  port: 443,
};

// Create a new speed test instance
const speedTest = new SpeedTest(options);

app.get('/speed-test', (req, res) => {
  speedTest.onFinish = function(result) {
    console.log('Speed Test Results:', result.getSummary());
    res.send(result.getSummary());
  };

  speedTest.run();
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});