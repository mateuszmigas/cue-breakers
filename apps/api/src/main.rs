mod rooms;
mod utils;
mod web;

use dotenv::dotenv;
use rooms::api::GameRoomDb;
use tracing::info;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();
    tracing_subscriber::fmt::init();

    let web_public_path = std::env::var("WEB_PUBLIC_PATH").unwrap_or("web".to_string());
    let serve_dir = web::create_serve_files(web_public_path);
    let app = axum::Router::new()
        .nest_service("/", serve_dir.clone())
        .nest("/api", rooms::api::create_router(GameRoomDb::default()))
        .layer(rooms::websocket::create_websockets("/"))
        .fallback_service(serve_dir);

    info!("Starting server");
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3010").await?;
    info!("listening on {}", listener.local_addr()?);
    axum::serve(listener, app).await?;

    Ok(())
}
