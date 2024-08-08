use socketioxide::SocketIo;
use tower::ServiceBuilder;
use tower_http::cors::CorsLayer;
use tracing::info;

mod routes;
mod socket;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt::init();

    let (layer, io) = SocketIo::new_layer();
    io.ns("/", socket::on_connect);

    let app = axum::Router::new()
        .nest("/api", routes::create_routes())
        .layer(
            ServiceBuilder::new()
                .layer(CorsLayer::permissive())
                .layer(layer),
        );

    info!("Starting server");
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
    info!("listening on {}", listener.local_addr()?);
    axum::serve(listener, app).await?;

    Ok(())
}
