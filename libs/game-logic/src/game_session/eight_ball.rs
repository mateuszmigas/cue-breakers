use crate::game_session::constants::CONSTANTS;
use crate::{game_object::GameObject, game_object_type::GameObjectType, js_log, utils};
use js_sys::Math;
use lib_physics::{rotate, Vector4f};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct EightBallGameSession {
    objects: Vec<GameObject>,
}

#[wasm_bindgen]
impl EightBallGameSession {
    pub fn new() -> Self {
        let mut half_balls = vec![1, 2, 3, 4, 5, 6, 7];
        let mut full_balls = vec![9, 10, 11, 12, 13, 14, 15];
        let mut objects = Vec::with_capacity(half_balls.len() + full_balls.len() + 2);

        utils::shuffle(&mut half_balls, None);
        utils::shuffle(&mut full_balls, None);

        objects.push(Self::create_ball(0, CONSTANTS.table.head_position, 0.0));
        objects.push(Self::create_ball(8, CONSTANTS.table.foot_position, 0.0));

        // Place balls in specific positions
        let positions = vec![
            (2.0, 0.0),
            (1.0, 1.0),
            (0.0, 2.0),
            (-1.0, 3.0),
            (-2.0, 4.0),
            (1.0, -1.0),
            (0.0, -2.0),
            (-1.0, -3.0),
            (-2.0, -4.0),
            (-2.0, 2.0),
            (-2.0, 0.0),
            (-2.0, -2.0),
            (-1.0, -1.0),
            (-1.0, 1.0),
        ];

        for (i, (x_mul, y_mul)) in positions.iter().enumerate() {
            let ball_id = if i % 2 == 0 {
                full_balls.pop().unwrap()
            } else {
                half_balls.pop().unwrap()
            };

            let ball = Self::create_ball(
                ball_id,
                CONSTANTS.table.foot_position
                    + x_mul * CONSTANTS.ball.distances.0
                    + (Math::random() as f32) * CONSTANTS.ball.distance_delta,
                y_mul * CONSTANTS.ball.distances.1
                    + (Math::random() as f32) * CONSTANTS.ball.distance_delta,
            );
            objects.push(ball);
        }

        Self { objects }
    }

    fn create_ball(instance_id: u32, x: f32, y: f32) -> GameObject {
        let mut ball = GameObject::new(instance_id, GameObjectType::Ball);
        ball.rigid_body.scale = 0.15;
        ball.rigid_body.position = Vector4f::new(x, CONSTANTS.table.height, y, 1.0);
        ball
    }

    pub fn update(&mut self, delta_time: f32) {
        let _any_ball_moving = self.any_ball_moving();

        for object in &mut self.objects {
            object.rigid_body.rotation = rotate(object.rigid_body.rotation, delta_time);
        }
    }

    fn any_ball_moving(&self) -> bool {
        self.objects.iter().any(|obj| {
            obj.rigid_body.velocity.x.abs() > CONSTANTS.ball.movement_threshold
                || obj.rigid_body.velocity.z.abs() > CONSTANTS.ball.movement_threshold
        })
    }

    pub fn get_objects_ids(&self) -> Vec<u32> {
        self.objects.iter().map(|obj| obj.instance_id).collect()
    }

    pub fn get_objects_ptr(&self) -> *const GameObject {
        self.objects.as_ptr()
    }

    pub fn get_objects_count(&self) -> usize {
        self.objects.len()
    }
}
