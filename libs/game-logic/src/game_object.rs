use crate::game_session::constants::GameObjectType;
use lib_physics::RigidBody;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(C)]
pub struct GameObject {
    pub instance_id: u32,
    pub type_id: GameObjectType,
    pub rigid_body: RigidBody,
}

#[wasm_bindgen]
impl GameObject {
    pub fn new(instance_id: u32, type_id: GameObjectType) -> Self {
        GameObject {
            instance_id,
            type_id,
            rigid_body: RigidBody::default(),
        }
    }
}
