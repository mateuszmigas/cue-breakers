import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";

import { GameRoom, useSignalServer } from "./hooks/useSignalServer";

export const App = () => {
  const [rooms, setRooms] = useState<GameRoom[]>([]);

  const signalServer = useSignalServer();

  useEffect(() => {
    signalServer.getRooms().then(setRooms);
    const unsubscribe = signalServer.onRoomsUpdate(setRooms);
    return unsubscribe;
  }, [signalServer]);

  useEffect(() => {
    const root = window.document.documentElement!;
    root.classList.add("dark");
  }, []);

  return (
    <div className="size-full">
      <Button
        onClick={async () => {
          const newRoom = await signalServer.createRoom("Room");
          setRooms((rooms) => [...rooms, newRoom]);
        }}
      >
        Click me
      </Button>
      <Button
        onClick={() => {
          // socket.emit("message", {
          //   room: "room1",
          //   text: "Hello from client",
          // });
        }}
      >
        Message
      </Button>
      <div>
        {rooms.map((room) => (
          <div key={room.id}>{room.name}</div>
        ))}
      </div>
    </div>
  );
};

