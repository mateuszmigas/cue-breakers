use lib_physics;

pub fn run_game(x: i32, y: i32) -> i32 {
    lib_physics::add_vectors(x, y)
}

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_works() {
//         let result = add(2, 2);
//         assert_eq!(result, 4);
//     }
// }
