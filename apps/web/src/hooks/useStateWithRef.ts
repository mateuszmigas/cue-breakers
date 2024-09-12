import { useRef, useState } from "react";

export const useStateWithRef = <T>(value: T): [T, (newState: T) => void, T] => {
  const stateRef = useRef<T>(value);
  const [state, setState] = useState<T>(value);

  return [
    state,
    (newState: T) => {
      stateRef.current = newState;
      setState(newState);
    },
    stateRef.current,
  ];
};

