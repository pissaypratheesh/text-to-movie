const axios = require('axios');
const cheerio = require('cheerio');

function extractBingImages(html) {
  const pattern = /mediaurl=(.*?)&amp;.*?expw=(\d+).*?exph=(\d+)/g;
  const matches = html.matchAll(pattern);
  const result = [];

  for (const match of matches) {
    const [_, url, width, height] = match;
    if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg')) {
      result.push({ 'url': decodeURIComponent(url), 'width': parseInt(width), 'height': parseInt(height) });
    }
  }

  return result;
}


function extractBingVideos(html) {
    const pattern = /mediaurl=(.*?)&amp;.*?expw=(\d+).*?exph=(\d+)/g;
    const matches = html.matchAll(pattern);
    const result = [];
  
    for (const match of matches) {
      const [_, url, width, height] = match;
      if (url.endsWith('.mp4') || url.endsWith('.avi') || url.endsWith('.mov')) {
        result.push({ 'url': decodeURIComponent(url), 'width': parseInt(width), 'height': parseInt(height) });
      }
    }
  
    return result;
  }

function extractGoogleImages(html) {
  const images = [];
  const regex = /AF_initDataCallback\({key: 'ds:1', hash: '2', data:(.*?), sideChannel: {}}\);/;
  const match = html.match(regex);

  if (match) {
    const dz = JSON.parse(match[1]);
    for (const c of dz[56][1][0][0][1][0]) {
      try {
        const thing = Object.values(c[0][0])[0];
        images.push(thing[1][3]);
      } catch (error) {
        // Ignore parsing errors
      }
    }
  }

  return images;
}

async function getBingImages(query, retries = 5) {
  query = query.replace(" ", "+");
  let images = [];
  let tries = 0;

  while (images.length === 0 && tries < retries) {
    try {
      const response = await axios.get(`https://www.bing.com/images/search?q=${query}&first=1`);
      if (response.status === 200) {
        images = extractBingImages(response.data);
      } else {
        throw new Error(`Error while making bing image searches: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error.message);
    }

    tries++;
  }

  if (images.length > 0) {
    return images;
  }

  throw new Error("Error while making bing image searches");
}

// this is not working
async function getBingVideos(query, retries = 5) {
  query = query.replace(" ", "+");
  let videos = [];
  let tries = 0;

  while (videos.length === 0 && tries < retries) {
    try {
      const response = await axios.get(`https://www.bing.com/videos/search?q=${query}&first=1`);
      let resStatus = response.status || response.statusCode
      console.log("🚀 ~ file: assets_scraper.js:75 ~ getBingVideos ~ response:", resStatus)
      if (resStatus === 200) {
        videos = extractBingVideos(response.data);
      } else {
        throw new Error(`Error while making bing video searches: ${response}`);
      }
    } catch (error) {
      console.error(error.message);
    }

    tries++;
  }

  if (videos.length > 0) {
    return videos;
  }

  throw new Error("Error while making bing video searches");
}

// Example usage
async function main() {
  try {
    const q = 'elephant with tortoise'
    // const bingImages = await getBingImages(q);
    // console.log('Bing Images:', bingImages);

    const bingVideos = await getBingVideos(q);
    console.log('Bing Videos:', bingVideos);
  } catch (error) {
    console.error(error.message);
  }
}

//main();


module.exports = {
    getBingImages,
}