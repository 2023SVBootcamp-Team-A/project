import React, {useState} from 'react';
import Loading from './Loading';

interface SelectBoxProps {
    seq: string;
    question: string;
}

export default function SelectBox({seq, question}: SelectBoxProps) {

    const [isClick, setIsClick] = useState(false);
    return (
        <div>
            <button 
                className="w-full h-14 bg-beige-white text-17 font-light text-left text-black"
                style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)" }}
            >
                <button 
                className="w-20 h-14 bg-choice text-25 font-light text-center text-black"
                style={{ boxShadow: "0px 4px 4px 0 rgba(0,0,0,0.25)"}}
                onClick={() => {
                    setIsClick(true)
                }}
                >
                    {seq}
                </button>
                <span className='absoulte p-3'>
                    {question}
                </span>
            </button>
            {isClick && <Loading />}
        </div>
    );
}