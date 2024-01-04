import { useState, useEffect } from 'react';                                                                                                                                                                         
import axios from 'axios';                                                                                                                                                                                           
import MonacoEditor from 'react-monaco-editor';                                                                                                                                                                      
let data = JSON.stringify({
  "q": "tourist influx amid Christmas, New Year holidays, many netizens said it's an ecological disaster in the making.\n\n\nThousands of tourists thronged Himachal Pradesh during the long Christmas weekend with the Atal Tunnel in Rohtang joining Kullu and Lahaul & Spiti as the most sought-after destination.\n\nAn estimated 65,000 people in more than 12,000 vehicles crossed the Tunnel on Sunday, according to police data.\n\nThe 9.2-kilometre Atal Tunnel is the world's highest single-tube tunnel above 10,000 feet. Rohtang received heavy snowfall on Saturday, prompting tourists to make a beeline for it.\n\nMany netizens said that while the tourist influx is good for the economy, it's a disaster for the ecologically fragile area.\n\nAccording to the latest update over 126,000 tourists and 28,210 vehicles crossed the Atal Tunnel in one single day as Tourists flocked to Manali & Solang. The opening of the Atal Tunnel has driven hotel occupancy to 90%, said influencer Rishi Bagree on X platform."
});                                                                                                                                                                                                
function Videos() {                                                                                                                                                                                                  
  const [searchTerm, setSearchTerm] = useState('');                                                                                                                                                                  
  const [jsonData, setJsonData] = useState('');                                                                                                                                                                      
                                                                                                                                                                                                                     
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
      setJsonData(JSON.stringify(response.data, null, 2));                                                                                                                                                           
    } catch (error) {                                                                                                                                                                                                
      console.error('Error fetching JSON data:', error);                                                                                                                                                             
    }                                                                                                                                                                                                                
  };                                                                                                                                                                                                                 
                                                                                                                                                                                                                     
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
      <MonacoEditor                                                                                                                                                                                                  
        height="400"                                                                                                                                                                                                 
        language="json"                                                                                                                                                                                              
        theme="vs-dark"                                                                                                                                                                                              
        value={jsonData}                                                                                                                                                                                             
        options={{                                                                                                                                                                                                   
          readOnly: true,                                                                                                                                                                                            
          minimap: { enabled: false },                                                                                                                                                                               
          scrollBeyondLastLine: false,                                                                                                                                                                               
        }}                                                                                                                                                                                                           
      />                                                                                                                                                                                                             
    </div>                                                                                                                                                                                                           
  );                                                                                                                                                                                                                 
}   
/* import ImageCreator from '../components/ImageCreator';

function Videos() {
  return <ImageCreator />;
}

export default Videos;
 */
