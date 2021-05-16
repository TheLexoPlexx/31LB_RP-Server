import * as alt from 'alt-server';
import * as fs from "fs";
export function loadFile(name) {
    alt.log("Reading " + name + "...");
    return fs.readFileSync(name, "utf-8");
}
export function loadFileJSON(name) {
    return JSON.parse(loadFile(name + ".json"));
}
export function saveFile(name, data) {
    alt.log("Saving " + name + "...");
    fs.writeFile(name, data, "utf-8", (err) => {
        if (err != null) {
            alt.logError(err);
        }
    });
}
export function saveFileJSON(name, data) {
    saveFile(name + ".json", JSON.stringify(data, null, 2));
}
