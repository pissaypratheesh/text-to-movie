var _ = require('underscore');
const cheerio = require('cheerio');
_.mixin(require('./mixins'));
function fetchMinimumDetails (res) {
    let reqd;
    if(res){
        let details = res.details || {};
        let extractedText;
        reqd = _.pick(details,'adKeywords', 'content','content2','contentImageInfo','relatedData','titleEnglish','title');
        let refined =  _.pick(details,'adKeywords','titleEnglish','title');
        if(reqd.content2){
            // Load the HTML string into Cheerio
            const $ = cheerio.load(reqd.content2);

            // Extract text content using Cheerio
            extractedText = $('body').text();
            //1200x675_90
        } 
        refined.completeContent = `${reqd.content} ${extractedText || ''}`
        refined.images = [imageUrlFormer(reqd.contentImageInfo.url)]
        return refined;
    }
}

function imageUrlFormer(url) {
    return url.replace('#DH_EMB_IMG_REP#__DHQ_', '1200x675_90').replace('.webp','.jpg');
}

module.exports = {
    fetchMinimumDetails
}