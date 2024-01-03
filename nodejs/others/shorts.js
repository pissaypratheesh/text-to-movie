const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const ytdl = require('ytdl-core');
const readline = require('readline');
const path = require('path');
var _ = require('underscore');
const { fileExists } = require('../utils');
_.mixin(require('../mixins'));

async function fetchRelevantShorts(shorts) {
  return new Promise((resolve, reject) => {
    // pick first 4 and send
    const relevantShorts = shorts.slice(0, 4);
    // TODO: send these to py SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2') for picking
    // send relevantShorts to the desired destination
    resolve(relevantShorts);
  });
}

function determineAspectRatio(json) {
  // Assuming the first thumbnail is the default one
  const defaultThumbnail = json.thumbnail.thumbnails[0];
  console.log("\n\n\n\n🚀 ~ file: shorts.js:24 ~ determineAspectRatio ~ defaultThumbnail:", json.videoId, json.title,defaultThumbnail)

  // Check if the aspect ratio is closer to 9:16 or 16:9
  const aspectRatio = defaultThumbnail.width / defaultThumbnail.height;

  if (aspectRatio > 1) {
    return "16:9";
  } else {
    return "9:16";
  }
}

function checkForShorts(json){
  /*
   "navigationEndpoint": {
    "clickTrackingParams": "CEAQnaQHGBIiEwic8_akl-mCAxXHxHMBHZnCA1I=",
    "commandMetadata": {
      "webCommandMetadata": {
        "url": "/shorts/v9WDMO_MFIc",
        "webPageType": "WEB_PAGE_TYPE_SHORTS",
  */
  if(_.at(json,'navigationEndpoint.commandMetadata.webCommandMetadata.webPageType') === 'WEB_PAGE_TYPE_SHORTS'){
      return true
  }
}


async function fetchShorts(query) {
  const url = `https://www.youtube.com/results?search_query=shorts+reels+${encodeURIComponent(query)}`;
  const response = await axios.get(url);
  console.log("🚀 ~ file: shorts.js:13 ~ fetchShorts ~ url:", url)
  const html = response.data;
  const $ = cheerio.load(html);
  const scripts = $('script');

  let ytInitialData = null;

  scripts.each((index, element) => {
    const scriptContent = $(element).html();
    const ytInitialDataMatch = scriptContent.match(/var ytInitialData = (.*);/);

    if (ytInitialDataMatch) {
      ytInitialData = JSON.parse(ytInitialDataMatch[1]);
    }
  });

  if (ytInitialData) {
    //const shorts = _.at(ytInitialData,'contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents.0.itemSectionRenderer.contents');
    const shorts = ytInitialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0]['itemSectionRenderer']['contents'];
    const hasVideoRenderer = shorts.some(obj => 'videoRenderer' in obj);

    if(hasVideoRenderer){
      let result = []
      for (const obj of shorts) {
        const { videoRenderer } = obj;
        //console.log("\n\n\n\n\n\n🚀 ~ file: shorts.js:50 ~ fetchShorts ~ videoRenderer:", JSON.stringify(videoRenderer))
        if(videoRenderer && checkForShorts(videoRenderer)) {
          result.push({ 
            title: _.at(videoRenderer,'title.runs.0.text'), 
            thumbnail: _.at(videoRenderer,'thumbnail'), 
            videoId: _.at(videoRenderer,'videoId'),
            link:  _.at(videoRenderer,'navigationEndpoint') && _.at(videoRenderer.navigationEndpoint,'commandMetadata.webCommandMetadata.url') ? `https://www.youtube.com${_.at(videoRenderer.navigationEndpoint,'commandMetadata.webCommandMetadata.url')}` : `https://www.youtube.com/shorts/${videoRenderer.videoId}` 
          });
        }
      }
      return result;
    }
    const reelShelfRendererArray = shorts.filter((obj) => "reelShelfRenderer" in obj)
    let result = []
    for (const obj of reelShelfRendererArray) {
        const { reelShelfRenderer } = obj;
        const { items } = reelShelfRenderer;

        for (const item of items) {
            const { reelItemRenderer } = item;
            //console.log("\n\n\n\n\n\n🚀 ~ file: shorts.js:50 ~ fetchShorts ~ videoRenderer:", JSON.stringify(reelItemRenderer))
            if(reelItemRenderer && checkForShorts(reelItemRenderer)) {
              const {
                  headline,
                  navigationEndpoint,
                  thumbnail,
                  videoId,
                  inlinePlaybackEndpoint
              } = reelItemRenderer;

              result.push({ 
                title: headline && headline['simpleText'], 
                thumbnail, 
                videoId,
                longLink: `https://www.youtube.com${_.at(inlinePlaybackEndpoint,'commandMetadata.webCommandMetadata.url')}`,
                link: _.at(navigationEndpoint,'commandMetadata.webCommandMetadata.url') ? `https://www.youtube.com${_.at(navigationEndpoint,'commandMetadata.webCommandMetadata.url')}` : `https://www.youtube.com/shorts/${videoId}` 
              });
            }
        }
    }
    return result;
  } else {
    throw new Error('ytInitialData not found');
  }
}

async function downloadShorts(shortid){
    const url = 'https://www.youtube.com/shorts/' + shortid;
    console.log("🚀 ~ file: shorts.js:66 ~ downloadShorts ~ url:", url)
    //console.log("🚀 ~ file: shorts.js:6 ~ streamshorts:", JSON.stringify(streamshorts))


    const output = path.resolve(__dirname, `./youtubevids/${shortid}.mp4`);
    if(fileExists(output)){
      return Promise.resolve({"Success": "Downloaded", alreadyExists : 'true',path:output }); 
    }

    console.log("🚀 ~ file: shorts.js:72 ~ downloadShorts ~ output:", output)
    const video = ytdl(url);
    let starttime;
    video.pipe(fs.createWriteStream(output));
    video.once('response', () => {
        starttime = Date.now();
    });
    video.on('progress', (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
        const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
        process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
        process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
        process.stdout.write(`, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `);
        readline.moveCursor(process.stdout, 0, -1);
    });
    // video.on('end', () => {
    //     process.stdout.write('\n\n Successfully downloaded');
    //     return cb({"Success":"Downloaded"})
    // });
    return new Promise((resolve, reject) => {
      video.on('end', () => {
          process.stdout.write('\n\n Successfully downloaded');
          resolve({"Success": "Downloaded",path: output});
      });
      video.on('error', (error) => {
          reject(error);
      });
  });
   
}

async function downloadMultipleShorts (ids){
  try {
    if (!ids || !Array.isArray(ids)) {
        return { error: 'Invalid request body' };
    }

    // Process the IDs in parallel
    const results = await Promise.all(ids.map(async (id) => {
        return await downloadShorts(id);
    }));

    return results;
  } catch (error) {
      console.error('Error:', error);
      return { error: 'Internal Server Error' };
  }
}


async function fetchShortsNDownloadRelevant({query,id}){
  //call to fetchShorts, get the relevant shorts and then download them in parallel
  const scrapedShorts = await fetchShorts(query);
  const relevantShort = await fetchRelevantShorts(scrapedShorts);
  const ids = relevantShort.map(short => short.videoId);
  const downloadResults = await downloadMultipleShorts(ids);
  return {
    relevantShort,
    downloadResults,
    ids,
  }
}


module.exports = { fetchShorts,downloadShorts, downloadMultipleShorts, fetchShortsNDownloadRelevant };


// below is experimental

(async () => {
    try {

      let result = await fetchShorts("narendra modi and rahul gandhi");

        console.log(JSON.stringify(result));
        
      // Do something with the shorts data
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  })//();