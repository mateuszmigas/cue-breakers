import { useEffect, useState } from "react";
import init_game_logic, {
  EightBallGameSession,
  NineBallGameSession,
} from "@wasm/game-logic/lib_game_logic";
import game_logic_url from "@wasm/game-logic/lib_game_logic_bg.wasm?url";

export type GameSession = EightBallGameSession | NineBallGameSession;
export type GameType = "eight_ball" | "nine_ball";

export const createGameSession = (gameType: GameType): GameSession => {
  switch (gameType) {
    case "eight_ball":
      return EightBallGameSession.new();
    case "nine_ball":
      return NineBallGameSession.new();
    default:
      throw new Error("Invalid game type");
  }
};

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
      const gameSessionInstance = createGameSession(gameType);
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

