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

    // Log the entire results object to inspect its structure
    console.log("Speedtest results:", results);

    // Access the necessary results properties directly
    const downloadSpeed = results.download.bandwidth / 125000; // Convert from Bytes/s to Mbps
    const uploadSpeed = results.upload.bandwidth / 125000; // Convert from Bytes/s to Mbps
    const latency = results.latency.toFixed(2); // Latency in milliseconds

    console.log("Download Speed:", downloadSpeed);
    console.log("Upload Speed:", uploadSpeed);
    console.log("Latency:", latency);

    // Send results to the client
    res.json({
      downloadSpeed: downloadSpeed.toFixed(2) + " Mbps",
      uploadSpeed: uploadSpeed.toFixed(2) + " Mbps",
      latency: latency + " ms"
    });
  } catch (error) {
    console.error("Error during speedtest:", error);
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
