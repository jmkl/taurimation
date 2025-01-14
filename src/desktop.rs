use std::time::Duration;

use serde::de::DeserializeOwned;
use tauri::{plugin::PluginApi, AppHandle, Manager, PhysicalPosition, PhysicalSize, Runtime};

use crate::models::*;

pub fn init<R: Runtime, C: DeserializeOwned>(
    app: &AppHandle<R>,
    _api: PluginApi<R, C>,
) -> crate::Result<Taurimation<R>> {
    Ok(Taurimation(app.clone()))
}

/// Access to the taurimation APIs.
pub struct Taurimation<R: Runtime>(AppHandle<R>);

impl<R: Runtime> Taurimation<R> {
    pub fn ping(&self, payload: PingRequest) -> crate::Result<PingResponse> {
        Ok(PingResponse {
            value: payload.value,
        })
    }
    pub fn animate_size(
        &self,
        app: &AppHandle<R>,
        payload: AnimationPayload,
    ) -> crate::Result<AnimationResponse> {
        if let Some(window) = app.get_webview_window(&payload.windowname) {
            let sleep_duration = Duration::from_millis(payload.duration / payload.steps);
            let end = payload.to.unwrap_or((0, 0));
            let start = payload
                .from
                .unwrap_or_else(|| match window.inner_position() {
                    Ok(pos) => (pos.x, pos.y),
                    Err(_) => (0, 0),
                });

            for step in 0..=payload.steps {
                let t = step as f64 / payload.steps as f64;
                let eased_t = payload.easing.evaluate(t);
                let new_x = start.0 as f64 + (end.0 - start.0) as f64 * eased_t;
                let new_y = start.1 as f64 + (end.1 - start.1) as f64 * eased_t;
                if let Err(err) = window.set_size(PhysicalSize::new(new_x as i32, new_y as i32)) {
                    eprintln!("Failed! to set window position: {}", err);
                }

                std::thread::sleep(sleep_duration);
            }
        }
        Ok(AnimationResponse { result: true })
    }
    pub fn animate(
        &self,
        app: &AppHandle<R>,
        payload: AnimationPayload,
    ) -> crate::Result<AnimationResponse> {
        if let Some(window) = app.get_webview_window(&payload.windowname) {
            let sleep_duration = Duration::from_millis(payload.duration / payload.steps);
            let end = payload.to.unwrap_or((0, 0));
            let start = payload
                .from
                .unwrap_or_else(|| match window.inner_position() {
                    Ok(pos) => (pos.x, pos.y),
                    Err(_) => (0, 0),
                });

            for step in 0..=payload.steps {
                let t = step as f64 / payload.steps as f64;
                let eased_t = payload.easing.evaluate(t);
                let new_x = start.0 as f64 + (end.0 - start.0) as f64 * eased_t;
                let new_y = start.1 as f64 + (end.1 - start.1) as f64 * eased_t;
                if let Err(err) =
                    window.set_position(PhysicalPosition::new(new_x as i32, new_y as i32))
                {
                    eprintln!("Failed! to set window position: {}", err);
                }

                std::thread::sleep(sleep_duration);
            }
        }
        Ok(AnimationResponse { result: true })
    }
}
