import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");
let connected = false;

type GameRoom = {
  id: string;
  name: string;
};

export const App = () => {
  const [rooms, setRooms] = useState<GameRoom[]>([]);

  const fetchRooms = () => {
    fetch("http://localhost:3000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  };

  useEffect(() => {
    const root = window.document.documentElement!;
    root.classList.add("dark");
    fetchRooms();
  }, []);

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

  return (
    <div className="size-full">
      <Button
        onClick={() => {
          fetch("http://localhost:3000/api/rooms", {
            method: "POST",
            body: JSON.stringify({ name: "new" }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then(() => {
            fetchRooms();
          });
        }}
      >
        Click me
      </Button>
      <Button
        onClick={() => {
          socket.emit("message", {
            room: "room1",
            text: "Hello from client",
          });
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

