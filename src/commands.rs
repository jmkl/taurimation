use tauri::{command, AppHandle, Runtime};

use crate::models::*;
use crate::Result;
use crate::TaurimationExt;

#[command]
pub(crate) async fn ping<R: Runtime>(
    app: AppHandle<R>,
    payload: PingRequest,
) -> Result<PingResponse> {
    app.taurimation().ping(payload)
}

#[command]
pub(crate) async fn animate_me<R: Runtime>(
    app: AppHandle<R>,
    payload: AnimationPayload,
) -> Result<AnimationResponse> {
    app.taurimation().animate(&app, payload)
}

#[command]
pub(crate) async fn animate_me_size<R: Runtime>(
    app: AppHandle<R>,
    payload: AnimationPayload,
) -> Result<AnimationResponse> {
    app.taurimation().animate_size(&app, payload)
}
