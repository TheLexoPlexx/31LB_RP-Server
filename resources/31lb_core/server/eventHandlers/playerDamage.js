import * as alt from 'alt-server';
import { WeaponList } from '../../lib/weapons';
export function playerDamage(victim, attacker, damage, weaponHash) {
    alt.emitClient(victim, "a_damage", [attacker, damage, weaponHash]);
    logPlayerDamage(false, victim, attacker, damage, weaponHash);
}
export function logPlayerDamage(death, victim, attacker, damage, weaponHash) {
    var att;
    if (attacker == null) {
        att = "";
    }
    else if (attacker.id == victim.id) {
        att = " damaged himself";
    }
    else {
        att = " damaged by " + attacker.id;
    }
    var cause = weaponHash;
    switch (weaponHash) {
        case 3452007600:
            cause = "fall damage";
            break;
        case 2741846334:
            cause = "angefahren/leftvehicle";
            break;
        case 133987706:
            cause = "caraccident/leftvehicle";
            break;
        default:
            Object.values(WeaponList).forEach(element => {
                if (element.hash == weaponHash) {
                    cause = element.name;
                }
            });
            break;
    }
    var dmgmsg;
    var msg;
    if (death) {
        dmgmsg = "";
        msg = "playerDeath";
    }
    else {
        dmgmsg = " for " + damage + " Damage";
        msg = "playerDamage";
    }
    alt.log("[31LB] " + msg + ": " + victim.id + att + " with " + cause + dmgmsg);
}
