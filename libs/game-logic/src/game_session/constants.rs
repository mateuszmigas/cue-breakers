use wasm_bindgen::prelude::*;

pub struct Constants {
    pub edge_min_x: f32,
    pub edge_max_x: f32,
    pub edge_min_z: f32,
    pub edge_max_z: f32,
    pub height: f32,
    pub movement_threshold: f32,
}

pub static CONSTANTS: Constants = Constants {
    edge_min_x: -2.731,
    edge_max_x: 2.731,
    edge_min_z: -1.191,
    edge_max_z: 1.191,
    height: 1.42,
    movement_threshold: 0.01,
};

#[wasm_bindgen]
#[repr(u32)]
#[derive(Copy, Clone)]
pub enum GameObjectType {
    Ball = 0,
    Cue = 1,
    Table = 2,
}
