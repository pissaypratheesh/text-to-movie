const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 9999;
const path = require('path');
const fs = require("fs");

const outputDir = path.join(__dirname, './public/assets/output/');
const cacheDir = path.join(__dirname, './cache/');
const { burn } = require('./burn.js')
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

var test = `<miraml author="Pratheesh PM" name="Composite">
<canvas width="720" height="1280" mute="true">
  <spine>
    <image zIndex="2" x="50vw" y="50vh" height="433px" width="720px" src="https://static.vecteezy.com/system/resources/previews/020/277/302/non_2x/happy-new-year-2024-greeting-card-design-template-end-of-2023-and-beginning-of-2024-the-concept-of-the-beginning-of-the-new-year-the-calendar-page-turns-over-and-the-new-year-begins-vector.jpg" duration="1.27" ss="0" loop="false" audio="true" preload="true" img_h="980" img_w="1633"/>
    <trans duration="1" key="fadecolor"/>
    <image zIndex="2" x="50vw" y="50vh" height="517px" width="720px" src="https://image.shutterstock.com/image-vector/happy-new-year-2024-design-260nw-1232224036.jpg" duration="1.27" ss="0" loop="false" audio="true" preload="true" img_h="280" img_w="390"/>
    <trans duration="1" key="fadecolor"/>
    <video line="AI is going to be lit this year, with Lama 3 dropping and open-source models catching up." zIndex="2" x="50vw" y="50vh" height="100vh" width="100vw" src="https://i.ytimg.com/vi/uW13BzNcy-k/hq720_2.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4Ac4FgAKACooCDAgAEAEYWCBdKGUwDw==&amp;rs=AOn4CLAltiSPy1gXDePpBhfV9Uu-rBW2JQ" duration="2.62" ss="0" loop="false" audio="false" preload="true"/>
    <image zIndex="2" x="50vw" y="50vh" height="405px" width="720px" src="https://www.citybiz.co/wp-content/uploads/2022/10/Lama-AI.png" duration="2.62" ss="0" loop="false" audio="true" preload="true" img_h="281" img_w="500"/>
    <trans duration="1" key="fadecolor"/>
    <video line="AI is going to be lit this year, with Lama 3 dropping and open-source models catching up." zIndex="2" x="50vw" y="50vh" height="100vh" width="100vw" src="https://i.ytimg.com/vi/La4PNTiZp8s/hq720.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4Ac4FgAKACooCDAgAEAEYfyBJKCowDw==&amp;rs=AOn4CLBn9KYynrsrdGpSASehnlpRVtQkug" duration="2.62" ss="0" loop="false" audio="false" preload="true"/>
    <image zIndex="2" x="50vw" y="50vh" height="405px" width="720px" src="https://www.citybiz.co/wp-content/uploads/2022/10/Lama-AI.png" duration="2.62" ss="0" loop="false" audio="true" preload="true" img_h="281" img_w="500"/>
    <trans duration="1" key="fadecolor"/>
    <video line="AI is going to be lit this year, with Lama 3 dropping and open-source models catching up." zIndex="2" x="50vw" y="50vh" height="100vh" width="100vw" src="https://i.ytimg.com/vi/uW13BzNcy-k/hq720_2.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4Ac4FgAKACooCDAgAEAEYWCBdKGUwDw==&amp;rs=AOn4CLAltiSPy1gXDePpBhfV9Uu-rBW2JQ" duration="1.75" ss="0" loop="false" audio="false" preload="true"/>
    <video line="AI is going to be lit this year, with Lama 3 dropping and open-source models catching up." zIndex="2" x="50vw" y="50vh" height="100vh" width="100vw" src="https://i.ytimg.com/vi/La4PNTiZp8s/hq720.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4Ac4FgAKACooCDAgAEAEYfyBJKCowDw==&amp;rs=AOn4CLBn9KYynrsrdGpSASehnlpRVtQkug" duration="1.75" ss="0" loop="false" audio="false" preload="true"/>
    <image zIndex="2" x="50vw" y="50vh" height="405px" width="720px" src="https://www.citybiz.co/wp-content/uploads/2022/10/Lama-AI.png" duration="1.75" ss="0" loop="false" audio="true" preload="true" img_h="281" img_w="500"/>
    <trans duration="1" key="fadecolor"/>
    <image zIndex="2" x="50vw" y="50vh" height="540px" width="720px" src="https://manofmany.com/wp-content/uploads/2022/10/Tesla-Optimus-Robot-768x576.jpg" duration="4.98" ss="0" loop="false" audio="true" preload="true" img_h="576" img_w="768"/>
    <trans duration="1" key="fadecolor"/>
    <image zIndex="2" x="50vw" y="50vh" height="540px" width="720px" src="https://manofmany.com/wp-content/uploads/2022/10/Tesla-Optimus-Robot-768x576.jpg" duration="3.70" ss="0" loop="false" audio="true" preload="true" img_h="576" img_w="768"/>
    <trans duration="1" key="fadecolor"/>
    <image zIndex="2" x="50vw" y="50vh" height="540px" width="720px" src="https://manofmany.com/wp-content/uploads/2022/10/Tesla-Optimus-Robot-768x576.jpg" duration="3.48" ss="0" loop="false" audio="true" preload="true" img_h="576" img_w="768"/>
    <trans duration="1" key="fadecolor"/>
    <image zIndex="2" x="50vw" y="50vh" height="360px" width="720px" src="https://scitechdaily.com/images/Human-or-Bot.jpg" duration="1.47" ss="0" loop="false" audio="true" preload="true" img_h="570" img_w="1140"/>
    <trans duration="1" key="fadecolor"/>
    <image zIndex="2" x="50vw" y="50vh" height="399px" width="720px" src="https://scitechdaily.com/images/Human-or-Bot.jpg" duration="1.47" ss="0" loop="false" audio="true" preload="true" img_h="1108" img_w="2000"/>
    <trans duration="1" key="fadecolor"/>
    <image zIndex="2" x="50vw" y="50vh" height="405px" width="720px" src="https://i.ytimg.com/vi/PHmz5ohbJig/maxresdefault.jpg" duration="1.47" ss="0" loop="false" audio="true" preload="true" img_h="720" img_w="1280"/>
    <trans duration="1" key="fadecolor"/>
    <image zIndex="2" x="50vw" y="50vh" height="720px" width="720px" src="https://miro.medium.com/v2/resize:fit:1024/1*wgVFkWMMOPVqYkhdGIesow.png" duration="1.75" ss="0" loop="false" audio="true" preload="true" img_h="474" img_w="474"/>
    <trans duration="1" key="fadecolor"/>
    <image zIndex="2" x="50vw" y="50vh" height="405px" width="720px" src="https://www.theinsaneapp.com/wp-content/uploads/2023/03/GPT-5.jpg" duration="1.75" ss="0" loop="false" audio="true" preload="true" img_h="720" img_w="1280"/>
    <trans duration="1" key="fadecolor"/>
    <video line="Get ready for a kick-ass AI year." zIndex="2" x="50vw" y="50vh" height="100vh" width="100vw" src="https://i.ytimg.com/vi/awnq-2Rc7-c/hq720_2.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4Ac4FgAKACooCDAgAEAEYRSBKKHIwDw==&amp;rs=AOn4CLB_s12udXXnM8gMzf_VRc54jUMR-g" duration="2" ss="1" loop="false" audio="false" preload="true"/>
    <image zIndex="2" x="50vw" y="50vh" height="905px" width="720px" src="https://images-na.ssl-images-amazon.com/images/I/815K9pHzYpL._SL1500_.jpg" duration="NaN" ss="0" loop="false" audio="true" preload="true" img_h="1500" img_w="1194"/>
    <trans duration="1" key="fadecolor"/>
    <video line="Get ready for a kick-ass AI year." zIndex="2" x="50vw" y="50vh" height="100vh" width="100vw" src="https://i.ytimg.com/vi/awnq-2Rc7-c/hq720_2.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4Ac4FgAKACooCDAgAEAEYRSBKKHIwDw==&amp;rs=AOn4CLB_s12udXXnM8gMzf_VRc54jUMR-g" duration="1" ss="4" loop="false" audio="false" preload="true"/>
    <image zIndex="2" x="50vw" y="50vh" height="905px" width="720px" src="https://images-na.ssl-images-amazon.com/images/I/815K9pHzYpL._SL1500_.jpg" duration="NaN" ss="0" loop="false" audio="true" preload="true" img_h="1500" img_w="1194"/>
    <trans duration="1" key="fadecolor"/>
    <video line="Get ready for a kick-ass AI year." zIndex="2" x="50vw" y="50vh" height="100vh" width="100vw" src="https://i.ytimg.com/vi/awnq-2Rc7-c/hq720_2.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4Ac4FgAKACooCDAgAEAEYRSBKKHIwDw==&amp;rs=AOn4CLB_s12udXXnM8gMzf_VRc54jUMR-g" duration="NaN" ss="0" loop="false" audio="false" preload="true"/>
    <image zIndex="2" x="50vw" y="50vh" height="905px" width="720px" src="https://images-na.ssl-images-amazon.com/images/I/815K9pHzYpL._SL1500_.jpg" duration="NaN" ss="0" loop="false" audio="true" preload="true" img_h="1500" img_w="1194"/>
    <trans duration="1" key="fadecolor"/>
  </spine>
  <video zIndex="2" x="80vw" y="90vh" height="185rpx" width="160rpx" src="/Users/pratheesh.pm/Documents/codebase/diffModels/jsBased/FFCreator/examples/assets/vtuber/fvt.mp4" duration="30" ss="0" loop="false" audio="false" preload="true"/>
</canvas>
</miraml>`

app.get('/test', (req, res) => {
  console.log("\n\nreq-->",req.host, req.protocol,req.hostname,req.headers,req.header);
  return res.json({})
})

app.post('/burn', async (req, res) => {
  const data = req.body;
  await burn && burn({ value: test, cacheDir, outputDir: outputDir },(e)=>{
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
