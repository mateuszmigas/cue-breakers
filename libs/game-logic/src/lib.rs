use lib_physics;
use wasm_bindgen::prelude::*;

macro_rules! js_log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
struct GameObject {
    id: u32,
}

#[wasm_bindgen]
pub struct GameSession {
    objects: Vec<GameObject>,
}

#[wasm_bindgen]
pub enum GameType {
    EightBall,
}

#[wasm_bindgen]
impl GameSession {
    pub fn new(game_type: u32) -> Self {
        Self { objects: vec![] }
    }

    pub fn update(&mut self, delta_time: f32) {
        // js_log!("GameSession update {:?}", delta_time);
        // for object in &mut self.objects {
        //     object.update(delta_time);
        // }
    }

    pub fn add_object(&mut self, id: u32) {
        self.objects.push(GameObject { id });
    }
}

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
    x + y
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
