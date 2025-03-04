'use client';

import { QRCodeSVG } from "qrcode.react";
import Link from 'next/link';
import { jaro } from '@/app/ui/font';
import { useState, useEffect, Suspense } from 'react';
import { getQuestions } from "@/app/lib/actions";
import { useWebSocket } from "@/app/context/WebSocketContext";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const provider = useWebSocket();
  const ws = provider?.ws;
  const players = provider?.players;


  useEffect(() => {
    // Récupération des questions
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestions();
        setQuestions(fetchedQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);


  return (
    <div className="h-screen flex flex-col">
      <div className="bg-[#4B1C80] h-[40%] flex justify-evenly items-center flex-row">
        <div className="flex flex-col items-center justify-center">
          <p className={`${jaro.className} antialiased text-9xl text-white underline`}>Offline</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-5xl text-white text-center py-8">
            {players ? Object.keys(players).length : 0}<br />Joueurs prêts
          </p>
          <Link className="flex justify-center items-center w-[250px] bg-[#E4B60E] text-white py-4 rounded-3xl text-lg hover:bg-yellow-400 transition duration-300 antialiased"
            href="/game" onClick={() => ws?.send(JSON.stringify({ action: "startGame" }))}>
            Lancer la partie
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Suspense fallback={<p>Loading...</p>}>
            <p className="text-5xl text-white text-center py-8">{questions.length}<br /> Questions</p>
          </Suspense>
          <Link className="flex justify-center items-center w-[250px] bg-[#C11717] text-white py-4 rounded-3xl text-lg hover:bg-red-600 transition duration-300 antialiased"
            href="/null">
            Modifier les questions
          </Link>
        </div>
        <div className="flex items-center justify-center px-4 py-4 bg-white rounded-3xl">
          <QRCodeSVG value={`http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_WEB_PORT}/join`} />
        </div>
      </div>

      <div className="bg-[#B097FB] w-screen h-screen flex flex-col items-start justify-start p-4">
         <div className="grid grid-cols-3 gap-4">
          {players ? Object.entries(players).map(([key, player]) => (
        <div key={key} className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl text-center text-black ">{player.pseudo}</p>
        </div>
          )) : null}
        </div>
      </div> 
    </div>
  );
}
