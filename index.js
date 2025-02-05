import express from 'express';
import SpeedTest from '@cloudflare/speedtest';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/run_speedtest', (req, res) => {
  try {
    const speedTest = new SpeedTest();

    speedTest.onFinish = results => {
      const downloadSpeed = results.downloadBandwidth / 125000; // Convert from Bytes/s to Mbps
      const uploadSpeed = results.uploadBandwidth / 125000; // Convert from Bytes/s to Mbps
      const latency = results.latency; // Latency in milliseconds

      res.json({
        downloadSpeed: downloadSpeed.toFixed(2),
        uploadSpeed: uploadSpeed.toFixed(2),
        latency: latency.toFixed(2)
      });
    };

  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
