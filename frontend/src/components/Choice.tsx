import React from 'react';
import SelectBox from './SelectBox';
import Loading from '../components/Loading'

interface ChoiceProps {
    story: string;
    question: string;
    choices: { id: string, choice: string }[];
}

export default function Choice({story, question, choices}: ChoiceProps) {
    return (

        <div className="w-screen h-screen bg-white/60">
            <Loading></Loading>
            <div className="flex justify-center h-screen">
                <div className='w-7/12 absolute top-36'>
                    <div className='flex flex-col space-y-4'>
                        <div
                            className="h-4/6 px-16 py-9 bg-beige-white text-left text-black"
                            style={{
                                boxShadow: "0px 4px 15px 10px rgba(0, 0, 0, 0.25) inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                backdropFilter: "blur(5px)"
                            }}
                        >
                            <span className='h-4/6 text-xl'>
                                {story.split('\n').map((line) => (
                                    <span>{line}<br/></span>
                                ))}
                            </span>
                        </div>
                        <div
                            className="h-14 p-3 rounded-20 bg-choice text-xl text-center text-black"
                            style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                        >
                            <span className='absoulte pt-1.5 top-1'>
                                { question }
                            </span>
                        </div>
                        
                        <div className='h-14'>
                            <div className='flex-col space-y-2'>
                                {choices.map((choice) => (
                                    <SelectBox seq={choice.id} question={choice.choice} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}