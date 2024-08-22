use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug, Deserialize, Clone, Default)]
pub struct GameRoom {
    pub id: u64,
    pub name: String,
    pub player_id: u64,
}
