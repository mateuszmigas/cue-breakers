import { Vector3 } from "@/types/geometry";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export const GO_Ball = (props: {
  index: number;
  position: Vector3;
  rotation: Vector3;
  textureUrl: string;
}) => {
  const { position, rotation, textureUrl } = props;
  const colorMap = useLoader(TextureLoader, textureUrl);
  return (
    <mesh
      position={[position.x, position.y, position.z]}
      scale={0.15}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhongMaterial map={colorMap} specular={0xffffff} shininess={100} />
    </mesh>
  );
};

