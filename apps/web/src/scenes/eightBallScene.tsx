import { Canvas, useFrame } from "@react-three/fiber";
import { GO_Ball } from "./objects/ball";
import { Stats, OrbitControls } from "@react-three/drei";
import { GO_Table } from "./objects/table";
import { useRef } from "react";
import { PerspectiveCamera } from "three";

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

function RotatingCamera() {
  const cameraRef = useRef<PerspectiveCamera | null>(null);

  useFrame(() => {
    if (cameraRef.current) {
      // console.log("rotating camera");
      cameraRef.current.rotation.y += 0.1; // Adjust the rotation speed here
    }
  });

  return <perspectiveCamera ref={cameraRef} position={[5, 5, 5]} />;
}

export const EightBallGameScene = () => {
  return (
    <Canvas
      className="size-full absolute"
      camera={{ position: [5, 5, 5], fov: 45 }}
    >
      <RotatingCamera />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <GO_Table />
      {balls.map((ball, index) => (
        <GO_Ball
          key={index}
          index={index}
          position={ball.position}
          rotation={ball.rotation}
          textureUrl={ball.textureUrl}
        />
      ))}
      <OrbitControls />
      <Stats />
    </Canvas>
  );
};
