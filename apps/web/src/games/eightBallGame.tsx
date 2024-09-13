import { Canvas, useFrame } from "@react-three/fiber";
import { GO_Ball } from "./objects/ball";
import { Stats, OrbitControls } from "@react-three/drei";
import { GO_Table } from "./objects/table";
import { memo, useRef } from "react";
import { EightBallGameSession, GameObject } from "@/wasm/game-logic";
import { useGameSession, useStateWithRef } from "@/hooks";
import { areArraysEqual } from "@/utils/array";
import { Mesh } from "three";
import { getObjects } from "./objects/mapper";
import { Button } from "@/components/ui/button";
import { GameSession } from "@/hooks/useGameSession";

const GameScene = memo(
  (props: {
    gameSessionInstance: GameSession;
    gameSessionMemory: WebAssembly.Memory;
    gameObjects: GameObject[];
    setGameObjects: (newState: GameObject[]) => void;
    gameObjectsRef: GameObject[];
  }) => {
    const {
      gameSessionInstance,
      gameSessionMemory,
      gameObjects,
      setGameObjects,
      gameObjectsRef,
    } = props;
    const ballsRefs = useRef<Mesh[]>([]);

    useFrame((_, delta) => {
      if (!gameSessionInstance) return;

      const newGameObjects = getObjects(gameSessionInstance, gameSessionMemory);

      if (
        !areArraysEqual(
          gameObjectsRef.map((obj) => obj.instance_id),
          getObjects(gameSessionInstance, gameSessionMemory).map(
            (obj) => obj.instance_id
          )
        )
      ) {
        setGameObjects(newGameObjects);
      }

      gameSessionInstance.update(delta);

      const updatedObjects = getObjects(gameSessionInstance, gameSessionMemory);

      for (let i = 0; i < updatedObjects.length; i++) {
        const updatedObject = updatedObjects[i];
        const ballRef = ballsRefs.current[i];
        if (ballRef) {
          ballRef.position.set(
            updatedObject.position.x,
            updatedObject.position.y,
            updatedObject.position.z
          );
          ballRef.rotation.set(
            updatedObject.rotation.x,
            updatedObject.rotation.y,
            updatedObject.rotation.z
          );
        }
      }
    });

    return (
      <>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 1, 0]} intensity={2} />
        <GO_Table />
        <mesh />
        {gameObjects.map((ball, index) => (
          <GO_Ball
            ref={(ref: never) => (ballsRefs.current[index] = ref)}
            key={index}
            index={index}
            position={ball.position}
            rotation={ball.rotation}
            scale={ball.scale}
            textureUrl={`balls/ball_${index % 16}.png`}
          />
        ))}
        <OrbitControls target={[0, 1.42, 0]} />
        <Stats />
      </>
    );
  }
);

export const EightBallGame = memo(() => {
  const [gameObjects, setGameObjects, gameObjectsRef] = useStateWithRef<
    GameObject[]
  >([]);

  const [gameSessionInstance, gameSessionMemory] = useGameSession(
    "eight_ball"
  ) as [EightBallGameSession, WebAssembly.Memory];

  return (
    <div className="size-full relative overflow-hidden">
      {gameSessionInstance && gameSessionMemory && (
        <Canvas
          fallback={<div>Sorry no WebGL supported!</div>}
          className="size-full absolute"
          camera={{ position: [5, 5, 5], fov: 45 }}
        >
          <GameScene
            gameSessionInstance={gameSessionInstance}
            gameSessionMemory={gameSessionMemory}
            gameObjects={gameObjects}
            setGameObjects={setGameObjects}
            gameObjectsRef={gameObjectsRef}
          ></GameScene>
        </Canvas>
      )}
      <div className="absolute top-0 right-0 flex flex-col gap-2 p-2">
        <Button
          onClick={() => {
            gameSessionInstance?.add_balls(100);
          }}
        >
          Add 100 balls
        </Button>
        <Button
          onClick={() => {
            gameSessionInstance?.clear_balls();
          }}
        >
          Clear balls
        </Button>
        <span className="text-white">{`Balls count ${gameObjects.length}`}</span>
      </div>
    </div>
  );
});

