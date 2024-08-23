use super::model::GameRoom;
use crate::utils::storage::{InMemoryStorage, Storage};
use axum::{extract::State, http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use serde::Deserialize;
use std::sync::Arc;
use tokio::sync::RwLock;

pub type GameRoomStorage = InMemoryStorage<GameRoom>;
pub type GameRoomState = Arc<RwLock<GameRoomStorage>>;

#[derive(Deserialize)]
struct CreateRoom {
    name: String,
}

async fn get_rooms(State(db): State<GameRoomState>) -> impl IntoResponse {
    let rooms_db = db.read().await;
    Json(rooms_db.list())
}

async fn create_room(
    State(db): State<GameRoomState>,
    Json(payload): Json<CreateRoom>,
) -> impl IntoResponse {
    let mut rooms_lock = db.write().await;
    let room = rooms_lock.add(GameRoom {
        name: payload.name,
        player_id: 1,
    });
    (StatusCode::CREATED, Json(room))
}

pub fn create_router(db: GameRoomState) -> Router {
    Router::new()
        .route("/rooms", get(get_rooms).post(create_room))
        .with_state(db)
}
