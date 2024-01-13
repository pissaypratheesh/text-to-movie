const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
const port = 9999;
const path = require('path');
const fs = require("fs");

const outputDir = path.join(__dirname, './public/assets/output/');
const cacheDir = path.join(__dirname, './cache/');
const { burn } = require('./burn.js')
const { addSpeechNSubs } = require('./xml_generator/cleanJsonGenerator.js');


app.get('/test', (req, res) => {
  return res.json({})
})

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.on('burn', async (data) => {                                                                                                                                                                                  
    if (!data.xml) {                                                                                                                                                                                                   
      console.log('Error: XML is required');                                                                                                                                                                           
      return;                                                                                                                                                                                                          
    }                                                                                                                                                                                                                  
   
    await burn && burn({ value: data.xml, cacheDir, outputDir: outputDir, socket },(e)=>{
      let path = e.output;
      console.log("🚀 ~ file: burnerApp.js:50 ~ awaitburn&&burn ~ path:", data.overall_duration, path, data.tts, data.subtitle)
       
      addSpeechNSubs({
        video_path: path,
        outputDir:outputDir,
        outputFileName:"output.mp4",
        song:data.subtitle, 
        tts:  data.tts, 
        bg: data.bg,
        socket,
        overall_duration: data.overall_duration
      })
    });       

  }); 


  console.log('Client connected');
  app.set('socket', socket);
  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
