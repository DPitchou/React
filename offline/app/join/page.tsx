'use client';

import { jaro } from "@/app/ui/font";
import { useState } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";

export default function Join() {
    const [pseudo, setPseudo] = useState('');
    const router = useRouter();

    const handleSubmit = () => {
        if (!pseudo.trim()) return;
        
        const socket = io('http://192.168.1.13:3001', { path: '/api/socket' });

        socket.emit('join', pseudo);

        // // Stocke le pseudo en session pour l'utiliser dans la page de jeu
        // sessionStorage.setItem('playerPseudo', pseudo);

    };

    return (
        <div className="h-screen bg-[#4B1C80] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-between h-1/3">
                <p className={`${jaro.className} antialiased text-9xl text-white underline`}>Offline</p>
                
                <input
                    type="text"
                    placeholder="Ex: Player123"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    className="w-80 p-3 bg-white border border-gray-600 
                        rounded-xl focus:outline-none focus:ring-2 
                        focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                />
                <button
                    onClick={handleSubmit}
                    className="px-5 py-2 bg-teal-500 text-white font-semibold rounded-xl 
                        hover:bg-teal-600 transition-all mt-4"
                >
                    Rejoindre
                </button>
            </div>
        </div>
    );
}
