import { GameSession } from "@/hooks/useGameSession";
import { GameObject } from "@/wasm/game-logic";

const sizes = {
  float32: 4,
  vec4: 4 * 4,
  uint32: 4,
};

type ByteOffset = { value: number };

const readFloat32 = (dataView: DataView, byteOffset: ByteOffset) => {
  const value = dataView.getFloat32(byteOffset.value, true);
  byteOffset.value += 4;
  return value;
};

const readUint32 = (dataView: DataView, byteOffset: ByteOffset) => {
  const value = dataView.getUint32(byteOffset.value, true);
  byteOffset.value += 4;
  return value;
};

const readVector4f = (dataView: DataView, byteOffset: ByteOffset) => {
  return {
    x: readFloat32(dataView, byteOffset),
    y: readFloat32(dataView, byteOffset),
    z: readFloat32(dataView, byteOffset),
    w: readFloat32(dataView, byteOffset),
  };
};

export const getObjects = (
  gameSession: GameSession | null,
  memory: WebAssembly.Memory | null
): GameObject[] => {
  if (!gameSession || !memory) return [];
  const objectsPtr = gameSession.get_objects_ptr();
  const objectCount = gameSession.get_objects_count();
  const rigidBodySize = sizes.vec4 * 4 + sizes.float32;
  const objectSize = rigidBodySize + sizes.uint32 + sizes.uint32;

  const dataView = new DataView(
    memory.buffer,
    objectsPtr,
    objectSize * objectCount
  );

  const objects: GameObject[] = [];
  const byteOffset = { value: 0 };

  for (let i = 0; i < objectCount; i++) {
    const object = {
      instance_id: readUint32(dataView, byteOffset),
      type_id: readUint32(dataView, byteOffset),
      rigid_body: {
        position: readVector4f(dataView, byteOffset),
        rotation: readVector4f(dataView, byteOffset),
        velocity: readVector4f(dataView, byteOffset),
        scale: readFloat32(dataView, byteOffset),
      },
    } as GameObject;

    objects.push(object);
  }

  return objects;
};

