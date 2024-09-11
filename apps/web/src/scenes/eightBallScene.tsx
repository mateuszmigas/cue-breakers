import { useFrame } from "@react-three/fiber";
import { GO_Ball } from "./objects/ball";
import { Stats, OrbitControls } from "@react-three/drei";
import { GO_Table } from "./objects/table";
import { memo, useRef } from "react";
import { Mesh } from "three";
import { GameObject, GameSession, GameType } from "@/wasm/game-logic";
import { useGameSession, useStateWithCurrent } from "@/hooks";
import { areArraysEqual } from "@/utils/array";

const constants = {
  edgeMinX: -2.731,
  edgeMaxX: 2.731,
  edgeMiddleX: 0.192,
  edgeMiddleZ: 0.03,
  edgeMinZ: -1.191,
  edgeMaxZ: 1.191,
  height: 1.42,
};

const balls = Array.from({ length: 160 }, (_, i) => {
  return {
    type: "ball",
    position: {
      x: (Math.random() - 0.5) * (constants.edgeMaxX - constants.edgeMinX),
      y: constants.height,
      z: (Math.random() - 0.5) * (constants.edgeMaxZ - constants.edgeMinZ),
    },
    rotation: {
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
    },
    textureUrl: `balls/ball_${i % 16}.png`,
  };
});

const getObjects = (
  gameSession: GameSession | null,
  memory: WebAssembly.Memory | null
): GameObject[] => {
  if (!gameSession || !memory) return [];
  const objectsPtr = gameSession.get_objects_ptr();
  const objectCount = gameSession.get_objects_count();

  const objectSize = 4 + 4 + 4 * 4;

  const dataView = new DataView(
    memory.buffer,
    objectsPtr,
    objectSize * objectCount
  );
  const objects: GameObject[] = [];
  for (let i = 0; i < objectCount; i++) {
    let byteOffset = i * objectSize;
    const object = {
      id: dataView.getUint32(byteOffset, true),
      typeId: dataView.getUint32((byteOffset += 4), true),
      x: dataView.getFloat32((byteOffset += 4), true),
      y: dataView.getFloat32((byteOffset += 4), true),
      z: dataView.getFloat32((byteOffset += 4), true),
      w: dataView.getFloat32((byteOffset += 4), true),
    } as never as GameObject;
    objects.push(object);
  }

  return objects;
};

export const EightBallGameScene = memo(() => {
  const ballsRefs = useRef<Mesh[]>([]);
  const [gameObjectsIds, setGameObjectsIds, getCurrentGameObjectIds] =
    useStateWithCurrent<number[]>([]);

  const [gameSessionInstance, gameSessionMemory] = useGameSession(
    GameType.EightBall
  );

  useFrame((_, delta) => {
    if (!gameSessionInstance) return;

    const gameObjects = getObjects(gameSessionInstance, gameSessionMemory);
    const currentIdsArray = gameObjects.map((obj) => obj.instance_id);

    if (!areArraysEqual(getCurrentGameObjectIds(), currentIdsArray)) {
      console.log("ids changed");
      setGameObjectsIds(currentIdsArray);
    }

    gameSessionInstance.update(delta);

    // console.log(gameSessionRef.current.get_objects());
    // const xx = balls.map((ball) => {
    //   return new Sphere(
    //     1,
    //     new Vector4f(ball.position.x, ball.position.y, ball.position.z, 0.05),
    //     new Vector4f(ball.rotation.x, ball.rotation.y, ball.rotation.z, 0.05),
    //     1
    //   );
    // });
    // const result = run_table_simulation(xx, new TableConfig(12), delta);

    // for (let i = 0; i < result.length; i++) {
    //   balls[i].position.x = result[i].position.x;
    //   balls[i].position.y = result[i].position.y;
    //   balls[i].position.z = result[i].position.z;
    //   balls[i].rotation.x = result[i].rotation.x;
    //   balls[i].rotation.y = result[i].rotation.y;
    //   balls[i].rotation.z = result[i].rotation.z;
    // }
    // balls.forEach((ball, index) => {
    //   if (ballsRefs.current[index]) {
    //     ballsRefs.current[index].position.x = ball.position.x;
    //     ballsRefs.current[index].position.y = ball.position.y;
    //     ballsRefs.current[index].position.z = ball.position.z;
    //     ballsRefs.current[index].rotation.x = ball.rotation.x;
    //     ballsRefs.current[index].rotation.y = ball.rotation.y;
    //     ballsRefs.current[index].rotation.z = ball.rotation.z;
    //   }
    // });
  });
  // });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 1, 0]} intensity={2} />
      <GO_Table />
      <mesh />
      {balls.map((ball, index) => (
        <GO_Ball
          ref={(ref: never) => (ballsRefs.current[index] = ref)}
          key={index}
          index={index}
          position={ball.position}
          rotation={ball.rotation}
          textureUrl={ball.textureUrl}
        />
      ))}
      <OrbitControls target={[0, 1.42, 0]} />
      <Stats />
    </>
  );
});
