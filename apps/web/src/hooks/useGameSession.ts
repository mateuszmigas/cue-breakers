import { GameType, GameSession } from "@/wasm/game-logic";
import { useEffect, useState } from "react";
import init_game_logic from "@wasm/game-logic/lib_game_logic";
import game_logic_url from "@wasm/game-logic/lib_game_logic_bg.wasm?url";

export const useGameSession = (
  gameType: GameType
): [GameSession | null, WebAssembly.Memory | null] => {
  const [gameSessionInstance, setGameSessionInstance] =
    useState<GameSession | null>(null);
  const [gameSessionMemory, setGameSessionMemory] =
    useState<WebAssembly.Memory | null>(null);

  useEffect(() => {
    init_game_logic(game_logic_url).then((initOutput) => {
      setGameSessionMemory(initOutput.memory);
      const gameSessionInstance = GameSession.new(gameType);
      for (let i = 0; i < 1000; i++) {
        gameSessionInstance.add_object(i, i + 1);
        // gameSessionInstance.add_object(2, 4);
      }
      setGameSessionInstance(gameSessionInstance);
    });
    return () => {
      // gameSessionInstance.current?.free();
      // gameSessionInstance.current = null;
      // gameSessionMemory.current = null;
    };
  }, [gameType]);

  return [gameSessionInstance, gameSessionMemory];
};

