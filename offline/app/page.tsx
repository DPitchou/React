'use client';

import { QRCodeSVG } from "qrcode.react";
import Link from 'next/link';
import {jaro} from '@/app/ui/font';


export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-[#4B1C80] h-[40%] flex justify-evenly items-center flex-row" >
        <div className="flex flex-col items-center justify-center">
          <p className={`${jaro.className} antialiased text-9xl text-white` }>Offline</p>
          <Link className="flex justify-center items-center w-[250px] bg-[#3084D7] text-white py-4 rounded-3xl text-lg hover:bg-blue-400 transition duration-300 antialiased"
          href="/null">
            Initialiser le jeu
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-5xl text-white text-center py-8">25 <br></br> Joueurs prêts</p>
          <Link className="flex justify-center items-center w-[250px] bg-[#E4B60E] text-white w-90 py-4 rounded-3xl text-lg hover:bg-yellow-400 transition duration-300 antialiased"
          href="/null">
            Lancer la partie
            
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-5xl text-white text-center py-8">10<br></br> Questions</p>
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

