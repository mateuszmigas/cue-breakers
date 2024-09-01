use glam::Vec4;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add_floats(x: f32, y: f32) -> f32 {
    x + y + 0.2
}

#[wasm_bindgen]
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
pub fn simd_add_vectors(v1: &Vector4f, v2: &Vector4f) -> Vector4f {
    let mut v1s = Vec4::new(v1.x, v1.y, v1.z, v1.w);
    let v2s = Vec4::new(v2.x, v2.y, v2.z, v2.w);

    // let mut sum = Vec4::ZERO;
    for _ in 0..1_000_000 {
        // sum = v1s + v2s;
        v1s += v2s;
    }

    Vector4f::new(v1s.x, v1s.y, v1s.z, v1s.w)
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
