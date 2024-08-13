import { apiURL, socketURL } from "@/constants";
import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const socket = io(socketURL);
let connected = false;

export type GameRoom = {
  id: string;
  name: string;
};

export type SignalServer = {
  getRooms: () => Promise<GameRoom[]>;
  onRoomsUpdate: (callback: (rooms: GameRoom[]) => void) => void;
  createRoom: (name: string) => Promise<GameRoom>;
  joinRoom: (roomId: string) => void;
};

export const useSignalServer = (): SignalServer => {
  useEffect(() => {
    if (connected) return;
    connected = true;

    socket.on("connect", () => {
      console.log("Connected to socket server", socket.id);
      socket.emit("join", "room1");
    });
    socket.on("message", (msg) => {
      console.log("Message received", msg);
    });
    // socket.on("messages", (msgs) => {
    //   setMessages(messages);
    // });
  }, []);
  const signalServer = useMemo(
    () => ({
      getRooms: async () => {
        const response = await fetch(`${apiURL}/api/rooms`);
        const data = await response.json();
        return data;
      },
      onRoomsUpdate: () => {},
      createRoom: async (name: string) => {
        const response = await fetch(`${apiURL}/api/rooms`, {
          method: "POST",
          body: JSON.stringify({ name }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        return data as GameRoom;
      },
      joinRoom: () => {},
    }),
    []
  );
  return signalServer;
};

