mod game_object;
mod game_session;
mod game_type;

pub use game_object::GameObject;
pub use game_session::GameSession;
pub use game_type::GameType;

macro_rules! js_log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
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

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_works() {
//         let result = add(2, 2);
//         assert_eq!(result, 4);
//     }
// }
