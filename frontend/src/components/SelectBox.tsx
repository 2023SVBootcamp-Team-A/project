import React, {useState, useEffect, } from 'react';
import Loading from './Loading';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface SelectBoxProps {
    seq: string;
    question: string;
    end: string;
    novel_id: number;
}

interface PostResponse {
    "input_field": string
}

export default function SelectBox({seq, question, end, novel_id}: SelectBoxProps) {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const url = "http://localhost:8000/api/v1/novels/"+novel_id
    const PostResponse = async () => {
        setLoading(true);
        try {
            await axios
            .post(
                url,
                (end == seq)? {input_field: "end"} : {input_field: seq}        
            );
            (end == seq)? navigate('/result', { state: { novel_id: novel_id }}) : window.location.reload();
        } catch (error) {
            setLoading(false);
            console.error("Error while posting data:", error);
        }

    };
    return (
        <div className='flex'>
            <button
            className="w-20 h-14 bg-choice text-25 font-light text-center text-black"
            style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)"}}
            onClick={PostResponse}
            >
                {seq}
            </button>
            <button 
                className="w-full h-14 bg-beige-white text-17 font-light text-left text-black"
                style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
                onClick={PostResponse}
            >

                <span className='absoulte p-3'>
                    {question}
                </span>
            </button>

            {loading && <Loading />}
        </div>
    );
}