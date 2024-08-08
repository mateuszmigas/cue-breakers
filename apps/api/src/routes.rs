use std::sync::Mutex;

use axum::{
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use tracing::info;

static mut GAME_ROOMS: Option<Mutex<Vec<GameRoom>>> = None;

fn initialize_rooms() {
    unsafe {
        GAME_ROOMS = Some(Mutex::new(vec![
            GameRoom {
                id: 1,
                name: String::from("Room 1"),
            },
            GameRoom {
                id: 2,
                name: String::from("Room 2"),
            },
            GameRoom {
                id: 3,
                name: String::from("Room 3"),
            },
        ]));
    }
}

#[derive(Serialize, Deserialize, Clone)]
struct GameRoom {
    id: u64,
    name: String,
}

#[derive(Deserialize)]
struct CreateRoom {
    name: String,
}

async fn get_rooms() -> (StatusCode, Json<Vec<GameRoom>>) {
    info!("Getting rooms");
    unsafe {
        if let Some(ref rooms) = GAME_ROOMS {
            let rooms = rooms.lock().unwrap();
            return (StatusCode::OK, Json(rooms.clone()));
        }
    }
    (StatusCode::OK, Json(vec![]))
}

async fn create_room(Json(payload): Json<CreateRoom>) -> impl IntoResponse {
    unsafe {
        if let Some(ref rooms) = GAME_ROOMS {
            let mut rooms = rooms.lock().unwrap();
            let new_id = rooms.len() as u64 + 1;
            let new_room = GameRoom {
                id: new_id,
                name: payload.name + " " + (rooms.len() + 1).to_string().as_str(),
            };
            rooms.push(new_room.clone());
            info!("creat rooms");
            return (StatusCode::CREATED, Json(new_room)).into_response();
        }
    }
    (StatusCode::INTERNAL_SERVER_ERROR, "Rooms not initialized").into_response()
}

pub fn create_routes() -> Router {
    initialize_rooms();
    Router::new()
        .route("/rooms", get(get_rooms))
        .route("/rooms", post(create_room))
}
