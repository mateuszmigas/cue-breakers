use glam::Vec4;
use wasm_bindgen::prelude::*;

macro_rules! js_log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
#[derive(Copy, Clone)]
#[repr(C)]
pub struct Vector4f {
    pub x: f32,
    pub y: f32,
    pub z: f32,
    pub w: f32,
}

#[wasm_bindgen]
impl Vector4f {
    #[wasm_bindgen(constructor)]
    pub fn new(x: f32, y: f32, z: f32, w: f32) -> Self {
        Vector4f { x, y, z, w }
    }
}

#[wasm_bindgen]
pub fn add_floats(x: f32, y: f32) -> f32 {
    x + y
}

#[wasm_bindgen]
#[derive(Copy, Clone)]
pub struct Sphere {
    pub id: u32,
    pub position: Vector4f,
    pub rotation: Vector4f,
    pub radius: f32,
}

#[wasm_bindgen]
impl Sphere {
    #[wasm_bindgen(constructor)]
    pub fn new(id: u32, position: Vector4f, rotation: Vector4f, radius: f32) -> Self {
        Sphere {
            id,
            position,
            rotation,
            radius,
        }
    }
}
#[wasm_bindgen]
pub struct TableConfig {
    height: f32,
}

#[wasm_bindgen]
impl TableConfig {
    #[wasm_bindgen(constructor)]
    pub fn new(height: f32) -> Self {
        TableConfig { height }
    }
}

#[wasm_bindgen]
pub fn run_table_simulation(
    spheres: Vec<Sphere>,
    table_config: &TableConfig,
    delta_time: f32,
) -> Vec<Sphere> {
    spheres
        .into_iter()
        .map(|mut sphere| {
            // Rotate the sphere
            sphere.rotation.x += delta_time;
            sphere.rotation.y += delta_time;
            sphere.rotation.z += delta_time;
            sphere
        })
        .collect()
}

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_works() {
//         let result = add_vectors(2.0, 2.0);
//         assert_eq!(result, 4.0);
//     }
// }
