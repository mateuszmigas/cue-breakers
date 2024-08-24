import { useEffect } from "react";
import { sceneRenderer } from "./scenes/sceneRenderer";

export const useGameController = () => {
  useEffect(() => {
    //load game assets

    let animationFrameHandle: number;
    const runGameLoop = () => {
      //game logic
      sceneRenderer.render();

      animationFrameHandle = requestAnimationFrame(runGameLoop);
    };

    animationFrameHandle = requestAnimationFrame(runGameLoop);

    return () => {
      cancelAnimationFrame(animationFrameHandle);
    };
  }, []);
};

