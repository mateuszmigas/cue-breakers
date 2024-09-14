const BALL_MESH_RADIUS: f32 = 0.075;
const TABLE_WIDTH: f32 = 2.945;

pub struct TableConstants {
    pub height: f32,
    pub head_position: f32,
    pub foot_position: f32,
}

pub struct BallConstants {
    pub distance_delta: f32,
    pub distances: (f32, f32),
    pub movement_threshold: f32,
}

pub struct GameConstants {
    pub table: TableConstants,
    pub ball: BallConstants,
}

pub const CONSTANTS: GameConstants = GameConstants {
    table: TableConstants {
        height: 1.42,
        head_position: TABLE_WIDTH / 2.0,
        foot_position: -TABLE_WIDTH / 2.0,
    },
    ball: BallConstants {
        distance_delta: 0.001,
        distances: (
            3.0 * (BALL_MESH_RADIUS) / 1.7320508075688772,
            BALL_MESH_RADIUS,
        ),
        movement_threshold: 0.01,
    },
};
