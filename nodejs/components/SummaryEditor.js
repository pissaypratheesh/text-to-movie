import { useState, useEffect, useRef } from 'react';                                                                                                                                                                         
import axios from 'axios';                                                                                                                                                                                           
import Editor from "@monaco-editor/react";                                                                                                                                                                        
                                                                                                                                                                                               
function SummaryEditor({ summary }) {                                                                                                                                                                                                  
  const [searchTerm, setSearchTerm] = useState(summary || '');                                                                                                                                                                  
  const [jsonData, setJsonData] = useState('');  
  const editorRef = useRef(null);                                                                                                                                                                       
                                                                                                                                                                                                                     
  const handleEditorUpdate = () => {
    setJsonData(editorRef.current.getValue());
  };
  let data = JSON.stringify({ "q": summary });
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
      let json = response.data.messages[0]['content']
      setJsonData(JSON.stringify(JSON.parse(json), null, 2));                                                                                                                                                           
    } catch (error) {                                                                                                                                                                                                
      console.error('Error fetching JSON data:', error);                                                                                                                                                             
    }                                                                                                                                                                                                                
  };                                                                                                                                                                                                                 
           
  console.log("🚀 ~ file: videos.js:62 ~ SummaryEditor ~ jsonData:", jsonData)

  return (                                                                                                                                                                                                           
    <div className="container mx-auto">                                                                                                                                                                              
      <div className="flex items-center my-4">                                                                                                                                                                       
        <textarea                                                                                                                                                                                                    
           className="border border-gray-300 rounded px-4 py-2 w-full"                                                                                                                                                
           placeholder="Search..."                                                                                                                                                                                    
           value={searchTerm}                                                                                                                                                                                         
           onChange={(e) => setSearchTerm(e.target.value)}                                                                                                                                                            
         ></textarea>                                                                                                                                                                                                           
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
export default SummaryEditor;

/* import ImageCreator from '../components/ImageCreator';

function SummaryEditor({ summary }) {
  return <ImageCreator />;
}

export default SummaryEditor;
 */
