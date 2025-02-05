import express from 'express';
import SpeedTest from '@cloudflare/speedtest';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/run_speedtest', async (req, res) => {
  try {
    const speedTest = new SpeedTest();

    // Wait for the test results using the promise API
    const results = await speedTest;

    // Log the results for debugging
    console.log("Speedtest results:", results);

    // Extract download, upload, and latency values
    const downloadSpeed = results.getDownloadBandwidth() / 125000; // Convert from Bytes/s to Mbps
    const uploadSpeed = results.getUploadBandwidth() / 125000; // Convert from Bytes/s to Mbps
    const latency = results.getUnloadedLatency(); // Latency in milliseconds

    console.log("Download Speed:", downloadSpeed);
    console.log("Upload Speed:", uploadSpeed);
    console.log("Latency:", latency);

    // Send results to the client
    res.json({
      downloadSpeed: downloadSpeed.toFixed(2) + " Mbps",
      uploadSpeed: uploadSpeed.toFixed(2) + " Mbps",
      latency: latency.toFixed(2) + " ms"
    });
  } catch (error) {
    console.error("Error during speedtest:", error);
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
