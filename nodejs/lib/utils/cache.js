'use strict';
const md5 = require('md5');
const fs = require('fs-extra');
const path = require('path');
const url = require('url');
const cv = require('./opencv');
const progressStream = require('progress-stream');

// node-fetch from v3 is an ESM-only module - you are not able to import it with require().
//import fetch from 'node-fetch';
// below line was the the line which was there
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/* const fetch = async (...args) => {
  const { default: fetch } = await require('node-fetch');
  return fetch(...args);
};
 */
//const fetch = require('node-fetch');
const _importDynamic = new Function('modulePath', 'return import(modulePath)')

async function fetch(...args) {
  const {default: fetch} = await _importDynamic('node-fetch')
  return fetch(...args)
}
//-------

const cacheProgress = {};

const CacheUtil = {
  cacheDir: null,
  async cachedResource(src, progress, cacheDir) {
    if (!src.startsWith('http')) return src;
    cacheDir = cacheDir || CacheUtil.cacheDir;
    fs.ensureDir(cacheDir);
    const key = md5(`${cacheDir}_${src}`);
    const ext = url.parse(src).pathname.split('.').slice(-1)[0];
    const cacheFile = path.join(cacheDir, `${key}.${ext}`);
    if (cacheProgress[key]) return cacheFile;
    // 锁一下，防止并发导致多次下载同一个文件
    cacheProgress[key] = { total: 1024 * 1024, loaded: 0 };
    return new Promise((resolve, reject) => {
      fetch(src).then(res => {
        let total = Number(res.headers.get("content-length"));
        let size = 0;
        try {
          const stats = fs.statSync(cacheFile);
          if (stats.size === total) return resolve(cacheFile);
        } catch (e) {}
        const fileStream = fs.createWriteStream(cacheFile);
        // console.log('total:', total);
        let str = progressStream({
            length: total,
            time: 100
        });
        str.on('progress', function (progressData) {
          cacheProgress[key].total = progressData.length;
          cacheProgress[key].loaded = progressData.transferred;
          let total = 0, loaded = 0;
          for (const pp of Object.values(cacheProgress)) {
            total += pp.total;
            loaded += pp.loaded;
          }
          // console.log(src, loaded, total, loaded / total);
          progress && progress(loaded / total);
        });
        res.body.pipe(str).pipe(fileStream);
        fileStream.on("finish", function() {
          resolve(cacheFile);
        });
      });
    });
  },
  async cacheNode(node, progress) {
    let { type, src, path, url, fontFamily, font, preload } = node.conf;
    let source = src || path || url;
    // opencv读取video只能是本地的文件
    let cacheDir = node.rootConf('detailedCacheDir');
    // if (cv.available() && type === 'video') 
    // todo: 烧制都预先下载好
    preload = true;
    if (type === 'text' && fontFamily?.startsWith('http')) { // must preload
      const fontPath = await CacheUtil.cachedResource(fontFamily, progress);
      node.cachedFontFamily = fontPath;
    } else if (type === 'richtext' && font) { // default preload=true
      const fonts = Array.isArray(font) ? font : [font];
      for (const ft of fonts) {
        ft.format = node.fontFormat(ft);
        const path = await CacheUtil.cachedResource(ft.src, progress);
        ft.cachedSrc = node.base64path(path);
      }
      node.conf.font = fonts
    } else if (['image', 'gif'].includes(type) && source && preload) { // default preload=false
      node.conf.cachedSrc = await CacheUtil.cachedResource(source, progress, cacheDir);
    } else if (['audio', 'video', 'speech'].includes(type) && source && preload) { // default preload=false
      const ss = Date.now();
      node.conf.cachedSrc = await CacheUtil.cachedResource(source, progress, cacheDir);
      cv.dltimer += Date.now() - ss;
      const paths = source.split('/');
      node.conf.srcFile = paths[paths.length - 1];
    } else {
      source = null;
    }
  },
}

module.exports = CacheUtil;
