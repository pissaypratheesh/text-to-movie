const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = 9999;
const path = require('path');
const fs = require("fs");

const outputDir = path.join(__dirname, './public/assets/output/');
const cacheDir = path.join(__dirname, './cache/');
const { burn } = require('./burn.js')


app.get('/test', (req, res) => {
  return res.json({})
})

app.post('/burn', async (req, res) => {
  const data = req.body;
  console.log("🚀 ~ file: burnerApp.js:25 ~ app.post ~ data:", data)
  if(!data.xml){
    return res.status(500).send({Error: 'XML is required'});
  }
  const socket = req.app.get('socket');
  await burn && burn({ value: data.xml, cacheDir, outputDir: outputDir }, (e) => {
    if(e){
      console.log(e)
      if(e.output){
        return res.send({output: `${req.protocol}://localhost:3000/${e.output.split('/public/')[1]}`, path: e.output});
      }
      return res.status(500).send({Error: e});
    }
  });
  // Add await keyword where needed
  
});

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
