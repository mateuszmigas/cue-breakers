import { Vector3 } from "@/types/geometry";
import { useLoader } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Mesh, TextureLoader } from "three";
import { useSpring, animated, config } from "@react-spring/three";

export const GO_Ball = forwardRef(
  (
    props: {
      index: number;
      position: Vector3;
      rotation: Vector3;
      scale: number;
      textureUrl: string;
    },
    ref: React.Ref<Mesh>
  ) => {
    const { position, rotation, scale, textureUrl } = props;
    const colorMap = useLoader(TextureLoader, textureUrl);
    const innerRef = useRef<Mesh>(null);
    useImperativeHandle(ref, () => innerRef.current!, []);
    const [active, setActive] = useState(false);

    const { newScale } = useSpring({
      newScale: active ? scale * 2 : scale,
      config: config.wobbly,
    });

    return (
      <animated.mesh
        ref={innerRef}
        position={[position.x, position.y, position.z]}
        scale={newScale}
        rotation={[rotation.x, rotation.y, rotation.z]}
        onClick={() => setActive(!active)}
        // onUpdate={() => console.log("props have been updated")}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhongMaterial map={colorMap} specular={0xffffff} shininess={100} />
      </animated.mesh>
    );
  }
);

