import { useEffect } from "react";
import { PlayModePage } from "./pages/playModePage";
import { useSessionStore } from "./store";
import { SceneItem, sceneRenderer } from "./scenes/sceneRenderer";
import { Button } from "./components/ui/button";
import { useGameController } from "./useGameController";

const constants = {
  edgeMinX: -2.731,
  edgeMaxX: 2.731,
  edgeMiddleX: 0.192,
  edgeMiddleZ: 0.03,
  edgeMinZ: -1.191,
  edgeMaxZ: 1.191,
  height: 1.42,
};

export const App = () => {
  // const [rooms, setRooms] = useState<GameRoom[]>([]);

  // const signalServer = useSignalServer();

  // useEffect(() => {
  //   signalServer.getRooms().then(setRooms);
  //   const unsubscribe = signalServer.onRoomsUpdate(setRooms);dsa
  //   return unsubscribe;
  // }, [signalServer]);

  const { page } = useSessionStore();

  useEffect(() => {
    const balls = Array.from({ length: 16 }, (_, i) => {
      return {
        type: "ball",
        position: [
          (Math.random() - 0.5) * (constants.edgeMaxX - constants.edgeMinX),
          constants.height,
          (Math.random() - 0.5) * (constants.edgeMaxZ - constants.edgeMinZ),
        ],
        textureUrl: `balls/ball_${i}.png`,
      } as SceneItem;
    });
    sceneRenderer.setItems("balls", balls);
    sceneRenderer.setItems("table", [
      {
        type: "gltf-static",
        url: "Scene.gltf",
        position: [1, 0, 0],
      },
    ]);
  }, []);

  useGameController();

  return (
    <div className="size-full">
      <div className="size-full relative">
        <div className="absolute">
          <Button onClick={() => {}}>Toggle Light</Button>
        </div>
        {page === "playMode" && <PlayModePage></PlayModePage>}
        {page === "training" && <div>Training</div>}
      </div>
      {/* <div>
        {orderBy(rooms, "name", "desc").map((room) => (
          <div key={room.id}>{room.name}</div>
        ))}
      </div> */}
    </div>
  );
};
