/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

export function playerDamage(victim, attacker, damage, weaponHash) {
  alt.emitClient(victim, "a_damage", [attacker, damage, weaponHash]);
}