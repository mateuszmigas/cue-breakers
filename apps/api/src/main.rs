use lib_game_logic;

use axum::routing::get;
use socketioxide::{
    extract::{Data, SocketRef},
    SocketIo,
};
use tower::ServiceBuilder;
use tower_http::cors::CorsLayer;
use tracing::info;

#[derive(Debug, serde::Deserialize)]
struct MessageIn {
    room: String,
    text: String,
}

#[derive(serde::Serialize)]
struct MessageOut {
    text: String,
    user: String,
    date: chrono::DateTime<chrono::Utc>,
}

async fn on_connect(socket: SocketRef) {
    info!("Client connected: {}", socket.id);

    socket.on("join", |socket: SocketRef, Data::<String>(room)| {
        info!("Received join: {:?}", room);
        let _ = socket.leave_all();
        let _ = socket.join(room);
    });
    socket.on("message", |socket: SocketRef, Data::<MessageIn>(data)| {
        info!("Received message: {:?}", data);

        let response = MessageOut {
            text: data.text,
            user: format!("anon-{}", socket.id),
            date: chrono::Utc::now(),
        };

        let _ = socket.within(data.room).emit("message", response);
    });
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt::init();

    println!(
        "Hello, world! plus one is {}!",
        lib_game_logic::run_game(1, 2)
    );

    let (layer, io) = SocketIo::new_layer();
    io.ns("/", on_connect);

    let app = axum::Router::new().route("/", get(root)).layer(
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

async fn root() -> &'static str {
    let result = "Hello, World!";
    result
}
