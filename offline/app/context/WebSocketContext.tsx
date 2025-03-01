"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Player } from "@/app/lib/model";

interface WebSocketContextType {
  ws: WebSocket | null;
  players: { [key: number]: Player };
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const ws = useRef<WebSocket | null>(null);
  const [players, setPlayers] = useState<{ [key: number]: Player }>({});


  useEffect(() => {
    if (!ws.current) {

      ws.current = new WebSocket(`ws://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_WS_PORT}`);

      ws.current.onopen = () => {
        console.log("✅ WebSocket connecté !")
        ws.current?.send(JSON.stringify({ action: "getPlayers" }));

      }


      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("📩 Reçu :", data);

        if (data.action === "updatePlayers") {
          setPlayers(data.players);
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
    <WebSocketContext.Provider value={{ws:ws.current, players:players }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
