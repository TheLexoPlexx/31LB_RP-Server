import * as alt from 'alt-server';
import sjcl from 'sjcl';
import { discord } from '../startup';
const ip = encodeURI(`${discord.redirect_url}`);
const url = `https://discord.com/api/oauth2/authorize?client_id=${discord.client_id}&redirect_uri=${ip}&prompt=none&response_type=code&scope=identify`;
alt.on('a_discordBeginAuth', handleBeginAuth);
function handleBeginAuth(player) {
    let hashBytes = sjcl.hash.sha256.hash(JSON.stringify(player.ip) + (Math.random() * (900000000 - 0)));
    const playerToken = sjcl.codec.hex.fromBits(hashBytes);
    player.setSyncedMeta("discord_token", playerToken);
    alt.emitClient(player, 'discord:Auth', `${url}&state=${playerToken}`);
}
