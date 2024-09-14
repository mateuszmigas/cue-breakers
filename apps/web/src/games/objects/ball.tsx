import { Vector3 } from "@/types/geometry";
import { useLoader } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Mesh, TextureLoader, Group } from "three";
import { useSpring, animated, config } from "@react-spring/three";
import { gameConstants } from "@/constants";

export type GO_BallRef = {
  setPosition: (position: Vector3) => void;
  setRotation: (rotation: Vector3) => void;
};

export const GO_Ball = forwardRef<
  GO_BallRef,
  {
    index: number;
    position: Vector3;
    rotation: Vector3;
    scale: number;
    textureUrl: string;
  }
>((props, ref) => {
  const { position, rotation, scale, textureUrl } = props;
  const colorMap = useLoader(TextureLoader, textureUrl);
  const shadowMap = useLoader(TextureLoader, "textures/ball_shadow.jpg");
  const groupRef = useRef<Group>(null);
  const ballRef = useRef<Mesh>(null);
  const [active, setActive] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      setPosition: (newPosition: Vector3) => {
        groupRef.current?.position.set(
          newPosition.x,
          newPosition.y,
          newPosition.z
        );
      },
      setRotation: (newRotation: Vector3) => {
        ballRef.current?.rotation.set(
          newRotation.x,
          newRotation.y,
          newRotation.z
        );
      },
    }),
    []
  );

  const { newScale } = useSpring({
    newScale: active ? scale * 2 : scale,
    config: config.wobbly,
  });

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <animated.mesh
        ref={ballRef}
        scale={newScale}
        rotation={[rotation.x, rotation.y, rotation.z]}
        onClick={() => setActive(!active)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhongMaterial map={colorMap} specular={0xffffff} shininess={100} />
      </animated.mesh>
      <mesh position={[0, -0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry
          args={[
            gameConstants.ball.mesh_radius * 2,
            gameConstants.ball.mesh_radius * 2,
          ]}
        />
        <meshStandardMaterial
          color={0x000000}
          alphaMap={shadowMap}
          transparent={true}
        />
      </mesh>
    </group>
  );
});

