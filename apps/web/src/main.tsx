import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import init_game_logic from "@wasm/game-logic/lib_game_logic";
import game_logic_url from "@wasm/game-logic/lib_game_logic_bg.wasm?url";
import init_physics_wasm from "@wasm/physics/lib_physics";
import physics_wasm_url from "@wasm/physics/lib_physics_bg.wasm?url";

const loadWasmModules = () =>
  Promise.all([
    init_game_logic(game_logic_url),
    init_physics_wasm(physics_wasm_url),
  ]);

loadWasmModules().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
