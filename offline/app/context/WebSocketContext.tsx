"use client";

import { createContext, use, useContext, useEffect, useRef, useState } from "react";
import { Player, Question } from "@/app/lib/model";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

interface WebSocketContextType {
  ws: WebSocket | null;
  players: { [key: number]: Player };
  player: Player | null;
  question: Question | null;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const ws = useRef<WebSocket | null>(null);
  const [players, setPlayers] = useState<{ [key: number]: Player }>({});
  const [player, setPlayer] = useState<Player | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("Player updated:", player);
  }
  , [player]);


  useEffect(() => {
    if (!ws.current) {

      ws.current = new WebSocket(`ws://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_WS_PORT}`);

      ws.current.onopen = () => {
        console.log("✅ WebSocket connecté !")
        ws.current?.send(JSON.stringify({ action: "getPlayers" }));
        ws.current?.send(JSON.stringify({ action: "getQuestion", id: 0 }));

      }


      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("📩 Reçu :", data);

        if (data.action === "updatePlayers") {
          setPlayers(data.players);
        }

        else if (data.action === "joined") {
          const player: Player = { pseudo: data.player.pseudo, score: data.player.score, id: data.id };
          setPlayer(player);
        }

        else if (data.action === "gameStatus") {
          if (data.status === "on") {
            router.push("/game");
          }
        }

        else if (data.action === "startGame") {
          router.push("/game");
        }

        else if (data.action === "question") {
          setQuestion(data.question as Question);
        }

        else if (data.action === "next_question") {
          if (data.question.question === "STOP"){
            router.push("/results");
          }else{
            router.push("/game");
            setQuestion(data.question as Question);
          }


          
          
        }
          
        else if (data.action === "answer") {
          router.push("/game/response");
        }


      };

      ws.current.onclose = () => console.log("WebSocket déconnecté.");
    }

    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    console.log("Players updated:", players);
  }, [players]);


  return (
    <WebSocketContext.Provider value={{ ws: ws.current, players, player, question: question }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
