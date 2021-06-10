import * as alt from 'alt-client';
import { PresetList, startPlaceGen } from './interactions/placeGenerator';
let commandList = [
    { main: "place", reqpermissions: 100, continue: placeCommand },
    { main: "cloth", continue: clothCommand },
];
export function consoleCommand(name, ...args) {
    let filteredList = commandList.filter(c => c.main == name);
    if (filteredList.length == 0) {
        alt.logError("Unbekannter Befehl!");
    }
    else if (filteredList.length == 1) {
        let com = filteredList[0];
        if (com.reqpermissions != null) {
            if (alt.Player.local.getSyncedMeta("permissions") >= com.reqpermissions) {
                com.continue(args);
            }
            else {
                alt.logError("No Permissions");
            }
        }
        else {
            com.continue(args);
        }
    }
    else {
        alt.logError("Das hätte nicht passieren dürfen. Mehrere Befehle registriert, abbruch.");
    }
}
function placeCommand(args) {
    if (args.length >= 2) {
        alt.logError("Too many Args");
    }
    else if (args.length == 1) {
        if (args[0] == "help") {
            alt.log("==={ Bekannte Presets:");
            Object.keys(PresetList).forEach(element => {
                alt.log("-> ~g~" + element + "~w~ - " + PresetList[element].title);
            });
            alt.log("=====================");
        }
        else {
            if (PresetList[args[0]] == null) {
                alt.logError("Preset unbekannt: " + args[0]);
            }
            else {
                startPlaceGen(PresetList[args[0]]);
            }
        }
    }
    else {
        startPlaceGen(null);
    }
}
function clothCommand(args) {
    if (args.length > 1) {
        alt.logError("Too many Args");
    }
    else {
        alt.emitServer("a_clothselect");
    }
}
