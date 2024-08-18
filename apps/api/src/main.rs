use socketioxide::SocketIo;
use tower::ServiceBuilder;
use tower_http::{
    cors::CorsLayer,
    services::{ServeDir, ServeFile},
};
use tracing::info;
mod rooms;
mod socket;
use dotenv::dotenv;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();
    tracing_subscriber::fmt::init();
    let web_public_path = std::env::var("WEB_PUBLIC_PATH").unwrap_or("web".to_string());
    // let server_url = std::env::var("SERVER_URL").unwrap_or("/".to_string());

    let (layer, io) = SocketIo::new_layer();
    io.ns("/", socket::on_connect);

    let serve_dir = ServeDir::new(web_public_path.clone())
        .not_found_service(ServeFile::new(web_public_path + "/index.html"));
    let app = axum::Router::new()
        .nest_service("/", serve_dir.clone())
        .nest("/api", rooms::api::create_router())
        .layer(
            ServiceBuilder::new()
                .layer(CorsLayer::permissive())
                .layer(layer),
        )
        .fallback_service(serve_dir);

    info!("Starting server");
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3010").await?;
    info!("listening on {}", listener.local_addr()?);
    axum::serve(listener, app).await?;

    Ok(())
}
