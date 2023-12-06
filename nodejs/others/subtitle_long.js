const path = require('path');
const colors = require('colors');
const startAndListen = require('./listen');
const ffmpeg = require('fluent-ffmpeg');

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
} = require('ffcreator');
const { splitStringIntoLines } = require('../generic_utils');
const song = `Yo, so Election Commission dropped a notice bomb on Rahul for calling the PM a bad omen at a rally. Opposition was triggered and filed a complaint, now EC's like, "Explain yourself by Saturday, fam!" Rahul dissed by saying he jinxed India's World Cup final. EC's all serious, talking Model Code of Conduct violations and crores waivers drama. They even brought up the Supreme Court vibes. Rahul, you in some political hot water, bro!`

const createFFTask = () => {
  const bg = path.join(__dirname, './assets/imgs/bg/04.jpeg');
  const img1 = path.join(__dirname, './assets/imgs/album/06.jpeg');
  const img2 = path.join(__dirname, './assets/imgs/album/05.jpeg');
  const img3 = path.join(__dirname, './assets/imgs/album/04.jpeg');
  const img4 = path.join(__dirname, './assets/imgs/album/03.jpeg');
  const img5 = path.join(__dirname, './assets/imgs/album/02.jpeg');
  const logo = path.join(__dirname, './assets/imgs/logo/logo2.png');
  //const tts = path.join(__dirname, './assets/audio/suno_song.mp3');// './assets/audio/tts_output.wav');
  const font1 = path.join(__dirname, './assets/font/lf_bold.ttf');
  const tts = path.join(__dirname, './assets/audio/3Audio.mp3');// './assets/audio/tts_output.wav');
  const bgAudio = path.join(__dirname, './assets/audio/bg1.mp3');// './assets/audio/tts_output.wav');
  const sunovid = path.join(__dirname, './assets/video/demo3.mp4');
  const video1 = path.join(__dirname, './assets/video/bgs/planet.mp4');
  const invideo1 = path.join(__dirname, './assets/video/video1.mp4');
  const invideo2 = path.join(__dirname, './assets/video/video2.mp4');
  const last = path.join(__dirname, './assets/dailyhunt/logovid_16_9.mp4');

  const outputDir = path.join(__dirname, './output/');
  const cacheDir = path.join(__dirname, './cache/');

  // create creator instance 720','1280'
  // const width = 720;
  // const height = 1280;
const height = 1280;
const width = 720

  const creator = new FFCreator({
    cacheDir,
    outputDir,
    width,
    height,
    debug: false,
  });

  creator.addAudio(new FFAudio({ path: bgAudio, volume: 0.2, fadeIn: 4, fadeOut: 4, loop: true }));

  // create FFScene
  const scene1 = new FFScene();
  const scene2 = new FFScene();
  // scene1.setBgColor('#fc427b');
  // scene2.setBgColor('#019333');
//--------------------------------

  //set vid
  const fvideo = new FFVideo({
    path: sunovid,
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


  ///


  
//--------------------------------

  // add image album
  // const album = new FFAlbum({
  //   list: [img1, img2, img3, img4, img5,img1, img2],
  //   x: width / 2,
  //   y: height / 2,
  //   width: width,
  //   height: 384,
  //   showCover: true, // 默认显示封面
  // });
  // album.setTransition('fadeInLeft');
  // album.setDuration(2.5);
  // scene1.addChild(album);

  //--------------------------------

  // add title text
  // const text = new FFText({ text: 'FFCreator字幕DEMO', x: width / 2, y: 150, fontSize: 40 });
  // text.setColor('#ffffff');
  // text.setBackgroundColor('#019333');
  // text.addEffect('fadeInUp', 1, 1);
  // text.alignCenter();
  // text.setStyle({ padding: 10 });
  // scene1.addChild(text);

  // // add logo
  // const flogo2 = new FFImage({ path: logo, x: width / 2, y: 60 });
  // flogo2.setScale(0.6);
  // scene1.addChild(flogo2);

  //--------------------------------


  // add audio to scene1
  scene1.addAudio(tts);

  //--------------------------------


  // subtitle
  // const title = splitStringIntoLines(`In a quaint town where the whispers of the wind-carried tales of romance lived Emma. She, a young dreamer with a heart full of stories, sought solace in the pages of her favorite book.  One sunny day, destiny played its tune.  Luke, a wandering soul with a guiter slung over his shoulder, spotted Emma on a park bench.  their eyes like shy dancers, met in a fleeting moment that sparked an unspoken connection.  Approaching with a gentle smile, Luke found himself stumbling over words, yet Lotter became their language.  Emma, blushing behind her book, felt her heart flutter as they began to share dreams and unveil the hidden chapters of their lives.  As the sun dipped below the horizon, casting a warm glow on the park, Luke  Seguitar strummed a melody of affection.  The invisible thread of love wove itself tighter, binding their souls in an intricate dance of emotions.  Days turned into nights, and nights into shared adventures.  In the quiet moments beneath a starlit sky, hand in hand, they strolled through the pages of their own love's story.  The silent language of love echoed in their hearts,  witnessed by the twinkling stars above, with each passing sunset.  Their connection deepened, and in the tapestry of time, their love story unfolded.  Together, under the vast canvas of the universe, Emma and Luke discovered the magic of an endless love that transcended the boundaries of time and space.
  // `,30)
  const title = splitStringIntoLines(song.toUpperCase(),10)/* splitStringIntoLines(`In a quaint town where the whispers of the wind-carried tales of romance lived Emma. She, a young dreamer with a heart full of stories, sought solace in the pages of her favorite book.  One sunny day, destiny played its tune.  Luke, a wandering soul with a guiter slung over his shoulder, spotted Emma on a park bench.  their eyes like shy dancers, met in a fleeting moment that sparked an unspoken connection.  Approaching with a gentle smile, Luke found himself stumbling over words, yet Lotter became their language.  Emma, blushing behind her book, felt her heart flutter as they began to share dreams and unveil the hidden chapters of their lives.  As the sun dipped below the horizon, casting a warm glow on the park, Luke  Seguitar strummed a melody of affection.  The invisible thread of love wove itself tighter, binding their souls in an intricate dance of emotions.  Days turned into nights, and nights into shared adventures.  In the quiet moments beneath a starlit sky, hand in hand, they strolled through the pages of their own love's story.  The silent language of love echoed in their hearts,  witnessed by the twinkling stars above, with each passing sunset.  Their connection deepened, and in the tapestry of time, their love story unfolded.  Together, under the vast canvas of the universe, Emma and Luke discovered the magic of an endless love that transcended the boundaries of time and space.
  `,30) */
  //    'abcdedghhh，,它们不会生气，能记住所有东西，还有，它们不会喝光你的啤酒。计算机就跟比基尼一样，省去了人们许多的胡思乱想。';
  const subtitle = new FFSubtitle({
    comma: true, // 是否逗号分割
    backgroundColor: '#00219C',
    color: '#fff',
    fontSize: 55,
    wrap: "true" ,
    x: width * .3,
    y: height * .9,
    width: width/2,
  });
  subtitle.setText(title);
  subtitle.setFont(font1);
  subtitle.setSpeech(tts); // 语音配音-tts
  subtitle.frameBuffer = 24;
  //subtitle.setDuration(album.getTotalDuration() + 1);// 没有tts配音时候可以手动设置
  scene1.addChild(subtitle);
  //creator.addChild(subtitle)

//  scene1.setDuration(album.getTotalDuration() + 1);
//  scene1.setTransition('FastSwitch', 1.5);


  //--------------------------------
  scene1.setDuration(24);
  creator.addChild(scene1);

  //scene 2
  // const fvideo2 = new FFVideo({
  //   path: last,
  //   width: height * 1,
  //   height: height * 1,
  //   fit: 'cover',
  //   x: width / 2,
  //   y: height / 2,
  //   start:'00:00:34',
  //   ss: '00:00:00',
  //  // blur: 10,
  // });
  // //fvideo.addEffect('backInUp', 0.5, 0.5);
  // //fvideo.setScale(2.3);
  // fvideo2.setAudio(true);
  // fvideo2.setLoop(false)
  // scene2.addChild(fvideo2);
  // creator.addChild(scene2);

  //--------------------------------

  // add scene2 background
  // const fbg = new FFImage({ path: bg });
  // fbg.setXY(width / 2, height / 2);
  // scene2.addChild(fbg);

  // // logo
  // const flogo = new FFImage({ path: logo, x: width / 2, y: height / 2 - 150 });
  // flogo.addEffect('fadeInDown', 1, 1.2);
  // scene2.addChild(flogo);

  // scene2.setDuration(4);
  // creator.addChild(scene2);

  //--------------------------------

  creator.start();
  creator.closeLog();

  creator.on('start', () => {
    console.log(`FFCreator start`);
  });

  creator.on('error', e => {
    console.log(`FFCreator error: ${JSON.stringify(e)}`);
  });

  creator.on('progress', e => {
    console.log(colors.yellow(`FFCreator progress: ${(e.percent * 100) >> 0}%`));
  });

  creator.on('complete', e => {
    console.log(
      colors.magenta(`FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `),
    );

    console.log(colors.green(`\n --- You can press the s key or the w key to restart! --- \n`));
  });

  return creator;
};
FFCreatorCenter.addTask(createFFTask)
module.exports = () => startAndListen(() => FFCreatorCenter.addTask(createFFTask));
