import { useFrame } from "@react-three/fiber";
import { GO_Ball } from "./objects/ball";
import { Stats, OrbitControls } from "@react-three/drei";
import { GO_Table } from "./objects/table";
import { memo, useRef } from "react";
import { Mesh } from "three";
import {
  run_table_simulation,
  Sphere,
  TableConfig,
  Vector4f,
} from "@/wasm/physics";
import { GameType } from "@/wasm/game-logic";
import { useGameSession } from "@/hooks";

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

export const EightBallGameScene = memo(() => {
  const ballsRefs = useRef<Mesh[]>([]);
  const gameSessionRef = useGameSession(GameType.EightBall);

  useFrame((_, delta) => {
    if (!gameSessionRef.current) return;

    gameSessionRef.current.update(delta);

    // console.log(gameSessionRef.current.get_objects());
    const xx = balls.map((ball) => {
      return new Sphere(
        1,
        new Vector4f(ball.position.x, ball.position.y, ball.position.z, 0.05),
        new Vector4f(ball.rotation.x, ball.rotation.y, ball.rotation.z, 0.05),
        1
      );
    });
    const result = run_table_simulation(xx, new TableConfig(12), delta);

    for (let i = 0; i < result.length; i++) {
      balls[i].position.x = result[i].position.x;
      balls[i].position.y = result[i].position.y;
      balls[i].position.z = result[i].position.z;
      balls[i].rotation.x = result[i].rotation.x;
      balls[i].rotation.y = result[i].rotation.y;
      balls[i].rotation.z = result[i].rotation.z;
    }
    balls.forEach((ball, index) => {
      if (ballsRefs.current[index]) {
        ballsRefs.current[index].position.x = ball.position.x;
        ballsRefs.current[index].position.y = ball.position.y;
        ballsRefs.current[index].position.z = ball.position.z;
        ballsRefs.current[index].rotation.x = ball.rotation.x;
        ballsRefs.current[index].rotation.y = ball.rotation.y;
        ballsRefs.current[index].rotation.z = ball.rotation.z;
      }
    });
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
