use tower_http::services::{ServeDir, ServeFile};
use tower_http::set_status::SetStatus;

pub fn create_serve_files(web_public_path: String) -> ServeDir<SetStatus<ServeFile>> {
    ServeDir::new(web_public_path.clone())
        .not_found_service(ServeFile::new(web_public_path + "/index.html"))
}
