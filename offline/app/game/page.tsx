'use client';

import { useWebSocket } from "@/app/context/WebSocketContext";
import { useEffect, useState } from "react";
import clsx from 'clsx';


export default function Game() {

    const {ws, question, player } = useWebSocket() || {};
    const [showAnswer, setShowAnswer] = useState(false);
    const [waiting, setWaiting] = useState(false);

    if (!question) return <div>Chargement...</div>;

    function handleResponse(choice: string) {
        if (showAnswer) return;
        setWaiting(true);
        if (choice === question?.answer) {
            ws?.send(JSON.stringify({ action: "updateScore", "id": player?.id , "score": 2}));
        }
        else {
            ws?.send(JSON.stringify({ action: "updateScore", "id": player?.id , "score": -1}));
        }

    }

    function handleQuestion() {
      if (showAnswer) {
        setShowAnswer(false);
        ws?.send(JSON.stringify({ action: "nextQuestion"}));
        setWaiting(false);
      }
      else {
        setShowAnswer(true);
        ws?.send(JSON.stringify({ action: "showAnswer"}));
      }
    }




    return (
        <div className="h-screen flex flex-col items-center justify-center">
          {/* Section de la question - Affichée uniquement sur desktop */}
          <div className="hidden md:flex h-1/3 items-center justify-center bg-[#4B1C80] w-screen">
            <div className="flex justify-center items-center w-full px-4 relative h-full">
              <h4 className="text-white font-semibold text-center text-7xl">
            Question:<br></br>
            {question.question}
              </h4>
              <button
            className="bg-[#E4B60E] text-white font-semibold py-2 px-4 rounded absolute bottom-4 right-4"
            onClick={() => handleQuestion()}
              >
            {showAnswer ? 'Question suivante >>' : 'Réponse ?'}
              </button>
            </div>
          </div>
          
          {waiting && (
                <div className="md:hidden flex items-center justify-center w-full h-full bg-[#4B1C80]">
                <h4 className="text-white font-semibold text-center text-3xl">
                  Attendez la prochaine question...
                </h4>
                </div>
            )}
          {!waiting && (
            <div className="h-full md:h-2/3 grid grid-cols-2 grid-rows-2 gap-4 px-4 py-4 bg-[#B097FB] w-screen">
            {question.choices.map((choice, index) => {
              const colors = ['bg-[#3084D7]', 'bg-[#E4B60E]', 'bg-[#C11717]', 'bg-[#0FB430]'];
              const bgColor = colors[index % colors.length];
              const isIncorrect = showAnswer && choice !== question.answer;
              const incorrectBgColor = ['bg-blue-300', 'bg-yellow-200', 'bg-red-300', 'bg-green-300'][index % colors.length];

              return (
            <button
              key={index}
              className={clsx(bgColor, 'max-h-full max-w-full rounded-xl flex items-center justify-center', {
                [incorrectBgColor]: isIncorrect,
              })}
              onClick={() => handleResponse(choice)}
            >
                <h5 className="text-white font-semibold text-3xl md:text-5xl">{choice}</h5>
            </button>
              );
            })}
          </div>
          )}
        </div>
      );
      
} 