function addCalculations (data){
    data.forEach(item => {
        // Calculate the duration by subtracting "start" from "end"
        const duration = item.end - item.start;
        // Add a new field "duration" with the calculated duration
        //item.duration = duration;
        let noOfImgs = item.images && item.images.length;
        let noOfVids = item.videos && item.videos.length;
        let total = (noOfImgs ? noOfImgs : 0) + (noOfVids ? noOfVids : 0);
        total = total || 1;
        let imgDuration = (duration/total).toFixed(2);
        let vidDuration =  (duration/total).toFixed(2);
        item.imgDuration = imgDuration;
        item.vidDuration = vidDuration;
        item.noOfImgs = noOfImgs;
        item.noOfVids = noOfVids;
    });
    return data
}

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
function createDimensions(w, h) {
    return {
            w: w,
            h: h
    };
}

//const { genericAudioOps } = require('./basicOptions/audiooptions');
//const { genericTxtOps } = require('./basicOptions/textoptions');
const { genericImgOps } = require('./basicOptions/imageoptions');
const { genericTransitionOps } = require('./basicOptions/transitionoptions');
const { genericVidOps } = require('./basicOptions/videooptions');
const { createMiraMLXML } = require('./index')
//const { burn } = require('../burn.js')
const path = require('path');
const fs = require("fs");
const summary = require('../assets_sample_rahul2.json');
const whisperxSeq = require('../AUD-20231126-WA0012.json'); // need to fetch the assets for sequences
const { sum } = require('lodash');
//const dimensions = createDimensions('720','1280');
const dimensions = createDimensions('720','1280');
const ttsTime = 30;

let segments = addCalculations(whisperxSeq.segments)

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
        "link":"/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/examples/assets/vtuber/fvt.mp4",
        "s":"/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/examples/assets/vtuber/fvt.mp4"
    }
]
canvasSeg = addVideoDuration(canvasSeg, ttsTime);

vidsForSeg = addVideoDuration(vidsForSeg, ttsTime);

segments = []
vidsForSeg.forEach((vid) => {
    vid.type = "video";
    segments.push({
        vidDuration: vid.duration,
        videos: [vid]
    })
})

console.log("🚀 ~ file: jsonGenerator.js:158 ~ segments:", segments)


const generateJSONFromSequences = ({ summary, sequences, dimensions, mute, canvas = canvasSeg }) =>  {
    console.log("🚀 ~ file: jsonGenerator.js:170 ~ generateJSONFromSequences ~ sequences:", sequences)
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
                    
                     //push the video
                     jsonSequences.push({
                        type: 'video',
                        options: {
                            line:sequence.line,
                            ...genericVidOps({ 
                                d: vid.duration || sequence.vidDuration,
                                t: sequence.text || '',
                                a: "false",
                                s: vid.src || vid.s,
                                ss: vid.ss || '0',
                                x: '50vw', y: '50vh', w: vid.w ||  '100vw', h: vid.h || '100vh'}, dimensions),
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
                let d = sequence.imgDuration;
                sequence.images.forEach((image,i) => {
                    console.log("🚀 ~ file: jsonGenerator.js:282 ~ sequence.images.forEach ~ image:", image)

                    
                    //push the image 
                    //check if its first to add text
                    if(!i &&  summary &&  summary.shortTitle){
                        jsonSequences.push({
                            type: 'image',
                            options: {
                                line:sequence.line,
                                ...genericImgOps({ s: 
                                    image.url,
                                    d: image.duration || image.d || d,
                                    t: sequence.text || '',
                                    ss: image.ss || '0',
                                    img_h: image.height,
                                    img_w: image.width,
                                    x_value: '50vw',
                                    y_value: '50vh', w_value: image.w || '100vw', h_value:  image.h || '100vh' }, dimensions),
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
                            line:sequence.line,
                            type: 'image',
                            options: {
                                ...genericImgOps({ 
                                    s: image.url, 
                                    t: sequence.text || '',
                                    d: image.duration || image.d || d,
                                    img_h: image.height,
                                    img_w: image.width,
                                    ss: image.ss || '0',
                                    x_value: '50vw', y_value: '50vh', w_value: image.w ||  '100vw', h_value:  image.h || '100vh' }, dimensions),
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
const newsSummary = { 
    id: '12345',
    summaries: [
        {
        "text": "Rajasthan Election 2023 News: Before the voting on 25th November, the Election Commission issued 2 show cause notices to the state unit of Congress on 22nd November."
        },
        {
        "text": "The notices are related to Congress advertisements, and the Commission has asked for responses from Govind Singh Dotasara, the state Congress chief."
        },
        {
        "text": "The first notice, received due to a Congress advertisement, claims a wave in its favor, resembling a news package, aiming to confuse voters."
        },
        {
        "text": "The Commission deemed it misleading and aimed at creating confusion about the election outcome."
        },
        {
        "text": "The second notice is regarding Congress advertisements luring voters, asking them to give a missed call for availing benefits, potentially violating the Model Code of Conduct."
        },
        {
        "text": "The Election Commission expressed concern about Congress showing interest in this advertisement on various media platforms."
        },
        {
        "text": "The BJP had complained about both cases, expressing concerns about Congress linking benefits to voting for them while being in power."
        },
        {
        "text": "The first notice required a response by 3 pm on Thursday, and the second notice demanded a reply by 7 pm on Friday."
        },
        {
        "text": "Both notices were issued in response to complaints lodged by the BJP against Congress."
        },
        {
        "text": "The Election Commission aims to address potential violations and maintain the integrity of the election process in Rajasthan."
        }
    ]
}
  


const outputDir = path.join(__dirname, '../output/');
const cacheDir = path.join(__dirname, '../cache/');
if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
}
//CacheUtil.cacheDir = cacheDir;
// Example usage:
/* //{ author, dimensions, name, mute, scenes, sequences }
  here sequences are mandatory
 "https://cos.mirav.cn/player/pic_oceans.mp4"
 "https://cos.mirav.cn/player/pic1.jpg"


*/
//const dimensions = createDimensions('1280', '720');

//const dimensions = createDimensions('310', '270');
//var a = || {}
                //asMask: true, //use this to false if u want to render normally

/*
    1. over lay 3 letter title    
    2. loop thru mappings from whisperx generated sequences that has ts/duration and imgs/vids
    3. in each seq, calc duration, and calculate image timings for each n vid for each n adjust, add transitions for each
    3. while looping, if video, show video, with images as base of 2 seconds
*/                

const finalJSON = {
    dimensions: dimensions,
    mute: 'false',
    sequences: [
        {   
            type: 'text',
            text: summary.shortTitle,
            asMask: true,
            options: {
               
            }
        },
        {
            type: 'image',
            options: {
                ...genericImgOps({ s: "/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/examples/assets/imgs/dragon.png", d:3 }, dimensions),
            }
        },
        {
            type: 'transition',
        },
        {
            type:'text',
            text: "pratheesh init ",
        },
        {
            type: 'video',
            options: {
                ...genericVidOps({ s: "https://cos.mirav.cn/player/pic_oceans.mp4" }, dimensions),
            },
            animations: [
                { time: '0.5', delay: '5', from: { scale: '1' }, to: { scale: '0.2', y: '150', x: '250' } },
                { time: '0.5', delay: '9', from: { x: '50' }, to: { x: '-300' } },
            ],
            textElements: [{
                text: 'OCEAN',
                animate: true,
                asMask: 'true',
                options:{
                    start: '3'
                }
                
            },{
                text:"pratheesh later",
                bottom:true,
                options: {
                    start: "4",
                }
            }],
        },
        

       
    ]
};




/*
 {
            type: 'audio',
            options: {
                ... genericAudioOps({ 
                    s: 'https://cos.mirav.cn/player/ReadyGo.mp3',
                    d: '13'
                }),

            }
        },

*/
let generatedJson = generateJSONFromSequences({
    summary,
    sequences: segments,
    dimensions,
    mute: true,
    canvas: canvasSeg
})
var mirmalCode = createMiraMLXML(generatedJson)//finalJSON);

var trynew = `<miraml author="Pratheesh PM" name="Composite">
<canvas width="720" height="1280" mute="true">
    <spine>
        <image zIndex="2" x="50vw" y="50vh" height="100vh" width="100vw" src="https://akm-img-a-in.tosshub.com/sites/ichowk/fb_feed_images/story_image/202006/rahul-modi-1820_062120105851.jpg" duration="1" ss="undefined" loop="false" audio="true" preload="true">
            <text duration="3" fontFamily="https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf" x="50vw" fontSize="15rpx" color="#FFF" y="25vh">
                <content>Notice to Rahul</content>
                <stroke color="#FFF" size="5%"/>
                <animate time="2" delay="2">
                    <from scale="1"/>
                    <to scale="30" y="1500"/>
                </animate>
            </text>
        </image>
        <trans duration="1" key="fadecolor"/>
        <image zIndex="2" x="101rpx" y="180rpx" height="365rpx" width="205rpx" src="https://c.ndtvimg.com/2019-04/30j0preo_rahul-gandhi_625x300_16_April_19.jpg" duration="1" ss="undefined" loop="false" audio="true" preload="true"/>
        
    </spine>
</canvas>
</miraml>`
// <image x="75vw" y="85vh" width="160rpx" height="190rpx"  : vtuber

var working = `<miraml version="1.1" author="Pratheesh PM" name="Composite">
<canvas width="720" height="1280" mute="true">
  <spine>
    <video zIndex="2" x="50vw" y="42vh" height="85vh" width="100vw" src="/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/dh_hackathon/youtubevids/qHt3WuGENXo.mp4" duration="10" ss="undefined" loop="false" audio="true" preload="true" srcType=".JPEG">
        <text fontSize="100rpx" color="#FFF" x="50vw" y="50vh" lineHeight="90%" fontFamily="https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf" asMask="true" duration="1" refId="5a6z6n0f366ueeho">
            <content>OCEAN</content>
            <stroke color="#FFF" size="5%"></stroke>
            <animate time="2" delay="2">
                <from scale="1"></from>
                <to scale="30" y="1500"></to>
            </animate>
        </text>
        <text fontSize="80rpx" color="#FFF" x="50vw" y="50vh" lineHeight="90%" letterSpacing="10%" fontFamily="https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf" duration="1" start="1" refId="u6gqbzhjqojtc274">
            <content>Ready?</content>
            <stroke color="#FFF" size="5%"></stroke>
            <shadow color="#1FB0F9" alpha="1" offset="5%"></shadow>
        </text>
        <animate time="0.5" delay="5">
            <from scale="1"></from>
            <to scale="0.2" y="150" x="250"></to>
        </animate>
        <animate time="0.5" delay="9">
            <from x="50"></from>
            <to x="-300"></to>
        </animate>
    </video>
    <video zIndex="2" x="50vw" y="50vh" height="100vh" width="100vw" src="/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/dh_hackathon/youtubevids/pJM6v2E0qXU.mp4" duration="10" ss="undefined" loop="false" audio="true" preload="true" srcType=".JPEG">
      <text duration="3" fontFamily="https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf" x="50vw" fontSize="15rpx" color="#FFF" y="25vh">
        <content>Notice to Rahul</content>
        <stroke color="#FFF" size="5%"></stroke>
        <animate time="2" delay="2">
          <from scale="1" y="320"></from>
          <to scale="30" y="1500"></to>
        </animate>
      </text>
    </video>
  </spine>
</canvas>
</miraml>`
//console.log(createMiraMLXML(finalJSON))
/*
<video loop="false" audio="true" x="50vw" y="42vh" width="100vw" height="85vh" src="/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/dh_hackathon/youtubevids/qHt3WuGENXo.mp4" refId="kyzs9u4wksvh9t26"></video>
    <video loop="false" audio="true" x="75vw" y="85vh" width="160rpx" height="190rpx" src="/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/dh_hackathon/youtubevids/qHt3WuGENXo.mp4" refId="qf8tisgf2409g2t8">
      <effect name="zoomOutDown" time="1" delay="2"></effect>
    </video>
    
*/

/*
subtitle:
 <text duration="6" backgroundColor="#F8E54D" fontSize="25rpx" color="#000" x="50vw" y="70vh" lineHeight="120%" letterSpacing="10%" fontFamily="https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf" refId="20kw7sr7zbtvwo0d">
                <text wrap="true" width="40vw" fontSize="20rpx" color="#FFF" x="30vw" y="87vh" fontFamily="https://cos.mirav.cn/fonts/FangZhengFangSong.ttf" refId="2pojgv3mroqqfcfk">
                <content>Pratheesh and Prajwal slakdfdaslfja kjsld fdslafja</content>
                <stroke color="#111111" size="10%"></stroke>
                <effect name="zoomInDown" time="1" delay="2"></effect>
                </text>
            </text>

vtuber:
<video  loop="false" audio="true" x="75vw" y="85vh" width="160rpx" height="190rpx" src="/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/dh_hackathon/youtubevids/dFNPr7nUsl8.mp4" refId="qeh5x0yocqeg3tx8">
            </video>            
*/

/*

*/

var vtuber = `<miraml version="1.1" author="ZhaoJun" name="Hiring Ad(9:16)">
<canvas width="720" height="1280" refId="23bcn2vjosdd50mo"  mute="true">
    <spine>
        <video loop="false" duration="11" audio="false" x="50vw" y="50vh" width="100vw" height="100vh" src="/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/dh_hackathon/youtubevids/yK4ueI-i4Mk.mp4" refId="kyzs9u4wksvh9t26">
        </video>
        <trans duration="1" key="fadecolor"></trans>
        <video loop="false" duration="7" audio="false" x="50vw" y="50vh" width="100vw" height="100vh" src="/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/dh_hackathon/youtubevids/dFNPr7nUsl8.mp4" refId="kyzs9u4wksvh9t26">
        </video>
        <trans duration="1" key="fadecolor"></trans>
        <video loop="false" duration="5" audio="false" x="50vw" y="50vh" width="100vw" height="100vh" src="/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/dh_hackathon/youtubevids/VXEwxH7_R1c.mp4" refId="kyzs9u4wksvh9t26">
        </video>
     </spine>  
     <video  loop="false" audio="false" x="80vw" y="90vh" width="160rpx" height="185rpx" src="/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/examples/assets/vtuber/3vTuber_nobg.mp4" refId="qeh5x0yocqeg3tx8">
    </video>   
    
</canvas>
</miraml>`
//toCanvas = 
async function someAsyncFunction(mirmalCode) {
    console.log(mirmalCode)
    //mirmalCode = trynew
    // Assuming `burn` is an asynchronous function that returns a promise
    try {
        //  await burn({value, cacheDir, outputDir: path.dirname(miraml_file)});
        console.log("Burning started!!")
        //await burn && burn({ value: vtuber, cacheDir, outputDir: outputDir });
        //console.log('Burn completed successfully.');
    } catch (error) {
        console.error('Error during burn:', error);
    }
}

// Call the asynchronous function
setTimeout(()=>{
    //someAsyncFunction(mirmalCode);
}, 1000)
//await burn({value:JSON.stringify(finalJSON, null, 2), cacheDir, outputDir: outputDir});
//console.log(JSON.stringify(finalJSON, null, 2));

module.exports = {
    addCalculations,
    someAsyncFunction,
    generateJSONFromSequences,
    addVideoDuration,
    createDimensions,
    createMiraMLXML
}