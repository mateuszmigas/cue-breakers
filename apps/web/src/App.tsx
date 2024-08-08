import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";

type GameRoom = {
  id: string;
  name: string;
};

export const App = () => {
  const [rooms, setRooms] = useState<GameRoom[]>([]);

  const fetchRoons = () => {
    fetch("http://localhost:3000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  };

  useEffect(() => {
    const root = window.document.documentElement!;
    root.classList.add("dark");
    fetchRoons();
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
            fetchRoons();
          });
        }}
      >
        Click me
      </Button>
      <div>
        {rooms.map((room) => (
          <div key={room.id}>{room.name}</div>
        ))}
      </div>
    </div>
  );
};
