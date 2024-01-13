const BASE_URL = 'http://localhost:3000';
const BURN_URL = 'http://localhost:9999/burn';

import xmlFormatter from 'xml-formatter'; 
import axios from "axios";
import { toJS } from "mobx";
var activeFile = 9999;
var _ = require("underscore");

export function formatXml(xmlgen) {
  return xmlFormatter(xmlgen, {
    indentation: '  ', 
    filter: (node) => node.type !== 'Comment', 
    collapseContent: true, 
    lineSeparator: '\n'
  })
}

export  function burnXML(xml) {
  const url = BURN_URL;
  const headers = {
    'Content-Type': 'application/json',
  };
  const data = {
    data: {
      xml: xml,
    },
  };
  return axios.post(url, data, { headers });
}
export async function fetchXML(store) {
  try {
    let sentences = toJS(store.sentences || []);
    let videodata = toJS(store.videodata || {});
    const response = await axios.post(`${BASE_URL}/api/xmlgen`, {
      data: {
        segments: sentences.map((item)=>{return _.omit(item,'words')}),
        meta: videodata,
      },
    });

    if (response.data && response.data.xmlgen) {
      store.updateData({...videodata, xmlgen: response.data.xmlgen},'videodata');
    } else {
      console.error('Error fetching XML');
    }
  } catch (error) {
    console.error('Error fetching XML:', error);
  }
}

export async function uploadFile(file, others, store) {
  const apiUrl = "/api/upload";
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(apiUrl, formData);
    let newSentences = [...store.sentences];

    if (response.data && response.data.files) {
      let meta = toJS(others);
      let activeIndex = meta && meta.index;
      let files = response.data.files || [];
      let newImageArr = newSentences[activeIndex]["selectedImgs"] || [];
      let newVideoArr = newSentences[activeIndex]["selectedVids"] || [];
      files.forEach((filedetails)=>{
        let { type, url } = filedetails;
        if (type == "image") {
          newImageArr[newImageArr.length] = { src: url, link: url, url, index: newImageArr.length };
        }
        if(type == "video"){
          newVideoArr[newVideoArr.length] = { src: url, link: url, url, index: newVideoArr.length };
        }
      })
      newSentences[activeIndex]["selectedImgs"] = newImageArr;
      newSentences[activeIndex]["selectedVids"] = newVideoArr;

      store.updateSentences(newSentences);

    } else {
      console.error("Error uploading file");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}
