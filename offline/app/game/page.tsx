"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Player {
    pseudo: string;
    score: number;
}

export default function GamePage() {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [pseudo, setPseudo] = useState("");
    const [players, setPlayers] = useState<Record<string, Player>>({});
    const [question, setQuestion] = useState("");

    useEffect(() => {
        const socketInstance = io("http://192.168.1.13:3001");

        socketInstance.on("connect", () => console.log("✅ Connecté au WebSocket"));

        socketInstance.on("updatePlayers", (data: Record<string, Player>) => {
            setPlayers(data);
        });

        socketInstance.on("question", (q: string) => {
            setQuestion(q);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    const joinGame = () => {
        if (socket && pseudo) {
            socket.emit("join", pseudo);
        }
    };

    return (
        <div>
            <h1>🎯 Jeu Quiz</h1>
            <input
                type="text"
                placeholder="Entrez votre pseudo"
                onChange={(e) => setPseudo(e.target.value)}
            />
            <button onClick={joinGame}>Rejoindre</button>

            <h2>📝 Question : {question}</h2>

            <h2>🏆 Joueurs :</h2>
            <ul>
                {Object.entries(players).map(([id, player]) => (
                    <li key={id}>{player.pseudo} - {player.score} points</li>
                ))}
            </ul>
        </div>
    );
}
