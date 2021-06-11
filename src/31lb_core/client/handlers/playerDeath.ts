/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-client" />
import * as alt from 'alt-client';
import * as native from 'natives';
import { newWebview } from '../util/webviewHelper';

let dead = false;
let wasted;
let gettingdamage;
let url = "http://resource/client/pages/wasted.html";

export function playerDeath(): void {
    //TODO: drawText statt HTML, Bildschirm-Shake und Drehung, Audio hinzufügen
    if (gettingdamage != null) {
      alt.clearTimeout(gettingdamage);
    }
    wasted = newWebview(url);
    native.setTimecycleModifier("MP_DEATH_GRADE_BLEND01");
    dead = true;
    wasted.focus();
}

export function revive() {
  native.setTimecycleModifier("DEFAULT");
  dead = false;
  if (wasted != null) {
    wasted.destroy();
  }
}


export function playerDamage(attacker: alt.Player, damage: alt.Player, weaponHash: string): void {
  native.setTimecycleModifier("DAMAGE");
  native.setTimecycleModifierStrength(0.6);

  if (gettingdamage != null || dead) {
    alt.clearTimeout(gettingdamage);
  }
  gettingdamage = alt.setTimeout(() => {
    native.setTimecycleModifier("DEFAULT");
    native.setTimecycleModifierStrength(1.5);
  }, 550);
}