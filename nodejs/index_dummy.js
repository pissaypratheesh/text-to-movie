const express = require('express');
const { fetchNewsSummaryAssets,fetchImageByPrompt } = require("./fetch_data")
const {  downloadShorts , fetchShorts, downloadMultipleShorts, fetchShortsNDownloadRelevant} = require('./others/shorts');
const {getBingImages} = require('./assets_scraper')
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const {createTTSnSTT} = require("./utils")


app.use(bodyParser.json());










app.get('/generate/summary', async (req, res) => {
  
})








const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


