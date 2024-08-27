import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const GO_Table = () => {
  const gltf = useLoader(GLTFLoader, "/Scene.gltf");
  return <primitive object={gltf.scene} />;
};

