/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

export const deadPlayers = {};
const respawnTime = 10 * 1000;//In millis

export function playerDeath(player, killer, weaponhash) {
  if (deadPlayers[player.id]) {
    return;
  }
  
  alt.emitClient(player, 'a_death');

  deadPlayers[player.id] = alt.setTimeout(() => {
    if (deadPlayers[player.id]) {
      delete deadPlayers[player.id];
    }
    
    if(!player || !player.valid) {
      return;
    }

    player.spawn(-601.9, -396.3, 69.98, 0);
    alt.emitClient(player, "a_alive");
    player.model = `mp_m_freemode_01`;

  }, respawnTime);
  
  alt.log(player.id + " died.");
}