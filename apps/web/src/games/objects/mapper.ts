import { GameSession } from "@/hooks/useGameSession";
import { GameObject } from "@/wasm/game-logic";

export const getObjects = (
  gameSession: GameSession | null,
  memory: WebAssembly.Memory | null
): GameObject[] => {
  if (!gameSession || !memory) return [];
  const objectsPtr = gameSession.get_objects_ptr();
  const objectCount = gameSession.get_objects_count();

  const objectSize =
    4 + // id
    4 + // typeId
    4 * 4 + // position
    4 * 4 + // rotation
    4 * 4 + // velocity
    4; // scale

  const dataView = new DataView(
    memory.buffer,
    objectsPtr,
    objectSize * objectCount
  );
  const objects: GameObject[] = [];
  for (let i = 0; i < objectCount; i++) {
    let byteOffset = i * objectSize;
    const object = {
      id: dataView.getUint32(byteOffset, true),
      typeId: dataView.getUint32((byteOffset += 4), true),
      position: {
        x: dataView.getFloat32((byteOffset += 4), true),
        y: dataView.getFloat32((byteOffset += 4), true),
        z: dataView.getFloat32((byteOffset += 4), true),
        w: dataView.getFloat32((byteOffset += 4), true),
      },
      rotation: {
        x: dataView.getFloat32((byteOffset += 4), true),
        y: dataView.getFloat32((byteOffset += 4), true),
        z: dataView.getFloat32((byteOffset += 4), true),
        w: dataView.getFloat32((byteOffset += 4), true),
      },
      velocity: {
        x: dataView.getFloat32((byteOffset += 4), true),
        y: dataView.getFloat32((byteOffset += 4), true),
        z: dataView.getFloat32((byteOffset += 4), true),
        w: dataView.getFloat32((byteOffset += 4), true),
      },
      scale: dataView.getFloat32((byteOffset += 4), true),
    } as never as GameObject;

    objects.push(object);
  }

  return objects;
};

