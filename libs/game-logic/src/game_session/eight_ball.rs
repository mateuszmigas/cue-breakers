use crate::game_object::GameObject;
use crate::game_session::constants::CONSTANTS;
use lib_physics::{rotate, Vector4f};
use wasm_bindgen::prelude::*;
extern crate js_sys;
use js_sys::Math;

use super::constants::GameObjectType;

#[wasm_bindgen]
pub struct EightBallGameSession {
    objects: Vec<GameObject>,
}

#[wasm_bindgen]
impl EightBallGameSession {
    pub fn new() -> Self {
        let num_balls = 16;
        let mut objects = Vec::with_capacity(num_balls);

        for i in 0..num_balls {
            let x = (Math::random() as f32 - 0.5) * (CONSTANTS.edge_max_x - CONSTANTS.edge_min_x);
            let z = (Math::random() as f32 - 0.5) * (CONSTANTS.edge_max_z - CONSTANTS.edge_min_z);

            objects.push(GameObject {
                instance_id: i as u32,
                type_id: GameObjectType::Ball,
                position: Vector4f::new(x, CONSTANTS.height, z, 1.0),
                rotation: Vector4f::new(0.0, 0.0, 0.0, 0.0),
                scale: 0.15,
            });
        }

        Self { objects }
    }

    pub fn update(&mut self, delta_time: f32) {
        for object in &mut self.objects {
            object.rotation = rotate(object.rotation, delta_time);
        }
    }

    pub fn add_balls(&mut self, count: usize) {
        for _ in 0..count {
            let x = (Math::random() as f32 - 0.5) * (CONSTANTS.edge_max_x - CONSTANTS.edge_min_x);
            let z = (Math::random() as f32 - 0.5) * (CONSTANTS.edge_max_z - CONSTANTS.edge_min_z);

            self.objects.push(GameObject {
                instance_id: self.objects.len() as u32,
                type_id: GameObjectType::Ball,
                position: Vector4f::new(x, CONSTANTS.height, z, 1.0),
                rotation: Vector4f::new(0.0, 0.0, 0.0, 0.0),
                scale: 0.15,
            });
        }
    }

    pub fn clear_balls(&mut self) {
        self.objects.clear();
    }

    pub fn get_objects_ids(&self) -> Vec<u32> {
        self.objects.iter().map(|obj| obj.instance_id).collect()
    }

    pub fn get_objects_ptr(&self) -> *const GameObject {
        self.objects.as_ptr()
    }

    pub fn get_objects_count(&self) -> usize {
        self.objects.len()
    }
}
