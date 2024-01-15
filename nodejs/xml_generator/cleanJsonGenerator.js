const path = require('path');

function addVideoDuration (data, time){
    let dur = time/(data.length);
    let seqDur = 0;
    data.forEach(item => {
        item.duration = dur;
        item.ss = seqDur;
        seqDur += item.duration;
        item.s = item.link
    })
    return data;
}

function getAbsolutePath(p) {
    return path.join(__dirname, p)
}

function createDimensions(w, h) {
    return {
            w: w,
            h: h
    };
}

const width = '720';
const height = '1280'

const { genericAudioOps } = require('./basicOptions/audiooptions.js');
const { genericTxtOps } = require('./basicOptions/textoptions.js');
const { genericImgOps } = require('./basicOptions/imageoptions.js');
const { genericTransitionOps } = require('./basicOptions/transitionoptions.js');
const { genericVidOps } = require('./basicOptions/videooptions.js');
const { createMiraMLXML } = require('./index')
const { Factory } = require('../lib/index'); // This lib folder Factory ffcreator supports xml and json
const CacheUtil = require('../lib/utils/cache');


const font1 = path.join(__dirname, '../public/assets/font/lf_bold.ttf');
const logo2 = path.join(__dirname, '../public/assets/imgs/logo/ai_logo.png');
const tts = path.join(__dirname, '../assets/audio/3Audio.mp3');// '../public/assets/audio/tts_output.wav');
const bgAudio = path.join(__dirname, '../assets/audio/bg1.mp3');// '../public/assets/audio/tts_output.wav');
const sunovid = path.join(__dirname, '../assets/video/demo3.mp4');

const outputDir = path.join(__dirname, '../output/');
const cacheDir = path.join(__dirname, '../cache/');
console.log("\n\noutdirrrrr--->",__dirname,outputDir,cacheDir)


function round(x) {
  const PROGRESS_PRECISION = 3;
  const m = Math.pow(10, PROGRESS_PRECISION);
  return Math.round(x * m) / m;
}

const {
    FFCreatorCenter,
    FFScene,
    FFAlbum,
    FFSubtitle,
    FFText,
    FFImage,
    FFCreator,
    FFVideo,
    FFAudio
  } = require('ffcreator'); // this ffcreator library supports subtitle overlay with tts
  const { splitStringIntoLines } = require('../generic_utils');
  const colors = require('colors');

const fs = require("fs");
const summary = require('../assets_sample_rahul2.json');
//const whisperxSeq = require('../../rahulGandhiCase/AUD-20231126-WA0012.json'); // need to fetch the assets for sequences
const { sum } = require('lodash');
const { Model } = require('echarts');
//const dimensions = createDimensions('720','1280');
const dimensions = createDimensions(width,height);
const ttsTime = 30;
const song = `Yo, so Election Commission dropped a notice bomb on Rahul for calling the PM a bad omen at a rally. Opposition was triggered and filed a complaint, now EC's like, "Explain yourself by Saturday, fam!" Rahul dissed by saying he jinxed India's World Cup final. EC's all serious, talking Model Code of Conduct violations and crores waivers drama. They even brought up the Supreme Court vibes. Rahul, you in some political hot water, bro!`


let vidsForSeg = [
        {
            "title": "Can Rahul Gandhi fight election & become PM? #shortsvideo #shorts #reels #rahulgandhi",
            "thumbnail": {
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/OntZrU9cKj0/hq720_2.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4Ac4FgAKACooCDAgAEAEYciBRKDYwDw==&rs=AOn4CLA6ME4CZu7jJ3tbgkfed7Bvg1ZuRA",
                        "width": 360,
                        "height": 202
                    },
                    {
                        "url": "https://i.ytimg.com/vi/OntZrU9cKj0/hq720_2.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGADwAQH4Ac4FgAKACooCDAgAEAEYciBRKDYwDw==&rs=AOn4CLA1_vfb2Y2I6alQiW-F1x7YMbglfg",
                        "width": 720,
                        "height": 404
                    }
                ]
            },
            "videoId": "OntZrU9cKj0",
            "link": "https://www.youtube.com/shorts/OntZrU9cKj0",
            "src": "/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/dh_hackathon/youtubevids/OntZrU9cKj0.mp4"
        },
        {
            "title": "Rahul Gandhi News | Rahul Gandhi Speech On Modi | Rahul Gandhi Slams Modi Government |#viral #short",
            "thumbnail": {
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/B404Uf9PI9c/hq720_2.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4AbYIgAKAD4oCDAgAEAEYYiBZKGUwDw==&rs=AOn4CLAG8c2KrfTSsaKTQYot79BW4iUOrQ",
                        "width": 360,
                        "height": 202
                    },
                    {
                        "url": "https://i.ytimg.com/vi/B404Uf9PI9c/hq720_2.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGADwAQH4AbYIgAKAD4oCDAgAEAEYYiBZKGUwDw==&rs=AOn4CLCOwq8nTz_RIMrK0ZhZFkzNHM0NMA",
                        "width": 720,
                        "height": 404
                    }
                ]
            },
            "videoId": "B404Uf9PI9c",
            "link": "https://www.youtube.com/shorts/B404Uf9PI9c",
            "src": "/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/dh_hackathon/youtubevids/B404Uf9PI9c.mp4"
        },
        {
            "title": "Rahul Gandhi Disqualified | Spoof Edit #congress #bjp #shorts #modi #short",
            "thumbnail": {
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/v9WDMO_MFIc/hq720_2.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4Ac4FgAKACooCDAgAEAEYfyATKBQwDw==&rs=AOn4CLBzuiR3tbA1fjkY46aiicaJVtGnBA",
                        "width": 360,
                        "height": 202
                    },
                    {
                        "url": "https://i.ytimg.com/vi/v9WDMO_MFIc/hq720_2.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGADwAQH4Ac4FgAKACooCDAgAEAEYfyATKBQwDw==&rs=AOn4CLDsIU9iWparf-GVzIePI06NbpAwwQ",
                        "width": 720,
                        "height": 404
                    }
                ]
            },
            "videoId": "v9WDMO_MFIc",
            "link": "https://www.youtube.com/shorts/v9WDMO_MFIc",
            "src": "/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/dh_hackathon/youtubevids/v9WDMO_MFIc.mp4"
        },
        {
            "title": "Rahul Gandhi In Lok Sabha: 'Manipur Not India For PM Modi' #shorts",
            "thumbnail": {
                "thumbnails": [
                    {
                        "url": "https://i.ytimg.com/vi/J65z-4LU0jc/hq720_2.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4AbYIgAKAD4oCDAgAEAEYZSBfKE0wDw==&rs=AOn4CLC7VcaU5gcK6OLx3OiWxW5vaTseFw",
                        "width": 360,
                        "height": 202
                    },
                    {
                        "url": "https://i.ytimg.com/vi/J65z-4LU0jc/hq720_2.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGADwAQH4AbYIgAKAD4oCDAgAEAEYZSBfKE0wDw==&rs=AOn4CLCdMDv7qFACgDag8O2d_kMtT9kuMw",
                        "width": 720,
                        "height": 404
                    }
                ]
            },
            "videoId": "J65z-4LU0jc",
            "link": "https://www.youtube.com/shorts/J65z-4LU0jc",
            "src": "/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/dh_hackathon/youtubevids/J65z-4LU0jc.mp4"
        }
    ]
let canvasSeg = [
    {   
        "type":"video",
        "title": "Can Rahul Gandhi fight election & become PM? #shortsvideo #shorts #reels #rahulgandhi",
        "thumbnail": {
            "thumbnails": [
                {
                    "url": "https://i.ytimg.com/vi/OntZrU9cKj0/hq720_2.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4Ac4FgAKACooCDAgAEAEYciBRKDYwDw==&rs=AOn4CLA6ME4CZu7jJ3tbgkfed7Bvg1ZuRA",
                    "width": 360,
                    "height": 202
                },
                {
                    "url": "https://i.ytimg.com/vi/OntZrU9cKj0/hq720_2.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGADwAQH4Ac4FgAKACooCDAgAEAEYciBRKDYwDw==&rs=AOn4CLA1_vfb2Y2I6alQiW-F1x7YMbglfg",
                    "width": 720,
                    "height": 404
                }
            ]
        },
        "videoId": "OntZrU9cKj0",
        "link": getAbsolutePath("../assets/vtuber/fvt.mp4"),
        "s": getAbsolutePath("../assets/vtuber/fvt.mp4"),
    }
]
canvasSeg = addVideoDuration(canvasSeg, ttsTime);

vidsForSeg = addVideoDuration(vidsForSeg, ttsTime);

let segments = []
vidsForSeg.forEach((vid) => {
    vid.type = "video";
    segments.push({
        vidDuration: vid.duration,
        videos: [vid]
    })
})

//console.log("🚀 ~ file: jsonGenerator.js:158 ~ segments:", segments)
//<trans duration="1" key="fadecolor"/>

const generateJSONFromSequences = ({ summary, sequences, dimensions, mute, canvas }) =>  {
    //console.log("🚀 ~ file: jsonGenerator.js:170 ~ generateJSONFromSequences ~ sequences:", sequences)
    let json = {
        dimensions: dimensions,
        mute: mute
    }
    let jsonSequences = [];

    // add initial immersive shorttext like Exit Poll
    /* if(summary && summary.shortTitle){
        jsonSequences.push({   
            type: 'text',
            text: summary.shortTitle,
            asMask: true,
            options: {
               
            }
        })
    } */

    // add images n vid seqs with transitions
    if(sequences && sequences.length > 0) {
        //for each of the sequence like 
        sequences.forEach((sequence) => {

            if(sequence.videos && sequence.videos.length){
                sequence.videos.forEach((vid,i) => {
                   // console.log("\n\n\n🚀 ~ file: jsonGenerator.js:213 ~ sequence.videos.forEach ~ vid:", vid)

                     //push the video
                     jsonSequences.push({
                        type: 'video',
                        options: {
                            ...genericVidOps({ d: vid.duration,
                                a: "false",
                                s: vid.src || vid.s,
                                ss: vid.ss || '0',
                                x: '50vw', y: '50vh', w: '100vw', h: '100vh'}, dimensions),
                        }
                     })
                    //  if(i != sequences.length-1){
                    //     //push the transition
                    //     jsonSequences.push({
                    //         type: 'transition',
                    //     })
                    //  }
                })
            }

            //if there are images, add to seq with the transition
            if(sequence.noOfImgs){
                let d = sequence.imgDuration
                sequence.images.forEach((image,i) => {
                    
                    //push the image 
                    //check if its first to add text
                    if(!i &&  summary &&  summary.shortTitle){
                        jsonSequences.push({
                            type: 'image',
                            options: {
                                ...genericImgOps({ s: image.url, d, x_value: '50vw', y_value: '50vh', w_value: '100vw', h_value: '100vh' }, dimensions),
                            },
                            textElements: [{
                                text: summary.shortTitle,
                                animate: true,
                                asMask: 'true',
                                options:{
                                    duration: '3'
                                }
                                
                            }]
                        })
                    }else{
                        jsonSequences.push({
                            type: 'image',
                            options: {
                                ...genericImgOps({ s: image.url, d, x_value: '50vw', y_value: '50vh', w_value: '100vw', h_value: '100vh' }, dimensions),
                            }
                        })
                    }
                    
                    //push the transition
                    if(i  != sequences.length-2){
                        jsonSequences.push({
                            type: 'transition',
                        })
                    }
                })
            }
        })
    }
    json.sequences = jsonSequences
    json.toCanvas = []
    if(canvas){
        canvas.forEach((vid) => {
             //push the video
             json.toCanvas.push({
                type: 'video',
                options: {
                    ...genericVidOps({ d: vid.duration,
                        a: "false",
                        s:vid.link,
                        x: '80vw', y: '90vh', w: '160rpx', h: '185rpx'}, dimensions),
                }
             })
        })
    }
    return json
}

//edge-tts --text "Hello, world!" --write-media hello.mp3 --write-subtitles hello.vtt
if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
}

let generatedJson = generateJSONFromSequences({
    summary,
    sequences: segments,
    dimensions,
    mute: true,
    canvas: canvasSeg
})
//console.log("\n\n\n\n🚀 ~ file: jsonGenerator.js:231 ~ generatedJson:",JSON.stringify( generatedJson))
var mirmalCode = createMiraMLXML(generatedJson)//finalJSON);
console.log("\n\nPratheesh come herrr",mirmalCode)

async function someAsyncFunction(mirmalCode) {
    console.log(mirmalCode)
    try {
        //  await burn({value, cacheDir, outputDir: path.dirname(miraml_file)});
        console.log("Burning started!!")
        var opts = { value: mirmalCode, cacheDir, outputDir: outputDir }

        CacheUtil.cacheDir = cacheDir;
        Factory.debug = true;
        Factory.cacheNode = CacheUtil.cacheNode;

        const { node: creator, cache } = Factory.from(opts.value, opts, (pp) => {
            console.log('burner.js loading...', pp);
        });
        await cache;

        const onMessage = typeof opts['onMessage'] === 'function'
            ? opts['onMessage']
            : ()=>{};
        const onComplete = typeof opts['onComplete'] === 'function'
            ? opts['onComplete']
            : ()=>{};
        const task_id = opts['task_id'];

        let t = Date.now();
        creator.on('start', () => {
            console.log(`Burn start.`);
            console.log(`Burn start timestamp: ${Date.now() - t}ms`);
            onMessage({
            task_id,
            status: "start",
            step: "start",
            });
        }).on('error', event => {
            console.error("creator error", event);
            onMessage({
                task_id,
                step:"error",
                result: {type: event.type, pos: event.pos, error: event.error},
            });
        }).on('progress', e => {
            let number = e.percent || 0;
            console.log(`Burn progress: ${(number * 100) >> 0}%`);
            console.log(`Burn progress timestamp: ${Date.now() - t}ms`);
            onMessage({
                task_id,
                step: "progress",
                progress: round(0.2 + number * 0.8),
            });
        }).on('preloading', (evt) => {
            console.log(`Burn preloading: ${evt.id}: ${evt.loaded}/${evt.total}`);
            console.log(`Burn preloading timestamp: ${Date.now() - t}ms`);
            onMessage({
                task_id,
                step: "progress",
                progress: round((evt.loaded / evt.total) * 0.05),
            });
        }).on('prepareMaterial', (evt) => {
            console.log(`Burn prepareMaterial: ${evt.id}: ${evt.prepared}/${evt.total}`);
            console.log(`Burn prepareMaterial timestamp: ${Date.now() - t}ms`);
            onMessage({
                task_id,
                step: "progress",
                progress: round(0.05 + (evt.prepared / evt.total) * 0.15),
            });
        }).on('complete', e => {
            console.log(" complete e -->",Object.keys(e))
            console.log(`Burn completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `);
            console.log(`Burn completed timestamp: ${Date.now() - t}ms`);
            console.log("\n\n\n\nprqatheesh")
            onMessage({
                task_id,
                step: "finish",
                result: e.output,
            });
            console.log("\n\n\npath.join(__dirname, './output/')-->",path.join(__dirname, '../output/'))
            addSpeechNSubs( {video_path: e.output, outputDir:  path.join(__dirname, '../output/'),outputFileName: 'test3.mp4',song, overall_duration:24, font1, tts })
            onComplete();
        }).generateOutput().start();

        // let creator = await burn && burn(opt,(e)=>{
        //     var output = e.output;
        //     addSpeechNSubs( {video_path: output, song, overall_duration:24, font1, tts })
        // });
        // creator.on('complete', e => {
        //     console.log("\n\n\nPratheeesssss..-->",e)
        // })
        //console.log('Burn completed successfully.');
    } catch (error) {
        console.error('Error during burn:', error);
    }
}

// Call the asynchronous function
setTimeout(()=>{
  //  someAsyncFunction(mirmalCode);
     //var path = '/Users/pratheesh.pm/Documents/codebase/text-to-movie/nodejs/output/adbfjicnejij55qu.mp4'
   // addSpeechNSubs( {video_path: path, outputDir:  outputDir,outputFileName: 'test2.mp4',song, overall_duration:24, font1, tts })
}, 1000)


async function addSpeechNSubs( opts){
    let {video_path,outputDir,outputFileName, song, overall_duration, tts, socket, bg } = opts || {};
    console.log("🚀 ~ file: cleanJsonGenerator.js:430 ~ addSpeechNSubs ~ video_path,outputDir,outputFileName, song, overall_duration=40, tts, socket, bg :", video_path,outputDir,outputFileName, song, overall_duration, tts, bg )
    console.log("\n\n\n in addSpeechNSubs",overall_duration, `${outputDir}${outputFileName}`)

    const onMessage = typeof opts['onMessage'] === 'function'    ? opts['onMessage']    : ()=>{};
    const onComplete = typeof opts['onComplete'] === 'function'    ? opts['onComplete']    : ()=>{};
    const task_id = opts['task_id'] || 1;
    let t = Date.now();
    const creator = new FFCreator({
        cacheDir,
        output: `${outputDir}${outputFileName}`,
        width,
        height,
        debug: false,
      });
    
      creator.addAudio(new FFAudio({ path: bg, volume: 0.1, fadeIn: 4, fadeOut: 4, loop: true }));
    
      // create FFScene
      const scene1 = new FFScene();

      //add video
      const fvideo = new FFVideo({
        path: video_path,
        width: width * 1,
        height: height * 1,
        x: width / 2,
        y: height / 2,
        // ss: '00:00:00',
        // to: '00:00:13',
       // blur: 10,
      });
      //fvideo.addEffect('backInUp', 0.5, 0.5);
      //fvideo.setScale(2.3);
      fvideo.setAudio(false);
      fvideo.setLoop(true)
      scene1.addChild(fvideo);


      scene1.addAudio(tts);

        // add logo
        const flogo2 = new FFImage({ path: logo2, x: width * .82, y: 70 });
        flogo2.setScale(0.4);
        flogo2.addEffect('fadeInDown', 1, 1.2);
        scene1.addChild(flogo2);

      
      
      //add subtitle
      const title = splitStringIntoLines(song.toUpperCase(),28)
      const subtitle = new FFSubtitle({
        comma: true, // 是否逗号分割
        backgroundColor: '#00219C',
        color: '#fff',
        fontSize: 35,
        wrap: "true" ,
        x: width * .5,
        y: height * .73,
        width: width/2,
      });
      subtitle.setText(title);
      subtitle.setFont(font1);
      subtitle.setSpeech(tts); // 语音配音-tts
      subtitle.frameBuffer = 24;
      scene1.addChild(subtitle);
      scene1.setDuration(Math.ceil(overall_duration));

      // add scene
      creator.addChild(scene1);
      creator.start();
    creator.closeLog();

    creator.on('start', () => {
        console.log(`FFCreator start`);
        const startMessage = {
            task_id,
            status: "start",
            step: "start",
        };
        onMessage(startMessage);
        socket && socket.emit('progress', startMessage);
    });

    creator.on('error', event => {
        console.log(`FFCreator error: ${JSON.stringify(event)}`);
        console.error("creator error", event);
        onMessage({
          task_id,
          step:"error",
          result: {type: event.type, pos: event.pos, error: event.error},
        });
    });

    creator.on('progress', e => {
        console.log(colors.yellow(`FFCreator progress: ${(e.percent * 100) >> 0}%`));
        let number = e.percent || 0;
        console.log(`Burn progress: ${(number * 100) >> 0}%`);
        console.log(`Burn progress timestamp: ${Date.now() - t}ms`);
        const progressMessage = {
            task_id,
            step: "progress",
            progress: round(0.2 + number * 0.8),
        };
        onMessage(progressMessage);
        socket && socket.emit('progress', progressMessage);
    });

    creator.on('complete', e => {
        console.log(
        colors.magenta(`FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output}`),
        );

        const finishMessage = {
            task_id,
            step: "finish",
            result: e.output,
            output:`http://localhost:3000/${e.output.split('/public/')[1]}`
        };
        onMessage(finishMessage);
        socket && socket.emit('progress', finishMessage);
        onComplete();

        console.log(colors.green(`\n --- You can press the s key or the w key to restart! --- \n`));
    });

    FFCreatorCenter.addTask(creator);
}


module.exports = {
    addSpeechNSubs,
}