const COMMANDS: &[&str] = &["ping", "animate_me", "animate_me_size"];

fn main() {
    tauri_plugin::Builder::new(COMMANDS)
        .android_path("android")
        .ios_path("ios")
        .build();
}
