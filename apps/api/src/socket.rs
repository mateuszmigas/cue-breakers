use socketioxide::extract::{Data, SocketRef};
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

pub async fn on_connect(socket: SocketRef) {
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

    socket.on_disconnect(|socket: SocketRef| {
        info!("Client disconnected: {}", socket.id);
    });
}
