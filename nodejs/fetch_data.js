const axios = require('axios');
const { fetchMinimumDetails } = require('./json_formatter');
const { createClient } = require('pexels');
const {fetchShortsNDownloadRelevant} = require('./shorts');
var _ = require('underscore');
const cheerio = require('cheerio');
_.mixin(require('./mixins'));

const NO_OF_PICS = 5;
const NO_OF_VIDS = 4;

const HEADERS = { 
  'Accept': 'application/json', 
  'Accept-Language': 'en-IN,en-GB;q=0.9,en;q=0.8,en-US;q=0.7', 
  'Connection': 'keep-alive', 
  'Content-Type': 'application/json', 
  'Origin': 'http://127.0.0.1:8081', 
  'Referer': 'http://127.0.0.1:8081/', 
  'Sec-Fetch-Dest': 'empty', 
  'Sec-Fetch-Mode': 'cors', 
  'Sec-Fetch-Site': 'same-origin', 
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0', 
  'sec-ch-ua': '"Microsoft Edge";v="119", "Chromium";v="119", "Not?A_Brand";v="24"', 
  'sec-ch-ua-mobile': '?0', 
  'sec-ch-ua-platform': '"macOS"'
}

const PYTHON_BE = "http://localhost:8081";

const SUMMARY_URL = "/api/generate"
const IMG_GEN_URL = "/api/create_get_image"
const ASSETS_URL = "/api/assets"
const NEWS_BE_URL = "https://pwa-api.dailyhunt.in/api/v100/detailsdirect/"

const client = createClient('m2gJtVjXIWiQoyV7ijzAduVo2TZAqJuJJFlf7bH7VwN6s4NcggtO97cg');

function extractNameFromUrl (url, pattern ) {
    url = url || "https://www.pexels.com/video/video-of-forest-1448735/";
    pattern = pattern || /https:\/\/www\.pexels\.com\/video\/([^0-9]+)/;
    // Extract text after "https://www.pexels.com/video/" without numbers
    const match = url.match(pattern);

    if (match && match[1]) {
        const extractedText = match[1];
        console.log("Extracted Text:", extractedText.replaceAll('-',' '));
        return extractedText && extractedText.replaceAll('-',' ');
        
    } else {
         console.log("No match found.");
    }
}

async function fetchNews({id, lang = 'en',}){
  try {
    id = id || "n559195996";
    lang = lang || 'en';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${NEWS_BE_URL}${id}?langCode=${lang}&edition=india&breakCache=761&ignoreTopics=true`,
      headers: {
        'surpasscookie': 'deviceInfoV1="cid=c1_d1_a1_1932624631&appver=4.0.86&platf=pwa"; Version=1; Domain=.dailyhunt.in; Max-Age=0; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/; HttpOnly,nhLocationInfoV1=%7B%7D; Domain=.dailyhunt.in; Expires=Mon, 21-Nov-2033 07:03:02 GMT; Path=/; HttpOnly,nhUserProfileV1=%7B%22segmentVersion%22%3A%22968%22%2C%22acr%22%3Afalse%7D; Domain=.dailyhunt.in; Expires=Mon, 21-Nov-2033 07:03:02 GMT; Path=/; HttpOnly,nhClientInfoV1=%7B%22clientId%22%3A%22c1_d1_a1_1932624631%22%2C%22udid%22%3A%22pwa_4739b8f0-639b-11ee-833f-a96bd9058fed%22%2C%22device%22%3A%22pwa%22%2C%22width%22%3A0%2C%22height%22%3A0%2C%22appVersion%22%3A%224.0.86%22%2C%22primaryLanguage%22%3A%22en%22%2C%22osVersion%22%3A%226.0%22%2C%22appId%22%3A%22in.dailyhunt.pwa%22%2C%22featureMask%22%3A268708281%2C%22featureMaskV1%22%3A4429186048%2C%22dimension%22%3A%22M%22%2C%22edition%22%3A%22india%22%2C%22appLanguage%22%3A%22en%22%2C%22count%22%3A0%2C%22buzzDpi%22%3A%22m%22%2C%22component%22%3A%22pwa%22%2C%22platformOS%22%3A%22android%22%2C%22isEncryptedDeviceIds%22%3Afalse%2C%22lastHandshakeTime%22%3A1700809382817%2C%22hcid%22%3A%220x510e885b068844ca%22%7D; Domain=.dailyhunt.in; Expires=Mon, 21-Nov-2033 07:03:02 GMT; Path=/; HttpOnly,nhCdnInfoV1=%22d%2FPWA%2Fav%2F4.0.86%2Ffm%2F268708281%2Ffm1%2F4429186048%2F%2Fv2%2Faid%2FDH_APP%2Frs%2F1%22; Domain=.dailyhunt.in; Expires=Mon, 21-Nov-2033 07:03:02 GMT; Path=/; HttpOnly,nhLangInfoV1=%22en%7Cen%22; Domain=.dailyhunt.in; Expires=Mon, 21-Nov-2033 07:03:02 GMT; Path=/; HttpOnly,nhAbTestSegment=%22ab_YourCityTab%3Atrue%2Cfeed_content_url%3AALPHA%2Cab_NewsStickyType%3ATYPE1%2Cab_NotifSeg%3AG3%2Cab_DNSFallBack%3ABETA%22; Domain=.dailyhunt.in; Expires=Mon, 21-Nov-2033 07:03:02 GMT; Path=/; HttpOnly,wsConfig=%22ib%2Fb%2Fvb%2Fb%22; Domain=.dailyhunt.in; Expires=Mon, 21-Nov-2033 07:03:02 GMT; Path=/; HttpOnly,dcl=%22%22; Domain=.dailyhunt.in; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/; HttpOnly,constInfoV1=%7B%7D; Domain=.dailyhunt.in; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/; HttpOnly'
      }
    };

    const response = await axios.request(config);
    const reqd = fetchMinimumDetails(response.data);
    return reqd;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return {}; // Return an empty object in case of an error
  }
}

async function fetchNewsSummaryAssets({id, lang = 'en', getsummary = false, getassets = false}) {
    try {
      const reqd = await fetchNews({id, lang, getsummary, getassets});

      if(!getassets){
       // return reqd; // Return the fetched data without summary
      }
  
      try {
        const summaryResponse = await fetchSummary({ news: reqd.completeContent || '', id, lang });

        let summaryObj = {};
        if (summaryResponse) {
          try {
            summaryObj = JSON.parse(summaryResponse.data.messages[0]['content']);
          } catch (error) {
            console.error("Error parsing summary JSON:", error);
          }
        }
        //const assetsResponse = await fetchAssets({ id, title: reqd.title, lang, summaryObj });
        const shorts = await fetchShortsNDownloadRelevant({ id, query: reqd.title});

        return { ...reqd, summaryObj, shorts}; //assets: assetsResponse };
      } catch (error) {
        console.error("Error fetching news data:", error);
        return reqd; // Return an empty object in case of an error
      }
     
      //console.log("🚀 ~ file: fetch_data.js:19 ~ reqd:", reqd);
      
  
    } catch (error) {
      console.error("Error fetching news data:", error);
      return {}; // Return an empty object in case of an error
    }
}

async function fetchSummary({id, news , lang = 'en'}) {
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        data: JSON.stringify({
          id : id || '',
          "prompt": `/summarize ${news}`
        }),
        headers:  HEADERS,
        url: `${PYTHON_BE}${SUMMARY_URL}`
      }
  
  
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error("Error fetching news data:", error);
      return {}; // Return an empty object in case of an error
    }
}


async function fetchImageByPrompt({title}) {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        headers:  HEADERS,
        url: `${PYTHON_BE}${IMG_GEN_URL}?prompt=${title}`
      }
      console.log("\n\n\n gonnna make call-->", `${PYTHON_BE}${IMG_GEN_URL}?prompt=${title}`)
      const response = await axios.request(config);
      console.log("🚀 ~ file: fetch_data.js:145 ~ fetchImageByPrompt ~ response:", response)
      return response.data;
    } catch (error) {
      console.error("Error fetching news data:", error);
      return {}; // Return an empty object in case of an error
    }
}



//for getting python code images and youtube links
async function fetchAssets({id,title, lang = 'en', summaryObj}) {
  try {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      headers:  HEADERS,
      data: JSON.stringify({
        summary: summaryObj && summaryObj.summary || ''
      }),
      url: `${PYTHON_BE}${ASSETS_URL}?query=${title}`
    }


    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return {}; // Return an empty object in case of an error
  }
}

  
  // Example: Print the fetched news data
  async function printFetchedNewsData() {
    try {
      const fetchedNewsData = await fetchNewsData();
      console.log("Fetched News Data:", fetchedNewsData);
    } catch (error) {
      console.error("Error printing fetched news data:", error);
    }
  }
  
  // Call the example function
//  printFetchedNewsData();
  

async function fetchPixelImgs({ query, orientation, page, size }) {
    try {
      query = query || 'Nature';
  
      const photos = await client.photos.search({
        query,
        per_page: NO_OF_PICS || 3,
        orientation: orientation || 'portrait', // landscape, portrait or square
        size: size || 'large',
        page: page || 1,
      });
  
      console.log("photos:", photos);
  
      let images = [];
      photos && photos.photos && photos.photos.forEach(photo => {
        let reqdFields = _.pick(photo, 'alt', 'avg_color', 'height', 'width', 'url', 'src','id');
        reqdFields.urlMedium = reqdFields.src && reqdFields.src['medium'];
        reqdFields.urlLarge = reqdFields.src && reqdFields.src['large'];
        reqdFields.urlXLarge = reqdFields.src && reqdFields.src['large2x'];
        reqdFields.url = reqdFields.Large || reqdFields.urlMedium || reqdFields.urlXLarge;
        images.push(reqdFields);
      });
  
      console.log("images:", images);
      // large2x, large, medium
  
      return images; // Return the images array
  
    } catch (error) {
      console.error("Error fetching images:", error);
      return []; // Return an empty array in case of an error
    }
}
  
  // Example: Print the fetched images
 async function printFetchedImages() {
    try {
      const fetchedImages = await fetchPixelImgs({ query : "Election exit poll"});
      console.log("Fetched Images:", fetchedImages);
    } catch (error) {
      console.error("Error printing fetched images:", error);
    }
  }
  

async function fetchPixelVids({ query, orientation, page, size }) {
    try {
      query = query || 'Nature';
  
      const videocollection = await client.videos.search({
        query,
        per_page: NO_OF_VIDS || 3,
        orientation: orientation || 'portrait', // landscape, portrait or square
        size: size || 'large',
        page: page || 1,
      });
  
      console.log("photos:", videocollection);
  
      let videos = [];
      videocollection && videocollection.videos && videocollection.videos.forEach(vid => {
        console.log(vid)
        let reqdFields = _.pick(vid, 'tags', 'avg_color', 'height', 'width', 'url', 'video_files','duration');
        if(reqdFields && reqdFields.video_files) {
          var urlLarge, urlMedium;  
          const sortedArray = reqdFields.video_files.sort((a, b) => b.height - a.height);

          sortedArray.forEach((v)=>{
                if(v.height >= 1280){
                    urlLarge = v
                    return;
                }
          })
          sortedArray.forEach((v)=>{
                if(v.height >= 960){
                    urlMedium = v
                    return;
                }
          })
          reqdFields = _.omit(reqdFields, 'video_files');
          videos.push({
            ...reqdFields,
            urlLarge,
            urlMedium,
            alt: reqdFields.url && extractNameFromUrl(reqdFields.url),
            url:(urlLarge || urlMedium).link
          })
        }
      });
  
      console.log("videos:", videos);
      // large2x, large, medium
  
      return videos; // Return the images array
  
    } catch (error) {
      console.error("Error fetching images:", error);
      return []; // Return an empty array in case of an error
    }
}

async function printFetchedVids() {
    try {
      const fetchedVids = await fetchPixelVids({ query : "Election exit poll"});
      console.log("\n\n\n\n\n\n\nFetched VIds:", fetchedVids);
    } catch (error) {
      console.error("Error printing fetched vids:", error);
    }
}

  


module.exports = {
    fetchMinimumDetails,
    fetchPixelImgs,
    fetchPixelVids,
    fetchNewsSummaryAssets,
    fetchSummary,
    fetchNews,
    fetchImageByPrompt,
}
