import express from 'express';
import SpeedTest from '@cloudflare/speedtest';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, JS, CSS) from the public directory.
app.use(express.static('public'));

// API route to run the speedtest.
app.get('/run_speedtest', (req, res) => {
  try {
    const speedTest = new SpeedTest();

    // When the speedtest finishes, send its summary back.
    speedTest.onFinish = results => {
      // results.getSummary() returns a string summary.
      res.json({ result: results.getSummary() });
    };

    // (Optionally, add an onUpdate callback if you want to stream progress.)

  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
