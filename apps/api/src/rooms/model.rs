use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug, Deserialize, Clone, Default)]
#[serde(rename_all = "camelCase")]
pub struct GameRoom {
    pub name: String,
    pub player_id: u64,
}
