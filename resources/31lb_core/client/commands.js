import * as alt from 'alt-client';
import { PresetList, startPlaceGen } from './interactions/placeGenerator';
export function consoleCommand(name, ...args) {
    if (name == "place") {
        if (alt.Player.local.getSyncedMeta("permissions") >= 100) {
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
        else {
            alt.logError("No Permissions");
        }
    }
    else if (name == "cloth") {
        if (args.length > 1) {
            alt.logError("Too many Args");
        }
        else {
            alt.emitServer("a_clothselect");
        }
    }
    else {
        alt.logError("Not a valid command: " + name);
    }
}
