import * as alt from 'alt-server';
import sjcl from 'sjcl';
import { discord } from '../startup';
import { currentDate, weatherType } from './weather';
import { globalMarkers, unlockableMarkers } from './placeHandler';
import { getPlayer } from '../managers/playerManager';
export function playerConnect(player) {
    const ip = encodeURI(`${discord.redirect_url}`);
    const url = `https://discord.com/api/oauth2/authorize?client_id=${discord.client_id}&redirect_uri=${ip}&prompt=none&response_type=code&scope=identify`;
    let hashBytes = sjcl.hash.sha256.hash(JSON.stringify(player.ip) + (Math.random() * (900000000 - 0)));
    const playerToken = sjcl.codec.hex.fromBits(hashBytes);
    player.setSyncedMeta("discord_token", playerToken);
    alt.emitClient(player, "a_discordAuth", `${url}&state=${playerToken}`);
    player.setWeather(weatherType);
    player.setDateTime(currentDate.day, currentDate.month, currentDate.year, currentDate.hour, currentDate.minute, currentDate.second);
    player.spawn(402.5164, -1002.847, -99.2587, 0);
}
export function discordAuthDone(player, discord) {
    player.setSyncedMeta("name", discord.username + "#" + discord.discriminator);
    player.setSyncedMeta("uuid", discord.id);
    player.setSyncedMeta("allowKeyPress", true);
    alt.log("UUID: " + player.getSyncedMeta("uuid"));
    let dbP = getPlayer(player);
    alt.log("DKPUUID: " + dbP.uuid);
    player.model = 'mp_m_freemode_01';
    dbP.save();
}
export function createBlips(player) {
    let unlocked_places = player.getSyncedMeta("unlocked_places");
    if (unlocked_places != undefined) {
        if (unlocked_places.length > 0) {
            unlocked_places.forEach(element => {
                unlockableMarkers.forEach(allM => {
                    if (allM.id == element) {
                        alt.emitClient(player, "a_createBlip", allM);
                    }
                });
            });
        }
        globalMarkers.forEach(element => {
            alt.emitClient(player, "a_createBlip", element);
        });
    }
}
const firstCar = [
    "tornado3",
    "tornado4",
];
