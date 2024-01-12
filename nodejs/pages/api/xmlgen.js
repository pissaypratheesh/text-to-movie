import {addCalculations, addVideoDuration, createDimensions,createMiraMLXML,generateJSONFromSequences} from "../../xml_generator/jsonGenerator"

import { data, segments, defaultImgs } from "../../xml_generator/dummydata"
/*
{
    "start": 0.189,
    "end": 2.071,
    "text": " Happy New Year 2024, y'all!",
    "words": [
      {
        "word": "Happy",
        "start": 0.189,
        "end": 0.449,
        "score": 0.933
      },
      
    ],
    "index": 0,
    "line": " Happy New Year 2024, y'all!",
    "assetsEnd": 2.731,
    "selectedImgs": [
      {
        "url": "https://png.pngtree.com/png-clipart/20220923/original/pngtree-colorful-happy-new-year-2024-in-hanging-style-png-image_8628660.png",
        "width": 474,
        "height": 474,
        "src": "https://png.pngtree.com/png-clipart/20220923/original/pngtree-colorful-happy-new-year-2024-in-hanging-style-png-image_8628660.png",
        "i": 0,
        "isSelected": true,
        "q": " Happy New Year 2024, y'all!"
      }
    ],
    "selectedVids": [
      {
        "title": "Happy New Year 2024 🥳 WhatsApp Status #whatsappstatus #shorts #ytshorts #newyear",
        "thumbnail": "https://i.ytimg.com/vi/kPDjdBaCqZ8/hq720.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4AbYIgAKAD4oCDAgAEAEYfyA6KBowDw==&rs=AOn4CLCjzo2d-I78IOP89e_ADsmlnLrY_A",
        "videoId": "kPDjdBaCqZ8",
        "link": "https://www.youtube.com/shorts/kPDjdBaCqZ8",
        "src": "https://i.ytimg.com/vi/kPDjdBaCqZ8/hq720.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4AbYIgAKAD4oCDAgAEAEYfyA6KBowDw==&rs=AOn4CLCjzo2d-I78IOP89e_ADsmlnLrY_A",
        "i": 1,
        "thumbnailWidth": 320,
        "thumbnailHeight": 180,
        "vidIndex": 1,
        "scaledHeight": 180,
        "scaledWidth": null,
        "viewportWidth": null,
        "marginLeft": 0,
        "isSelected": true,
        "index": 0
      },

    ]
  }
*/


function scaleImageToFitScreen(originalWidth, originalHeight, screenWidth, screenHeight) {
  // Calculate aspect ratios
  const aspectRatioImage = originalWidth / originalHeight;
  const aspectRatioScreen = screenWidth / screenHeight;

  let scaledWidth, scaledHeight;

  if (aspectRatioImage > aspectRatioScreen) {
      // Image is wider than the screen, scale based on width
      scaledWidth = screenWidth;
      scaledHeight = screenWidth / aspectRatioImage;
  } else {
      // Image is taller than or equal to the screen, scale based on height
      scaledHeight = screenHeight;
      scaledWidth = aspectRatioImage * screenHeight;
  }

  // Return an object with the scaled dimensions
  return {
      width: scaledWidth,
      height: scaledHeight
  };
}


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data } = req.body;
    const dimensions = createDimensions('720','1280');
    let segmentedData = data.segments || [...segments];
    let processedSegments = [];
    // Have to add default assets if not there, if image then add, if video then repeat as per the clips
    segmentedData.forEach((segment) => {
      segment.actualEnd = segment.end;
      segment.end = segment.assetsEnd;
      segment.images = segment.selectedImgs;
      segment.videos = segment.selectedVids;

      // If no assets added, add the default imgs/vids, or else process the added vids/imgs
      if(!segment.images && !segment.videos){
        segment.images = defaultImgs;
        segment.images.forEach((img) => {
          if(img.height && img.width){
            let {width, height} = scaleImageToFitScreen(img.width, img.height,dimensions.w , dimensions.h);
            console.log("\n\n\n\n🚀 ~ file: xmlgen.js:104 ~ segment.images.forEach ~ width, height:",img, img.height, img.width,width, height)
            img.w = Math.ceil(width) + 'px';
            img.h = Math.ceil(height) + 'px';
          }
        })
        processedSegments.push(segment);
      }else{
        if(segment.images){
          segment.images.forEach((img) => {
            if(img.height && img.width){
              let {width, height} =  scaleImageToFitScreen(img.width, img.height,dimensions.w , dimensions.h);
              console.log("\n\n\n\n🚀 ~ file: xmlgen.js:104 ~ segment.images.forEach ~ width, height:",img, img.height, img.width,width, height)
              img.w = Math.ceil(width) + 'px';
              img.h = Math.ceil(height) + 'px';
            }
          })
        }
        if(segment.videos){
          segment.videos.forEach((vid) => {
            if(vid.clips && vid.clips.length){
              vid.clips.forEach((clip) => {
                let cliptime = clip.split('-');
                let start = cliptime[0];
                let end = cliptime[1];
                let duration = end - start;
                let vidClone = {...vid};
                vidClone.duration = duration;
                vidClone.ss = start;
                let segmentClone = {...segment};
                segmentClone.videos = [vidClone];
                processedSegments.push(segmentClone);
              })
            }else{
              // vid.duration = segment.end - segment.start;
              // vid.d = vid.duration;
              processedSegments.push({...segment, videos: [vid]});
            }
          })
        }
        processedSegments.push(segment);
        // EACH SEGMENT OF LINE CAN HAVE MULTIPLE SEGMENTS OF IMGS/VIDS, SO EXPAND THEM INTO EACH SEGMENTS
        
      }
    })

    let segmentsData = addCalculations(processedSegments);

    let generatedJson = generateJSONFromSequences({
      summary: data,
      sequences: segmentsData,
      dimensions,
      mute: true,
    })

    let xmlgen = createMiraMLXML(generatedJson);
    console.log("\n\n\n\n🚀 ~ file: xmlgen.js:118 ~ handler ~ xmlgen:", xmlgen)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({xmlgen, jsongen: generatedJson});
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
