'use client';

import { useWebSocket } from "@/app/context/WebSocketContext";


export default function Results() {

    const {ws, players} = useWebSocket() || {};

    const scoreBoard = Object.values(players || {}).sort((a, b) => b.score - a.score);




    return (
        <div className="h-screen bg-[#4B1C80] flex-col items-center justify-start flex">
            <h1 className="text-white text-8xl mb-8 mt-4 hidden md:flex ">Fin de la partie !</h1>
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-4 hidden md:block">
            <ul className="w-full text-lg">
                {scoreBoard.map((player, index) => (
                <li key={index} className="text-black flex justify-between py-2 border-b w-full text-3xl">
                    <span>{player.pseudo}</span>
                    <span>{player.score}</span>
                </li>
                ))}
            </ul>
            </div>
            <div className="w-full max-w-6x p-4 flex text-center font-semibold items-center justify-center text-3xl text-white md:hidden h-full">
                Regardez les résultats à l'écran ...
            </div>
        </div>


    );


}
