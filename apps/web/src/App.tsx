import { Canvas } from "@react-three/fiber";
import { Button } from "./components/ui/button";
import { EightBallGameScene } from "./scenes/eightBallScene";

export const App = () => {
  // const [rooms, setRooms] = useState<GameRoom[]>([]);

  // const signalServer = useSignalServer();

  // useEffect(() => {
  //   signalServer.getRooms().then(setRooms);
  //   const unsubscribe = signalServer.onRoomsUpdate(setRooms);dsa
  //   return unsubscribe;
  // }, [signalServer]);

  // const { page } = useSessionStore();

  // useGameController();

  return (
    <div className="size-full">
      <div className="size-full relative">
        <div className="absolute">
          <Button onClick={() => {}}>Toggle Light</Button>
        </div>
        <Canvas
          fallback={<div>Sorry no WebGL supported!</div>}
          className="size-full absolute"
          camera={{ position: [5, 5, 5], fov: 45 }}
        >
          <EightBallGameScene />
        </Canvas>
        {/* {page === "home" && <HomePage></HomePage>} */}
        {/* {page === "createRoom" && <CreateRoomPage></CreateRoomPage>} */}
        {/* {page === "joinRoom" && <JoinRoomPage></JoinRoomPage>} */}
        {/* {page === "playMode" && <PlayModePage></PlayModePage>} */}
        {/* {page === "training" && <div>Training</div>} */}
      </div>
      {/* <div>
        {orderBy(rooms, "name", "desc").map((room) => (
          <div key={room.id}>{room.name}</div>
        ))}
      </div> */}
    </div>
  );
};
