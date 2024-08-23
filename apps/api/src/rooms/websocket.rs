use socketioxide::extract::SocketRef;
use socketioxide::layer::SocketIoLayer;
use socketioxide::SocketIo;
use tracing::info;

async fn on_connect(socket: SocketRef) {
    info!("Client connected: {}", socket.id);

    socket.on_disconnect(|socket: SocketRef| {
        info!("Client disconnected: {}", socket.id);
    });
}

pub fn create_websockets(path: &str) -> (SocketIoLayer, SocketIo) {
    let (layer, io) = SocketIo::new_layer();
    io.ns(path.to_string(), on_connect);
    (layer, io)
}
