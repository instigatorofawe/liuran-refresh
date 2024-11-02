use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn load_equities() -> Vec<f32> {
    let bytes = include_bytes!("equities.bin");
    bytes
        .chunks_exact(4)
        .map(|x| f32::from_le_bytes(x.try_into().unwrap()))
        .collect()
}

#[wasm_bindgen]
pub fn load_matchups() -> Vec<u16> {
    let bytes = include_bytes!("matchups.bin");
    bytes
        .chunks_exact(2)
        .map(|x| u16::from_le_bytes(x.try_into().unwrap()))
        .collect()
}
