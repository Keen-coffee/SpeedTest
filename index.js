import express from 'express';
import SpeedTest from '@cloudflare/speedtest';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/run_speedtest', (req, res) => {
    try {
      const speedTest = new SpeedTest();
  
      speedTest.onFinish = results => {
        console.log("Full Speedtest Results:", results);
  
        res.json(results); // Temporarily send full results to inspect structure
      };
  
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
