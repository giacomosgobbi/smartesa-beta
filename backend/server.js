const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const productsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8')
);
const supermarketsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/supermarkets.json'), 'utf8')
);

let userProfile = {
  name: 'Guest User',
  location: 'Milan',
  preferences: [],
  intolerances: [],
  budget: 'medium'
};


app.get('/api/supermarkets', (req, res) => {
  res.json(supermarketsData);
});

app.get('/api/products', (req, res) => {
  res.json(productsData);
});

app.post('/api/compare', (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items array is required' });
  }

  const supermarkets = supermarketsData.supermarkets.map(s => s.name);
  
  const comparison = supermarkets.map(supermarket => ({
    supermarket,
    total: 0,
    items: [],
    notFound: []
  }));

  items.forEach(itemName => {
    const product = productsData.products.find(
      p => p.name.toLowerCase() === itemName.toLowerCase()
    );

    if (product) {
      supermarkets.forEach((supermarket, index) => {
        const price = product.prices[supermarket];
        if (price !== undefined) {
          comparison[index].total += price;
          comparison[index].items.push({
            name: product.name,
            unit: product.unit,
            price: price
          });
        }
      });
    } else {
      comparison.forEach(c => {
        c.notFound.push(itemName);
      });
    }
  });

  comparison.forEach(c => {
    c.total = Math.round(c.total * 100) / 100;
  });

  comparison.sort((a, b) => a.total - b.total);

  const cheapest = comparison[0].supermarket;

  res.json({
    comparison,
    cheapest,
    itemsRequested: items.length,
    itemsFound: comparison[0].items.length
  });
});

app.get('/api/profile', (req, res) => {
  res.json(userProfile);
});

app.post('/api/profile', (req, res) => {
  const { name, location, preferences, intolerances, budget } = req.body;

  if (name) userProfile.name = name;
  if (location) userProfile.location = location;
  if (preferences) userProfile.preferences = preferences;
  if (intolerances) userProfile.intolerances = intolerances;
  if (budget) userProfile.budget = budget;

  res.json({
    message: 'Profile updated successfully',
    profile: userProfile
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Smartesa API is running' });
});

app.listen(PORT, () => {
  console.log(`Smartesa backend server running on http://localhost:${PORT}`);
});
