import { useEffect } from "react";
import { PlayModePage } from "./pages/playModePage";
import { useSessionStore } from "./store";
import { sceneRenderer } from "./scenes/sceneRenderer";

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
    const root = window.document.documentElement!;
    root.classList.add("light");
    sceneRenderer.setItems("group", [
      {
        type: "gltf-static",
        url: "Scene.gltf",
        position: [0, 0, 0],
      },
      {
        type: "ball",
        position: [0, 2, 0],
      },
      {
        type: "ball",
        position: [0, 0, 0],
      },
    ]);
  }, []);

  return (
    <div className="size-full">
      <div className="size-full">
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

