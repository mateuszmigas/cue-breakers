use glam::Vec4;
use wasm_bindgen::prelude::*;

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

pub fn rotate(vector: Vector4f, delta_time: f32) -> Vector4f {
    Vector4f::new(
        vector.x + delta_time,
        vector.y + delta_time,
        vector.z + delta_time,
        vector.w + delta_time,
    )
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
