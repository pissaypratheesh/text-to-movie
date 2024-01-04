import { useState, useEffect, useRef } from 'react';                                                                                                                                                                         
import axios from 'axios';                                                                                                                                                                                           
import Editor from "@monaco-editor/react";                                                                                                                                                                        
let data = JSON.stringify({
  "q": "tourist influx amid Christmas, New Year holidays, many netizens said it's an ecological disaster in the making.\n\n\nThousands of tourists thronged Himachal Pradesh during the long Christmas weekend with the Atal Tunnel in Rohtang joining Kullu and Lahaul & Spiti as the most sought-after destination.\n\nAn estimated 65,000 people in more than 12,000 vehicles crossed the Tunnel on Sunday, according to police data.\n\nThe 9.2-kilometre Atal Tunnel is the world's highest single-tube tunnel above 10,000 feet. Rohtang received heavy snowfall on Saturday, prompting tourists to make a beeline for it.\n\nMany netizens said that while the tourist influx is good for the economy, it's a disaster for the ecologically fragile area.\n\nAccording to the latest update over 126,000 tourists and 28,210 vehicles crossed the Atal Tunnel in one single day as Tourists flocked to Manali & Solang. The opening of the Atal Tunnel has driven hotel occupancy to 90%, said influencer Rishi Bagree on X platform."
});                                                                                                                                                                                                
function Videos() {                                                                                                                                                                                                  
  const [searchTerm, setSearchTerm] = useState('');                                                                                                                                                                  
  const [jsonData, setJsonData] = useState('');  
  const editorRef = useRef(null);                                                                                                                                                                       
                                                                                                                                                                                                                     
  const handleEditorUpdate = () => {
    setJsonData(editorRef.current.getValue());
  };

  const fetchJsonData = async () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/api/summarize',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };                                                                                                                                                                                
    try {                                                                                                                                                                                                            
      const response = await axios.request(config);                                                                                                                               
      console.log("🚀 ~ file: videos.js:23 ~ fetchJsonData ~ response:", response.data,response.data.messages[0]['content'])
      setJsonData(response.data.messages[0]['content']);                                                                                                                                                           
    } catch (error) {                                                                                                                                                                                                
      console.error('Error fetching JSON data:', error);                                                                                                                                                             
    }                                                                                                                                                                                                                
  };                                                                                                                                                                                                                 
           
  console.log("🚀 ~ file: videos.js:62 ~ Videos ~ jsonData:", jsonData)

  return (                                                                                                                                                                                                           
    <div className="container mx-auto">                                                                                                                                                                              
      <div className="flex items-center my-4">                                                                                                                                                                       
        <input                                                                                                                                                                                                       
          type="text"                                                                                                                                                                                                
          className="border border-gray-300 rounded px-4 py-2 w-full"                                                                                                                                                
          placeholder="Search..."                                                                                                                                                                                    
          value={searchTerm}                                                                                                                                                                                         
          onChange={(e) => setSearchTerm(e.target.value)}                                                                                                                                                            
        />                                                                                                                                                                                                           
        <button                                                                                                                                                                                                      
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"                                                                                                                                                  
          onClick={fetchJsonData}                                                                                                                                                                                    
        >                                                                                                                                                                                                            
          Search                                                                                                                                                                                                     
        </button>                                                                                                                                                                                                    
      </div>                                                                                                                                                                                                         
      { jsonData && (
        <>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            onClick={handleEditorUpdate}
          >
            Update
          </button>
          <Editor                                                                                                                                                                                                    
            height="40vh"                                                                                                                                                                                                 
            language="json"                                                                                                                                                                                              
            theme="vs-dark"                                                                                                                                                                                              
            value={jsonData}    
            onMount={(editor) => {                                                                                                                                                                                     
              editorRef.current = editor;                                                                                                                                                                              
            }}                                                                                                                                                                                                         
            options={{                                                                                                                                                                                                 
              readOnly: false,                                                                                                                                                                                         
              minimap: { enabled: false },                                                                                                                                                                             
              scrollBeyondLastLine: false,                                                                                                                                                                             
              wordWrap: 'on',                                                                                                                                                                                          
              lineNumbersMinChars: 3,                                                                                                                                                                                  
            }}         
          /> 
        </>)
      }                                                                                                                                                                                                            
    </div>                                                                                                                                                                                                           
  );                                                                                                                                                                                                                 
}   
export default Videos;

/* import ImageCreator from '../components/ImageCreator';

function Videos() {
  return <ImageCreator />;
}

export default Videos;
 */
