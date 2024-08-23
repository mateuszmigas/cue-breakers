import { serverUrl } from "@/constants";
import { useEffect, useMemo, useRef } from "react";
import { io } from "socket.io-client";

const socket = io(serverUrl);
let connected = false;

export type GameRoom = {
  id: string;
  name: string;
  playerId: number;
};

export type SignalServer = {
  getRooms: () => Promise<GameRoom[]>;
  onRoomsUpdate: (callback: (rooms: GameRoom[]) => void) => void;
  createRoom: (name: string) => Promise<GameRoom>;
  joinRoom: (roomId: string) => void;
};

export const useSignalServer = (): SignalServer => {
  const roomsUpdateCallbacksRef = useRef<((rooms: GameRoom[]) => void)[]>([]);

  useEffect(() => {
    if (connected) return;
    connected = true;
    socket.on("connect", () => {
      console.log("Connected to socket server", socket.id);
    });
    socket.on("message_room_created", (rooms: GameRoom[]) => {
      roomsUpdateCallbacksRef.current.forEach((cb) => cb(rooms));
    });
  }, []);

  const signalServer = useMemo(
    () => ({
      getRooms: async () => {
        const response = await fetch(`${serverUrl}api/rooms`);
        const data = await response.json();
        return data;
      },
      onRoomsUpdate: (callback: (rooms: GameRoom[]) => void) => {
        roomsUpdateCallbacksRef.current.push(callback);
        return () => {
          roomsUpdateCallbacksRef.current =
            roomsUpdateCallbacksRef.current.filter((cb) => cb !== callback);
        };
      },
      createRoom: async (name: string) => {
        const response = await fetch(`${serverUrl}api/rooms`, {
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

