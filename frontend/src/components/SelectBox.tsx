import React, {useState, useEffect} from 'react';
import Loading from './Loading';
import axios from 'axios';
import { Link } from "react-router-dom";

interface SelectBoxProps {
    seq: string;
    question: string;
}

interface PostResponse {
    "input_form": string
}

export default function SelectBox({seq, question}: SelectBoxProps) {

    const [loading, setLoading] = useState(false);
    const PostResponse = async () => {
        setLoading(true);
        await axios
            .post(
                "http://localhost:8000/api/v1/novels/8",
                {
                    input_form: seq,
                },
                {
                    headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    },
                }
            )
        setLoading(false);
        <Link to="/choice" />
    };
    return (
        <div>
            <button 
                className="w-full h-14 bg-beige-white text-17 font-light text-left text-black"
                style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
                onClick={PostResponse}
            >
                <button 
                className="w-20 h-14 bg-choice text-25 font-light text-center text-black"
                style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)"}}
                onClick={PostResponse}
                >
                    {seq}
                </button>
                <span className='absoulte p-3'>
                    {question}
                </span>
            </button>
            {loading && <Loading />}
        </div>
    );
}