import { useFrame } from "@react-three/fiber";
import { GO_Ball } from "./objects/ball";
import { Stats, OrbitControls } from "@react-three/drei";
import { GO_Table } from "./objects/table";
import { useRef } from "react";
import { Mesh } from "three";

/*
gamestate:
  - game state: room
  - local state vs saved state

*/

const constants = {
  edgeMinX: -2.731,
  edgeMaxX: 2.731,
  edgeMiddleX: 0.192,
  edgeMiddleZ: 0.03,
  edgeMinZ: -1.191,
  edgeMaxZ: 1.191,
  height: 1.42,
};

const balls = Array.from({ length: 16 }, (_, i) => {
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
    textureUrl: `balls/ball_${i}.png`,
  };
});

export const EightBallGameScene = () => {
  const ballsRefs = useRef<Mesh[]>([]);

  useFrame((_, delta) => {
    ballsRefs.current.forEach((ball) => {
      ball.rotation.x += delta;
      ball.rotation.y += delta;
    });
  });

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
};
