use wasm_bindgen::prelude::*;

const BALL_MESH_RADIUS: f32 = 0.075;
pub struct TableConstants {
    pub visible_width: f32,
    pub visible_height: f32,
    pub surface: f32,
    pub height: f32,
    pub bounds_min_x: f32,
    pub bounds_max_x: f32,
    pub bounds_min_z: f32,
    pub bounds_max_z: f32,
    pub edge_min_x: f32,
    pub edge_max_x: f32,
    pub edge_middle_x: f32,
    pub edge_middle_z: f32,
    pub edge_min_z: f32,
    pub edge_max_z: f32,
    pub hole_radius: f32,
    pub head_position: f32,
    pub foot_position: f32,
}

pub struct BallConstants {
    pub mesh_radius: f32,
    pub distance_delta: f32,
    pub visibility_height: f32,
    pub distances: Vector2f,
    pub movement_threshold: f32,
}

pub struct GameConstants {
    pub table: TableConstants,
    pub ball: BallConstants,
    pub max_holes: u32,
}

pub const CONSTANTS: GameConstants = GameConstants {
    table: TableConstants {
        visible_width: 7.0,
        visible_height: 4.0,
        surface: 1.35,
        height: 1.42,
        bounds_min_x: -2.945,
        bounds_max_x: 2.945,
        bounds_min_z: -1.41,
        bounds_max_z: 1.41,
        edge_min_x: -2.731,
        edge_max_x: 2.731,
        edge_middle_x: 0.192,
        edge_middle_z: 0.030,
        edge_min_z: -1.191,
        edge_max_z: 1.191,
        hole_radius: 0.175,
        head_position: 2.945 / 2.0,
        foot_position: -2.945 / 2.0,
    },
    ball: BallConstants {
        mesh_radius: BALL_MESH_RADIUS,
        distance_delta: 0.001,
        visibility_height: 1.0,
        distances: Vector2f {
            x: 3.0 * (BALL_MESH_RADIUS) / 1.7320508075688772,
            y: BALL_MESH_RADIUS,
        },
        movement_threshold: 0.01,
    },
    max_holes: 6,
};

#[wasm_bindgen]
#[repr(u32)]
#[derive(Copy, Clone)]
pub enum GameObjectType {
    Ball = 0,
    Cue = 1,
    Table = 2,
}

pub struct Vector2f {
    pub x: f32,
    pub y: f32,
}
