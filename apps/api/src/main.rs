mod rooms;
mod utils;
mod web;

use dotenv::dotenv;
use rooms::api::RoomsApiState;
use std::sync::Arc;
use tower::ServiceBuilder;
use tower_http::cors::CorsLayer;
use tracing::info;
use utils::storage::Storage;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();
    tracing_subscriber::fmt::init();

    let web_public_path = std::env::var("WEB_PUBLIC_PATH").unwrap_or("web".to_string());
    let serve_dir = web::create_serve_files(web_public_path);
    let (socket_layer, socket_io) = rooms::websocket::create_websockets("/");

    let rooms_api_state = Arc::new(tokio::sync::RwLock::new(RoomsApiState::new(
        utils::storage::InMemoryStorage::from_items(&[
            rooms::model::GameRoom {
                name: "Room 1".to_string(),
                player_id: 1,
            },
            rooms::model::GameRoom {
                name: "Room 2".to_string(),
                player_id: 2,
            },
        ]),
        socket_io,
    )));

    let app = axum::Router::new()
        .nest_service("/", serve_dir.clone())
        .nest("/api", rooms::api::create_router(rooms_api_state))
        .layer(
            ServiceBuilder::new()
                .layer(CorsLayer::permissive())
                .layer(socket_layer),
        )
        .fallback_service(serve_dir);

    info!("Starting server");
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3010").await?;
    info!("listening on {}", listener.local_addr()?);
    axum::serve(listener, app).await?;

    Ok(())
}
