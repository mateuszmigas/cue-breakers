use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add_vectors(x: f32, y: f32) -> f32 {
    x + y + 0.1
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
