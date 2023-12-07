const express = require('express');
const { fetchNewsSummaryAssets,fetchImageByPrompt } = require("./fetch_data")
const {  downloadShorts , fetchShorts, downloadMultipleShorts, fetchShortsNDownloadRelevant} = require('./shorts');
const {getBingImages} = require('./assets_scraper')
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const {createTTSnSTT} = require("./utils")


app.use(bodyParser.json());


app.get('/fetchbyid/:id', async (req, res) => {
  const id = req.params.id;
  const lang = req.query.lang || 'en';
  //
  let data = await fetchNewsSummaryAssets({
    id, 
    lang,
    getsummary: true,
    getassets: true,
  });
  return res.json(data);
});

app.get('/download/shorts/:id', async (req, res) => {
  const id = req.params.id;
  const data = await downloadShorts(id);
  return res.json(data);
})



app.get('/shorts/:id', async (req, res) => {
  // serve id from ./youtubevids/:id.mp4
  const id = req.params.id;
  const filePath = `./youtubevids/${id}.mp4`;
  const fpath =  path.join(__dirname, filePath);
  console.log("🚀 ~ file: index.js:30 ~ app.get ~ path:", fpath)

  // Check if the file exists
  if (fs.existsSync(fpath)) {
    res.sendFile(fpath);
  } else {
    // File does not exist
    res.status(404).send({ err: 'File not found' });
  }

})

app.get('/fetchshorts', async (req, res) => {
  const query = req.query.q;
  const shorts = await fetchShorts(query);
  return res.json(shorts);
})

app.get('/fetchshortswithdownload', async (req, res) => {
  const query = req.query.q;
  const shorts = await fetchShortsNDownloadRelevant(query);
  return res.json(shorts);
})

app.post('/generate/speech', async (req, res) => {
  //if summary and id is not there in body return error
  const { summary, id } = req.body;
  const { force } = req.query;
  if(!summary || !id){
    return res.status(400).json({ error: 'Invalid request body' });
  }
  const speech = await createTTSnSTT({
    text: summary,
    id: id,
    force
  });
  console.log("🚀 ~ file: index.js:78 ~ app.post ~ speech:", speech)
  return res.json(speech);
})

app.get('/generate/summary', async (req, res) => {
  
})


app.get('/fetchall/:id',async (req, res) => {
  const id = req.params.id;
  const data = await fetchNewsData({
    id, 
    lang: 'en',
    getsummary: true,
    getassets: true,
  });
  return res.json(data);
})



app.get('/fetch/bingimages', async (req, res) => {
  const prompt = req.query.prompt || req.query.query || req.query.q;
  console.log("🚀 ~ file: index.js:102 ~ app.get ~ prompt:", prompt)
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt/query' });
  }
  const images = await getBingImages(prompt);
  //res.set('Content-Type', 'image/jpeg');
  return res.send(images);
})

app.get('/fetch/image', async (req, res) => {
  const prompt = req.query.prompt || req.query.query || req.query.q;
  console.log("🚀 ~ file: index.js:102 ~ app.get ~ prompt:", prompt)
  if (!prompt) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  const image = await fetchImageByPrompt({ title: prompt });
  res.set('Content-Type', 'image/jpeg');
  return res.send(image);
})

app.post('/extract', (req, res) => {
  const { title, summary, id, memes } = req.body;

  if (!title || !summary || !id) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const response = { title, summary, id };
  if (memes) {
    response.memes = memes;
  }
  return res.json(response);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


