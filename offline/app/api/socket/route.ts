import { Server as SocketIOServer } from "socket.io";
import { NextRequest } from "next/server";

interface Player {
    pseudo: string;
    score: number;
}

let players: Record<string, Player> = {};
let ioInstance: SocketIOServer | null = null;

export function GET(req: NextRequest) {
    if (!ioInstance) {
        const io = new SocketIOServer(3001, { cors: { origin: "*" } });
        ioInstance = io;

        io.on("connection", (socket) => {
            console.log("🟢 Un joueur connecté :", socket.id);

            socket.on("join", (pseudo: string) => {
                players[socket.id] = { pseudo, score: 0 };
                console.log(`👤 ${pseudo} a rejoint la partie`);
                io.emit("updatePlayers", players);
            });

            socket.on("answer", ({ correct }: { correct: boolean }) => {
                if (correct) players[socket.id].score += 10;
                io.emit("updatePlayers", players);
            });

            socket.on("disconnect", () => {
                console.log("🔴 Joueur déconnecté :", socket.id);
                delete players[socket.id];
                io.emit("updatePlayers", players);
            });
        });

        startGame(io);
    }

    return new Response("Socket.io Server Running", { status: 200 });
}

const questions = [
    { question: "Quel est le plus grand océan ?", answer: "Pacifique" },
    { question: "Combien de continents y a-t-il ?", answer: "7" }
];

function startGame(io: SocketIOServer) {
    let i = 0;
    setInterval(() => {
        if (i < questions.length) {
            io.emit("question", questions[i].question);
            i++;
        }
    }, 5000);
}
