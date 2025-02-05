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
  
      speedTest.onFinish = results => {
        res.json({ result: results.getSummary() }); // Ensure we send structured data
      };
  
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
