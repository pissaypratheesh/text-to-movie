const { createMiraMLXML } = require('./index');
// Example usage:
const xmlString = createMiraMLXML({
    dimensions: {
        w: '1280',
        h: '720'
    },
    mute: 'true',
    scenes: [
        '0',
    ],
    sequences: [
      {
          type: 'bigText',
          text: "Ready?",
          options: {
              fontSize: '80rpx',
              color: '#FFF',
              x: '50vw',
              y: '50vh',
              lineHeight: '90%',
              letterSpacing: '10%',
              fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
              duration: '2',
          },
          audio: {
              src: 'https://cos.mirav.cn/player/ReadyGo.mp3'
          }
      },
      {
          type: 'transition',
          options:{ duration: '1.5', key: 'fadecolor' }
      },
      {
        type: 'video',
        options: {
          loop: 'false',
          audio: 'false',
          x: '50vw',
          y: '50vh',
          height: '100vh',
          zIndex: '2',
          src: 'https://cos.mirav.cn/player/pic_oceans.mp4',
          preload: 'true',
          duration: '10',
          ss: '2'
        },
        animations: [
          { time: '0.5', delay: '5', from: { scale: '1' }, to: { scale: '0.2', y: '150', x: '250' } },
          { time: '0.5', delay: '9', from: { x: '50' }, to: { x: '-300' } },
        ],
        textElements: [{
          text: 'OCEAN',
          animate: true,
          options: {
              fontSize: '100rpx',
              color: '#FFF',
              x: '50vw',
              y: '50vh',
              lineHeight: '90%',
              fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
              asMask: 'true',
              duration: '4'
            }
        }],
        scene: '0'
      },
      {
        type: 'video',
        options: {
          src: 'https://cos.mirav.cn/player/pic_oceans.mp4',
          start: '5',
          duration: '5',
          ss: '20'
        },
        scene: '0'
      },
      {   
          type: 'transition',
          options: { duration: '1', key: 'fade' }
      },
      {
        type: 'video',
        options: {
          src: 'https://cos.mirav.cn/player/pic_oceans.mp4',
          duration: '5',
          ss: '30',
          blur: '10',
        },
        textElements: [
          {
            text: 'Mira Player',
            options: {
              fontSize: '60rpx',
              color: '#FFF',
              x: '50vw',
              y: '45vh',
              lineHeight: '90%',
              fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
              effect: 'zoomInDown',
              effectTime: '1',
              opacity: '0.8',
            },
          },
          {
            text: 'Powered By FFCreator',
            options: {
              fontSize: '20rpx',
              color: '#FFF',
              x: '50vw',
              y: '70vh',
              lineHeight: '90%',
              fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
              effect: 'zoomInUp',
              effectTime: '1',
              opacity: '0.6',
            },
          },
        ],
      },
      {
        type: 'audio',
        options: {
          audio: 'true',
          src: 'https://cos.mirav.cn/player/oceans.mp3',
          duration: '17',
          fadeOut: '1',
        },
      },
    ],
  });
  
const xmlString2 = createMiraMLXML({
    dimensions: {
        w: '1280',
        h: '720'
    },
    mute: 'false',
    scenes: [
        '0',
    ],
    sequences: [
      {
    
        type: 'video',
        options: {
            loop: 'false',
            audio: 'true',
            x: '50vw',
            y: '50vh',
            height: '100vh',
            zIndex: '2',
            src: "https://cos.mirav.cn/player/pic_oceans.mp4",
            preload: 'true',
            duration: '10',
            ss: '1'
        },
        images: [
            // zIndex="2" x="50rpx" y="30rpx" height="50rpx" width="50rpx" src="https://cos.mirav.cn/player/pic1.jpg"
            {
                options:{   
                    zIndex: '2',
                    x: '50rpx',
                    y: '30rpx',
                    height: '50rpx',
                    width: '50rpx',
                    src: "https://cos.mirav.cn/player/pic1.jpg",
                }
            }
        ]

      },
      {   
        type: 'transition',
        options: { duration: '1', key: 'cube' }
      },
      {
    
        type: 'video',
        options: {
            loop: 'false',
            audio: 'true',
            x: '50vw',
            y: '50vh',
            height: '100vh',
            zIndex: '2',
            src: "https://cos.mirav.cn/player/pic_oceans.mp4",
            preload: 'true',
            duration: '10',
            ss: '1'
        },
        images: [
            // zIndex="2" x="50rpx" y="30rpx" height="50rpx" width="50rpx" src="https://cos.mirav.cn/player/pic1.jpg"
            {
                options:{   
                    zIndex: '2',
                    x: '100rpx',
                    y: '30rpx',
                    height: '50rpx',
                    width: '50rpx',
                    src: "https://cos.mirav.cn/player/pic2.jpg",
                }
            }
        ]

      },
      {   
        type: 'transition',
        options: { duration: '1', key: 'cube' }
      },
      {
    
        type: 'video',
        scene: '0',
        options: {
            loop: 'false',
            audio: 'true',
            x: '50vw',
            y: '50vh',
            height: '100vh',
            zIndex: '2',
            src: "https://cos.mirav.cn/player/pic_oceans.mp4",
            preload: 'true',
            duration: '10',
            ss: '1'
        },
        images: [
            // zIndex="2" x="50rpx" y="30rpx" height="50rpx" width="50rpx" src="https://cos.mirav.cn/player/pic1.jpg"
            {
                options:{   
                    zIndex: '2',
                    x: '150rpx',
                    y: '30rpx',
                    height: '50rpx',
                    width: '50rpx',
                    src: "https://cos.mirav.cn/player/pic3.jpg",
                }
            }
        ]

      },
      {   
        type: 'transition',
        options: { duration: '1', key: 'cube' }
      },
      {
    
        type: 'video',
        scene: '0',
        options: {
            loop: 'false',
            audio: 'true',
            x: '50vw',
            y: '50vh',
            height: '100vh',
            zIndex: '2',
            src: "https://cos.mirav.cn/player/pic_oceans.mp4",
            preload: 'true',
            duration: '10',
            ss: '1'
        },
      },
      {
        type: 'audio',
        options: {
          audio: 'true',
          loop: 'true',
          src: 'https://cos.mirav.cn/player/oceans.mp3',
          duration: '10',
          fadeOut: '1',
        },
      },
    ]
})
  console.log(xmlString2);