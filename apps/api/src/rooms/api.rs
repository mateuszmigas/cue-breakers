use super::model::GameRoom;
use crate::utils::storage::{InMemoryStorage, Storage};
use axum::{extract::State, http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use serde::Deserialize;
use socketioxide::SocketIo;
use std::sync::Arc;
use tokio::sync::RwLock;

pub struct RoomsApiState {
    rooms: InMemoryStorage<GameRoom>,
    socket: SocketIo,
}

impl RoomsApiState {
    pub fn new(rooms: InMemoryStorage<GameRoom>, socket: SocketIo) -> Self {
        RoomsApiState { rooms, socket }
    }
}

pub type RoomsApiStateLock = Arc<RwLock<RoomsApiState>>;

#[derive(Deserialize)]
struct CreateRoom {
    name: String,
}

async fn get_rooms(State(state_lock): State<RoomsApiStateLock>) -> impl IntoResponse {
    let state = state_lock.read().await;
    Json(state.rooms.list())
}

async fn create_room(
    State(state_lock): State<RoomsApiStateLock>,
    Json(payload): Json<CreateRoom>,
) -> impl IntoResponse {
    let mut state = state_lock.write().await;
    let room = state.rooms.add(GameRoom {
        name: payload.name,
        player_id: 1,
    });
    let _ = state
        .socket
        .emit("message_room_created", [state.rooms.list()]);
    (StatusCode::CREATED, Json(room))
}

pub fn create_router(state_lock: RoomsApiStateLock) -> Router {
    Router::new()
        .route("/rooms", get(get_rooms).post(create_room))
        .with_state(state_lock)
}
