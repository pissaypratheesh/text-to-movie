
import { promises as fs } from "fs";
import path from "path";
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  }
};

const handler = async (req, res) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const fullHost = `${protocol}://${host}`;

  console.log("\n\n\nhost-->", req.headers.host, req.headers.hostname,req)
  let status = 200;
  let resultBody = { status: 'ok', message: 'Files were uploaded successfully', files: [] };

  /* Get files using formidable */
  const files = await new Promise((resolve, reject) => {
    const form = formidable();
    const processedFiles = [];
    form.on('file', function (field, file) {
      processedFiles.push([field, file]);
    });
    form.on('end', () => resolve(processedFiles));
    form.on('error', err => reject(err));
    form.parse(req, () => {
      //
    });
  }).catch(e => {
    console.log(e);
    status = 500;
    resultBody = {
      status: 'fail',
      message: 'Upload error'
    };
  });
  //console.log("\n\n\n\n🚀 ~ file: upload.js:36 ~ files ~ files:", files,process.cwd())
  const imgPath = `/public/assets/images/`;
  const vidPath = `/public/assets/videos/`;
  if (files && files.length) {
    /* Move uploaded files to directory */
    for (const file of files) {
      const mimetype = file[1].mimetype;
      let servePath;
      let targetPath;
      let type;
      if(mimetype.startsWith('image')) {
        targetPath = path.join(process.cwd(), imgPath);
        servePath = imgPath.replace('/public', '');
        type = 'image';
      }
      if(mimetype.startsWith('video')) {
        targetPath = path.join(process.cwd(), vidPath);
        servePath = vidPath.replace('/public', '');
        type =  'video';
      }
      
      const tempPath = file[1].filepath;
      console.log("\n\n\n\n\n\n\n🚀 ~ file: upload.js:51 ~ handler ~ tempPath:",tempPath,file[1])
      await fs.rename(tempPath, targetPath + file[1].originalFilename);//.newFilename);
      resultBody.files.push({type, url:`${fullHost}${servePath}${file[1].originalFilename}`});
    }
  }

  res.status(status).json(resultBody);
};

export default handler;



/* import { NextApiRequest, NextApiResponse } from "next";                                                                                                                                                                                         
import fs from "fs";                                                                                                                                                                                                                            
import path from "path";                                                                                                                                                                                                                        
import { IncomingForm } from "formidable";   
//import nextConnect from 'next-connect';
import { createHandler } from 'next';
import cors from 'cors'; 

  
const handler = createHandler();
handler.use(cors());                                                                                                                                                                                                                                
handler.post(async (req, res) => {          
      // Use the cors middleware
  await cors(req, res);                                                                                                                                                                                                 
  console.log("🚀 ~ file: upload.js:8 ~ handler ~ req.method :", req.method )
  if (req.method === "POST") {                                                                                                                                                                                                                  
    const form = new IncomingForm();           
    console.log("🚀 ~ file: upload.js:10 ~ handler ~ form:", form.parse)
    form.parse(req, (err, fields, files) => {                                                                                                                                                                                             
      console.log("\n\n\n\n\n\n🚀 ~ file: upload.js:10 ~ form.parse ~ err, fields, files:", err, fields, files)
      if (err) {                                                                                                                                                                                                                                
        res.status(500).json({ message: "Error processing the request" });                                                                                                                                                                      
        return;                                                                                                                                                                                                                                 
      }                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                
      const file = files.file;                                                                                                                                                                                                                  
      console.log("🚀 ~ file: upload.js:17 ~ form.parse ~ file:", file)
      const fileExtension = path.extname(file.name).toLowerCase();                                                                                                                                                                              
      const isImage = [".jpg", ".jpeg", ".png", ".gif"].includes(fileExtension);                                                                                                                                                                
      const isVideo = [".mp4", ".webm", ".ogg"].includes(fileExtension);                                                                                                                                                                        
                                                                                                                                                                                                                                                
      if (!isImage && !isVideo) {                                                                                                                                                                                                               
        res.status(400).json({ message: "Invalid file type" });                                                                                                                                                                                 
        return;                                                                                                                                                                                                                                 
      }                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                
      const targetDirectory = isImage                                                                                                                                                                                                           
        ? "nodejs/assets/images"                                                                                                                                                                                                                
        : "nodejs/assets/videos";                                                                                                                                                                                                               
      const targetPath = path.join(targetDirectory, file.name);                                                                                                                                                                                 
                                                                                                                                                                                                                                                
      fs.rename(file.path, targetPath, (err) => {                                                                                                                                                                                               
        if (err) {                                                                                                                                                                                                                              
          res.status(500).json({ message: "Error saving the file" });                                                                                                                                                                           
          return;                                                                                                                                                                                                                               
        }                                                                                                                                                                                                                                       
        res.status(200).json({ message: "File uploaded successfully" });                                                                                                                                                                        
      });                                                                                                                                                                                                                                       
    });                                                                                                                                                                                                                                         
  } else {                                                                                                                                                                                                                                      
    res.status(405).json({ message: "Method not allowed" });                                                                                                                                                                                    
  }                                                                                                                                                                                                                                             
});                                                                                                                                                                                                                                              
                                
export default handler; */