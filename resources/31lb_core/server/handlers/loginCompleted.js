import * as alt from 'alt-server';
import * as pm from "../playerManager";
import { database } from '../startup';
import { globalMarkers, unlockableMarkers } from './placeHandler';
export function loginCompleted(player, result_player, password) {
    var playerJSON;
    if (result_player == null) {
        var d = new Date();
        var date = d.getDate().toString() + "." + (d.getMonth() + 1).toString() + "." + d.getFullYear().toString();
        var new_player = {
            socialclub: player.socialId,
            password: password,
            money_hand: 400,
            money_bank: 0,
            healthpoints: player.maxHealth,
            armour: player.maxArmour,
            firstjoin: date,
            permissionsgroup: 1,
            sessionid: player.id,
            activeWeapons: JSON.stringify({ a: null, b: null, h: null }),
        };
        pm.setValue(new_player, (res) => {
            alt.log("Neuer Spieler: " + JSON.stringify(res));
            player.spawn(-69.551, -855.909, 40.571, 0);
        });
        playerJSON = new_player;
    }
    else {
        player.model = 'mp_m_freemode_01';
        var pos = JSON.parse(result_player.pos);
        var rot = JSON.parse(result_player.rot);
        player.spawn(pos.x, pos.y, pos.z, 0);
        player.rot = rot;
        player.health = result_player.healthpoints;
        player.armour = result_player.armour;
        alt.emitClient(player, "a_setMeta", "unlocked_places", result_player.unlockedplaces);
        let unlocked_places;
        if (result_player.unlockedplaces === "[]") {
            unlocked_places = [];
        }
        else {
            unlocked_places = JSON.parse(result_player.unlockedplaces);
        }
        unlocked_places.forEach(element => {
            unlockableMarkers.forEach(allM => {
                if (allM.id == element) {
                    alt.emitClient(player, "a_createBlip", allM);
                }
            });
        });
        globalMarkers.forEach(element => {
            alt.emitClient(player, "a_createBlip", element);
        });
        result_player.sessionid = player.id;
        pm.setValue(result_player, (res) => {
            alt.log("Player " + res.name + "[" + res.socialclub + "] logged in with SessionID " + res.sessionid);
        });
        playerJSON = result_player;
    }
    alt.emitClient(player, "a_setMeta", "money_hand", playerJSON.money_hand);
}
export function login(player, pw) {
    database.fetchData("password", pw, "players", (result) => {
        if (result == undefined) {
            loginCompleted(player, null, pw);
        }
        else {
            if (result.sessionid >= 0) {
                alt.logWarning("Player replaced sessionid " + result.sessionid);
            }
            loginCompleted(player, result, null);
        }
    });
}
