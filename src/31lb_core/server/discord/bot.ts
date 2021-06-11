/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import Discord from 'discord.js';
import { discord } from '../startup';

const discordClient = new Discord.Client();

let whitelist = [];
let interval;

// Events
discordClient.on('ready', handleReady);
discordClient.on('error', handleError);
discordClient.on('rateLimit', handleRateLimit);
discordClient.on('guildMemberUpdate', handleUserUpdate);

function handleReady() {
    alt.log("[31LB] Discord Bot has Authenticated.");

    refreshWhitelist();
    interval = alt.setInterval(refreshWhitelist, 60000 * 3);
}

function handleError(err) {
    console.log(err);
}

function handleRateLimit(err) {
    alt.logError("[31LB] Discord Bot has been Rate Limited. Google 'Rate Limits for Discord'");
    alt.logError(err);
}

/**
 * Automatically update the discord white list.
 * @param  {Discord.User} user
 */
async function handleUserUpdate(oldUser, user) {
    if (!user) {
        return;
    }

    const server = discordClient.guilds.cache.get(discord.server_id);
    const member = await server.members.fetch(user.id);

    if (!member) {
        return;
    }

    const hasRole = member.roles.cache.has(discord.whitelist_id);
    const index = whitelist.findIndex(id => id === user.id);

    if (!hasRole) {
        if (index <= -1) {
            return;
        }

        whitelist.splice(index, 1);
        alt.log(`[31LB] ${member.displayName} was removed from the whitelist.`);
        return;
    }

    if (index >= 0) {
        return;
    }

    whitelist.push(user.id);
    alt.log(`[31LB] ${member.displayName} was added to the whitelist.`);
}

/**
 * this function get all the users that have the role
 * 'whitelist' and put them in the array whitelist
 * @returns {void}
 */
function refreshWhitelist() {
    whitelist = [];

    const server = discordClient.guilds.cache.get(`${discord.server_id}`);
    if (!server) {
        console.error(`Did you forget to invite the bot to your server?`);
        return;
    }

    const members = server.roles.cache.get(discord.whitelist_id).members.array();

    if (members.length <= 0) {
        alt.log(`No members are whitelisted at this time.`);
        return;
    }

    for (let i = 0; i < members.length; i++) {
        const member = members[i];
        if (!member) {
            continue;
        }

        if (!member.user) {
            continue;
        }

        whitelist.push(member.user.id);
    }

    alt.log(`Refreshed Whitelist. Whitelisted Members: ${members.length}`);
}

export function isWhitelisted(id) {
    if (whitelist.includes(id)) {
        return true;
    }

    return false;
}

discordClient.login(discord.bot_token);