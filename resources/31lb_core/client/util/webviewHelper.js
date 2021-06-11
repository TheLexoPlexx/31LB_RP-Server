import * as alt from 'alt-client';
import { WebView } from "alt-client";
let metaKey = "currentWebview";
export function newWebview(path, isOverlay) {
    let w = new WebView(path, isOverlay);
    alt.Player.local.setMeta(metaKey, w);
    return w;
}
export function getCurrentWebView() {
    return alt.Player.local.getMeta(metaKey);
}
