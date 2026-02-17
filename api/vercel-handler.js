const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const urlShortener = require('../src/utils/urlShortener');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
const apiRoutes = require('../src/routes/api');
app.use('/api', apiRoutes);

// Short URL redirect
app.get('/s/:code', (req, res) => {
  try {
    const result = urlShortener.expandUrl(req.params.code);
    res.redirect(result.originalUrl);
  } catch (error) {
    res.sendFile(path.join(__dirname, '..', 'public', 'tools', 'url-shortener.html'));
  }
});

// Export for Vercel
module.exports = app;
