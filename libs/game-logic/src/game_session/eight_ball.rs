use crate::game_session::constants::CONSTANTS;
use crate::{game_object::GameObject, js_log};
use js_sys::Math;
use lib_physics::{rotate, Vector4f};
use wasm_bindgen::prelude::*;

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
            let mut game_object = GameObject::new(i as u32 + 10, GameObjectType::Ball);

            game_object.rigid_body.position = Vector4f::new(x, CONSTANTS.height, z, 1.0);
            game_object.rigid_body.scale = 0.15;
            objects.push(game_object);
        }

        Self { objects }
    }

    pub fn update(&mut self, delta_time: f32) {
        let _any_ball_moving = self.any_ball_moving();

        for object in &mut self.objects {
            object.rigid_body.rotation = rotate(object.rigid_body.rotation, delta_time);
        }
    }

    fn any_ball_moving(&self) -> bool {
        self.objects.iter().any(|obj| {
            obj.rigid_body.velocity.x.abs() > CONSTANTS.movement_threshold
                || obj.rigid_body.velocity.z.abs() > CONSTANTS.movement_threshold
        })
    }

    pub fn add_balls(&mut self, count: usize) {
        let num_balls = self.objects.len();
        for i in num_balls..num_balls + count {
            let x = (Math::random() as f32 - 0.5) * (CONSTANTS.edge_max_x - CONSTANTS.edge_min_x);
            let z = (Math::random() as f32 - 0.5) * (CONSTANTS.edge_max_z - CONSTANTS.edge_min_z);

            let mut game_object = GameObject::new(i as u32, GameObjectType::Ball);
            game_object.rigid_body.position = Vector4f::new(x, CONSTANTS.height, z, 1.0);
            game_object.rigid_body.scale = 0.15;
            self.objects.push(game_object);
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
