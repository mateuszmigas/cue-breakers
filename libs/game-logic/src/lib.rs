use lib_physics;
use wasm_bindgen::prelude::*;

//game state

// Define payload structs
// struct PlayerJoined {
//     player_id: u32,
//     player_name: String,
// }

// struct PlayerLeft {
//     player_id: u32,
// }

// struct ScoreUpdated {
//     player_id: u32,
//     new_score: u32,
// }

// // Define the enum for game events
// enum GameEvent {
//     PlayerJoined(PlayerJoined),
//     PlayerLeft(PlayerLeft),
//     ScoreUpdated(ScoreUpdated),
//     // Add more events as needed
// }

//1. shot -> send event
//2. animation on client
//3. physics on client
//4. physics on server

//game events union

//processEvent (event) -> game state

#[wasm_bindgen]
pub fn run_game(x: i32, y: i32) -> i32 {
    lib_physics::add_vectors(x, y) + 1
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
