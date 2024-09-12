import { useFrame } from "@react-three/fiber";
import { GO_Ball } from "./objects/ball";
import { Stats, OrbitControls } from "@react-three/drei";
import { GO_Table } from "./objects/table";
import { memo, useRef } from "react";
import { GameObject, GameType } from "@/wasm/game-logic";
import { useGameSession, useStateWithRef } from "@/hooks";
import { areArraysEqual } from "@/utils/array";
import { Mesh } from "three";
import { getObjects } from "./objects/mapper";

export const EightBallGameScene = memo(() => {
  const ballsRefs = useRef<Mesh[]>([]);
  const [gameObjects, setGameObjects, gameObjectsRef] = useStateWithRef<
    GameObject[]
  >([]);

  const [gameSessionInstance, gameSessionMemory] = useGameSession(
    GameType.EightBall
  );

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
});
