import React, { useState } from 'react';
import SelectBox from './SelectBox';
import Loading from '../components/Loading'

interface ChoiceProps {
    story: string;
    question: string;
    choices: { choice: string }[];
}

export default function Choice({ story, question, choices }: ChoiceProps) {
    const selectArray = ["A", "B", "C", "D"]
    return (
      <div className="w-screen h-screen bg-white/60 absolute top-0 left-0 overflow-scroll pt-32">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="lg:w-7/12 md:w-9/12 w-full p-4">
            <div className="flex flex-col space-y-4">
              <div
                className="overflow-y-scroll h-[350px] px-16 py-9 bg-beige-white text-left text-black"
                style={{
                  boxShadow:
                    "0px 4px 15px 10px rgba(0, 0, 0, 0.25) inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  backdropFilter: "blur(5px)",
                }}
              >
                <span className="h-4/6 text-xl">
                  {story.split("\n").map((line, index) => (
                    <span key={index}>{line}<br/></span>
                  ))}
                </span>
              </div>
              <div
                className="h-14 p-3 rounded-20 bg-choice xl:text-xl text-lg text-center text-black"
                style={{
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <span className="absoulte pt-1.5 top-1">{question}</span>
              </div>
            </div>
          </div>
          <div className="lg:w-7/12 md:w-9/12 w-full px-6 flex flex-col space-y-2">
            {
              choices.map((choice, index) => (
                <SelectBox key={index} seq={selectArray[index]} question={choice.choice} />
              ))
              
            }
          </div>
        </div>
      </div>
    );
  }
  