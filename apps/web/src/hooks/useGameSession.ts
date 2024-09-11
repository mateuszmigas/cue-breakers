import { GameType, GameSession } from "@/wasm/game-logic";
import { useRef, useEffect } from "react";

export const useGameSession = (gameType: GameType) => {
  const gameSessionRef = useRef<GameSession | null>(null);

  useEffect(() => {
    gameSessionRef.current = GameSession.new(gameType);
    gameSessionRef.current?.add_object(1);
    gameSessionRef.current?.add_object(2);
    return () => gameSessionRef.current?.free();
  }, [gameType]);

  return gameSessionRef;
};

