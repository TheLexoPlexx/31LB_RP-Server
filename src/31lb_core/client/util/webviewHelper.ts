/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import { WebView } from "alt-client";

let metaKey = "currentWebview";

export function newWebview(path: string, isOverlay?: boolean): alt.WebView {
  let w = new WebView(path, isOverlay);
  alt.Player.local.setMeta(metaKey, w);
  return w;
}

export function getCurrentWebView(): alt.WebView {
  return alt.Player.local.getMeta(metaKey);
}