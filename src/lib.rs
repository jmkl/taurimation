use tauri::{
    plugin::{Builder, TauriPlugin},
    Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::Taurimation;
#[cfg(mobile)]
use mobile::Taurimation;

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the taurimation APIs.
pub trait TaurimationExt<R: Runtime> {
    fn taurimation(&self) -> &Taurimation<R>;
}

impl<R: Runtime, T: Manager<R>> crate::TaurimationExt<R> for T {
    fn taurimation(&self) -> &Taurimation<R> {
        self.state::<Taurimation<R>>().inner()
    }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("taurimation")
        .invoke_handler(tauri::generate_handler![
            commands::ping,
            commands::animate_me,
            commands::animate_me_size,
        ])
        .setup(|app, api| {
            #[cfg(mobile)]
            let taurimation = mobile::init(app, api)?;
            #[cfg(desktop)]
            let taurimation = desktop::init(app, api)?;
            app.manage(taurimation);
            Ok(())
        })
        .build()
}
