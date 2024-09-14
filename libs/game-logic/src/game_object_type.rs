use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(u32)]
#[derive(Copy, Clone)]
pub enum GameObjectType {
    Ball = 0,
    Cue = 1,
    Table = 2,
}
