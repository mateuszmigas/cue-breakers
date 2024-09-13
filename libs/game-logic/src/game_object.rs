use crate::game_session::constants::GameObjectType;
use lib_physics::Vector4f;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(C)]
pub struct GameObject {
    pub instance_id: u32,
    pub type_id: GameObjectType,
    pub position: Vector4f,
    pub rotation: Vector4f,
    pub scale: f32,
}
