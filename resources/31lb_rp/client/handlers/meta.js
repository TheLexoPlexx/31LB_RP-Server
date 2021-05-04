/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-client" />
import * as alt from 'alt-client';
import * as native from 'natives';

export function setMetaPlayer(key, value) {
  alt.setMeta(key, value);
}