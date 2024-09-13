use crate::game_object::GameObject;
use wasm_bindgen::prelude::*;
extern crate js_sys;

#[wasm_bindgen]
pub struct NineBallGameSession {
    objects: Vec<GameObject>,
}

#[wasm_bindgen]
impl NineBallGameSession {
    pub fn new() -> Self {
        Self {
            objects: Vec::new(),
        }
    }

    pub fn update(&mut self, delta_time: f32) {
        for object in &mut self.objects {
            object.rotation.x += delta_time;
        }
    }

    pub fn get_objects_ptr(&self) -> *const GameObject {
        self.objects.as_ptr()
    }

    pub fn get_objects_count(&self) -> usize {
        self.objects.len()
    }
}
