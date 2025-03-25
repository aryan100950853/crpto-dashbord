// backend/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/crypto-summary', async (req, res) => {
  try {
    const [coingecko, coincap] = await Promise.all([
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=5'),
      axios.get('https://api.coincap.io/v2/assets?limit=5')
    ]);
    res.json({ coingecko: coingecko.data, coincap: coincap.data.data });
  } catch (err) {
    res.status(500).json({ error: 'API fetch failed', details: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
