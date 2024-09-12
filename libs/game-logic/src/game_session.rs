use crate::game_object::GameObject;
use crate::game_type::GameType;
use lib_physics::Vector4f;
use wasm_bindgen::prelude::*;
extern crate js_sys;
use js_sys::Math;

#[wasm_bindgen]
pub struct GameSession {
    objects: Vec<GameObject>,
}

#[wasm_bindgen]
impl GameSession {
    pub fn new(_game_type: GameType) -> Self {
        let num_balls = 1_000;
        let mut objects = Vec::with_capacity(num_balls);

        let constants = Constants {
            edge_min_x: -2.731,
            edge_max_x: 2.731,
            edge_min_z: -1.191,
            edge_max_z: 1.191,
            height: 1.42,
        };

        for i in 0..num_balls {
            let x = (Math::random() as f32 - 0.5) * (constants.edge_max_x - constants.edge_min_x);
            let z = (Math::random() as f32 - 0.5) * (constants.edge_max_z - constants.edge_min_z);

            objects.push(GameObject {
                instance_id: i as u32,
                type_id: 0, // Assuming 0 represents "ball" type
                position: Vector4f::new(x, constants.height, z, 1.0),
                rotation: Vector4f::new(0.0, 0.0, 0.0, 0.0),
                scale: 0.15,
                // rotation: Vector4f::new(rotation_x, rotation_y, rotation_z, 0.0),
                // texture_url: format!("balls/ball_{}.png", i % 16),
            });
        }

        Self { objects }
    }

    pub fn update(&mut self, delta_time: f32) {
        for object in &mut self.objects {
            object.rotation.x += delta_time;
            object.rotation.y += delta_time;
            object.rotation.z += delta_time;
        }
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

struct Constants {
    edge_min_x: f32,
    edge_max_x: f32,
    edge_min_z: f32,
    edge_max_z: f32,
    height: f32,
}
