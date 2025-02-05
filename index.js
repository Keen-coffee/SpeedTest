import express from 'express';
import SpeedTest from '@cloudflare/speedtest';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/run_speedtest', (req, res) => {
    try {
      const speedTest = new SpeedTest();
  
      speedTest.onFinish = results => {
        try {
          const downloadSpeed = results.getDownloadBandwidth() / 125000; // Convert from Bytes/s to Mbps
          const uploadSpeed = results.getUploadBandwidth() / 125000; // Convert from Bytes/s to Mbps
          const latency = results.getUnloadedLatency(); // Latency in milliseconds
      
          res.json({
            downloadSpeed: downloadSpeed.toFixed(2) + " Mbps",
            uploadSpeed: uploadSpeed.toFixed(2) + " Mbps",
            latency: latency.toFixed(2) + " ms"
          });
        } catch (error) {
          res.status(500).json({ error: error.toString() });
        }
      };
      
  
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
