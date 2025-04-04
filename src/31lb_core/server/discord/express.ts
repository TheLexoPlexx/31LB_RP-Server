/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import axios from 'axios';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { isWhitelisted } from './bot';
import { discord } from '../startup';
import { discordAuthDone } from '../eventHandlers/playerConnect';

//TODO: Cleanup und Kram entfernen, der nicht gebraucht wird.

const htmlPath = path.join(alt.getResourcePath(alt.resourceName), 'discord');
const stylesPath = path.join(alt.getResourcePath(alt.resourceName), 'discord');
const jsPaths = path.join(alt.getResourcePath(alt.resourceName), 'discord');
const app = express();

app.use(cors());
app.get('/authenticate', handleMainRedirect);
app.use('/js', express.static(jsPaths));
app.use('/styles', express.static(stylesPath));

async function handleMainRedirect(req, res) {
    const token = req.query.code;
    const userToken = req.query.state;
    let request;

    if (!token || !userToken) {
        res.sendFile(path.join(htmlPath, '/error.html'), err => {});
        return;
    }

    const authParams = new URLSearchParams();
    authParams.append(`client_id`, discord.client_id);
    authParams.append(`client_secret`, discord.client_secret);
    authParams.append(`grant_type`, `authorization_code`);
    authParams.append(`code`, token);
    authParams.append(`scope`, `identify`);

    authParams.append(`redirect_uri`, `${discord.redirect_url}`);

    request = await axios.post(`https://discordapp.com/api/oauth2/token`, authParams, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!request.data || !request.data.access_token) {
        res.sendFile(path.join(htmlPath, '/error.html'), err => {});
        return;
    }

    const discordData = { ...request.data };
    request = await axios.get(`https://discordapp.com/api/users/@me`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `${discordData.token_type} ${discordData.access_token}`,
        },
    });

    if (!request.data || !request.data.id || !request.data.username) {
        res.sendFile(path.join(htmlPath, '/error.html'), err => {});
        return;
    }

    // id, username, avatar, discriminator, public_flags, flags, locale, mfa_enabled
    const player = [...alt.Player.all].find(player => player.getSyncedMeta("discord_token") === userToken);
    if (!player || !player.valid) {
        res.sendFile(path.join(htmlPath, '/error.html'), err => {});
        return;
    }

    const isAuthorized = isWhitelisted(request.data.id);
    if (!isAuthorized) {
        res.sendFile(path.join(htmlPath, '/whitelist.html'), err => {});
        return;
    }

    alt.emitClient(player, 'a_discordAuthExit');
    res.sendFile(path.join(htmlPath, '/index.html'), err => {});

    discordAuthDone(player, request.data);
}

app.listen(7790);
