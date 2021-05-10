import * as alt from 'alt-client';
import * as native from 'natives';
let dead = false;
let wasted;
let gettingdamage;
let url = "http://resource/client/pages/wasted.html";
export function playerDeath() {
    if (gettingdamage != null) {
        alt.clearTimeout(gettingdamage);
    }
    wasted = new alt.WebView(url);
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
export function playerDamage(attacker, damage, weaponHash) {
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
