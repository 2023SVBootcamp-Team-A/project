import React, {useState, useEffect} from 'react';
import Choice from '../components/Choice';
import data from '../data/choice-data.json';
import axios from "axios";

interface StoryResponse {
    "response_content": string,
    "response_message": string,
    choices: string[]
}

export default function ChociePage() {
    
    const [visible, setVisible] = useState(false);
    const [resposeData, setResponseData] = useState<StoryResponse>();

    const GetData = async () => {
        try {
            const response = await axios.get<StoryResponse>('http://localhost:8000/api/v1/novels/1', {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `` // 추후 관리하는 Token 삽입 할 것
                    }
                }
            );
            setResponseData(response.data);
        } catch(err) {
          console.log(err);
        }
    }
    
      useEffect(() => {
        GetData(); 
      }, []);


    return(
        <div className="w-screen h-screen min-h-screen relative overflow-scroll">
            <div
                className="w-screen h-screen min-h-screen relative overflow-scroll bg-scroll bg-no-repeat bg-top bg-cover hover:bg-fixed" 
                style={{
                    backgroundImage: `url(${data.url})`,
                    backgroundSize: "cover",
                }}
            >
                <button 
                        className="animate-pulse animate-infinite text-left text-7xl text-white flex w-screen h-screen items-center justify-center"
                        onClick={() => {
                            setVisible(!visible)
                        }}
                    > 
                    {!visible && "click!"}
                </button>             
                {!visible && (
                    <>
                        <div className="w-full h-16 absolute left-0 top-3.5 md:bg-white/60" />
                        <div className="w-full h-16 absolute left-0 bottom-0 bg-white/60" />
                    </>
                )}
            </div>
            {!(resposeData == null) && visible && <Choice story={resposeData.response_content} question={data.question} choices={data.choices} />}
        </div>
    );
}