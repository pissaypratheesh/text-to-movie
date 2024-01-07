const express = require('express');
const app = express();
const port = 9999;
const path = require('path');
const fs = require("fs");

const outputDir = path.join(__dirname, './output/');
const cacheDir = path.join(__dirname, './cache/');
const { burn } = require('./burn.js')

app.get('/burn', async (req, res) => {
  // Add await keyword where needed
  res.send('This is a dummy route');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
