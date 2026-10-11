// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    // WebKitGTK is unreliable on native Wayland; same workaround as dodotime.
    if std::env::var_os("WAYLAND_DISPLAY").is_some()
        && std::env::var_os("HEXENKUJI_NATIVE_WAYLAND").is_none()
    {
        std::env::set_var("GDK_BACKEND", "x11")
    }
    hexenkuji_lib::run()
}
