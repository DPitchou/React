'use client';

import { QRCodeSVG } from "qrcode.react";
import Link from 'next/link';
import { jaro } from '@/app/ui/font';
import { useState, useEffect, Suspense } from 'react';
import io from "socket.io-client";
import { getQuestions } from "@/app/lib/actions";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [players, setPlayers] = useState<{ pseudo: string; points: number }[]>([]);
  const [pseudo, setPseudo] = useState('');
  const [socket, setSocket] = useState<any>(null);

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

  useEffect(() => {
    const newSocket = io('http://localhost:3001', { path: '/api/socket' });
    setSocket(newSocket);

    newSocket.on('playersUpdate', (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-[#4B1C80] h-[40%] flex justify-evenly items-center flex-row">
        <div className="flex flex-col items-center justify-center">
          <p className={`${jaro.className} antialiased text-9xl text-white underline`}>Offline</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-5xl text-white text-center py-8">
            {players.length}<br />Joueurs prêts
          </p>
          <Link className="flex justify-center items-center w-[250px] bg-[#E4B60E] text-white py-4 rounded-3xl text-lg hover:bg-yellow-400 transition duration-300 antialiased"
            href="/1">
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
          <QRCodeSVG value="http://192.168.1.254:3000" />
        </div>
      </div>

      <div className="bg-[#B097FB] w-screen h-screen flex flex-col items-center justify-center">
      </div>
    </div>
  );
}
