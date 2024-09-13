#[macro_export]
macro_rules! js_log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

use js_sys::Math;

pub fn shuffle<T>(list: &mut [T], seed: Option<u32>) {
    let len = list.len();
    let mut rng = seed.map(|s| s as f64).unwrap_or_else(|| Math::random());

    for i in (1..len).rev() {
        rng = (rng * 1103515245.0 + 12345.0) % 2147483648.0;
        let j = (rng / 2147483648.0 * (i as f64 + 1.0)) as usize;
        list.swap(i, j);
    }
}
