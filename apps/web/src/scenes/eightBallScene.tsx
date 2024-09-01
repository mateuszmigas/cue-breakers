import { useFrame } from "@react-three/fiber";
import { GO_Ball } from "./objects/ball";
import { Stats, OrbitControls } from "@react-three/drei";
import { GO_Table } from "./objects/table";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import {
  add_floats,
  run_table_simulation,
  Sphere,
  TableConfig,
  Vector4f,
} from "@/wasm/physics";

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

export const EightBallGameScene = () => {
  const ballsRefs = useRef<Mesh[]>([]);

  useEffect(() => {
    const sphers = balls.map((ball, index) => {
      return new Sphere(
        index,
        new Vector4f(ball.position.x, ball.position.y, ball.position.z, 0),
        2
      );
    });

    console.time("table_simulation");
    run_table_simulation(sphers, new TableConfig(12));
    console.timeEnd("table_simulation");
  }, []);

  useFrame((_, delta) => {
    ballsRefs.current.forEach((ball) => {
      ball.rotation.x = add_floats(ball.rotation.x, delta);
      ball.rotation.y = add_floats(ball.rotation.y, delta);
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

