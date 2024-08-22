use super::model::GameRoom;
use crate::utils::storage::{InMemoryStorage, Storage};
use axum::{extract::State, http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use serde::Deserialize;
use std::sync::Arc;
use tokio::sync::RwLock;

pub type GameRoomDb = Arc<RwLock<InMemoryStorage<GameRoom>>>;

#[derive(Deserialize)]
struct CreateRoom {
    name: String,
}

async fn get_rooms(State(db): State<GameRoomDb>) -> impl IntoResponse {
    let rooms_db = db.read().await;
    Json(rooms_db.list())
}

async fn create_room(
    State(db): State<GameRoomDb>,
    Json(payload): Json<CreateRoom>,
) -> impl IntoResponse {
    let mut rooms_lock = db.write().await;
    let new_id = rooms_lock.list().len() as u64 + 1;
    let new_room = GameRoom {
        id: new_id,
        name: payload.name + " " + new_id.to_string().as_str(),
        player_id: 1,
    };
    let room = rooms_lock.add(new_room);
    (StatusCode::CREATED, Json(room))
}

pub fn create_router(db: GameRoomDb) -> Router {
    Router::new()
        .route("/rooms", get(get_rooms).post(create_room))
        .with_state(db)
}
