/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import Discord from 'discord.js';
import { discord } from '../startup';

const discordClient = new Discord.Client({ presence: { activity: { name: "ob alles in Ordnung ist.", type: "WATCHING" } } });

// Events
discordClient.on("ready", handleReady);
discordClient.on("error", handleError);
discordClient.on("rateLimit", handleRateLimit);

function handleReady() {
    alt.log("[31LB] Discord Bot: " + discordClient.user.username + " has Authenticated.");
}

function handleError(err) {
    console.log(err);
}

function handleRateLimit(err) {
    alt.logError("[31LB] Discord Bot has been Rate Limited.");
    alt.logError(err);
}

export function isWhitelisted(id) {
    const server = discordClient.guilds.cache.get(discord.server_id);
    if (server.members.cache.get(id).roles.cache.get(discord.whitelist_id)) {
        return true;
    } else {
        return false;
    }
}

discordClient.login(discord.bot_token);