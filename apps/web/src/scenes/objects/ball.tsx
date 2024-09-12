import { Vector3 } from "@/types/geometry";
import { useLoader } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Mesh, TextureLoader } from "three";

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

    return (
      <mesh
        ref={innerRef}
        position={[position.x, position.y, position.z]}
        scale={scale}
        rotation={[rotation.x, rotation.y, rotation.z]}
        // onClick={(e) => console.log("click")}
        // onUpdate={() => console.log("props have been updated")}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhongMaterial map={colorMap} specular={0xffffff} shininess={100} />
      </mesh>
    );
  }
);
