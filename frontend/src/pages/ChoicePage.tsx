import React, {useState} from 'react';
import styled from 'styled-components';
import Choice from '../components/Choice';
import data from '../data/choice-data.json';

type ImageProps = {
    url: string
}

export default function ChociePage() {
    
    const [visible, setVisible] = useState(false);
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
                        <div className="w-full h-16 absolute left-0 top-3.5 bg-white/60" />
                        <div className="w-full h-16 absolute left-0 bottom-0 bg-white/60" />
                    </>
                )}
                {visible && <Choice story={data.story} question={data.question} choices={data.choices} />}
            </div>
        </div>
    );
}