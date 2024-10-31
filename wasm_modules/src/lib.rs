use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn message() -> String {
    return String::from("Hello, world from webassembly!");
}
