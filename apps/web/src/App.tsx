import { EightBallGame } from "./games/eightBallScene";

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
      <EightBallGame key="1" />
      {/* {page === "home" && <HomePage></HomePage>} */}
      {/* {page === "createRoom" && <CreateRoomPage></CreateRoomPage>} */}
      {/* {page === "joinRoom" && <JoinRoomPage></JoinRoomPage>} */}
      {/* {page === "playMode" && <PlayModePage></PlayModePage>} */}
      {/* {page === "training" && <div>Training</div>} */}
      {/* <div>
        {orderBy(rooms, "name", "desc").map((room) => (
          <div key={room.id}>{room.name}</div>
        ))}
      </div> */}
    </div>
  );
};
