import * as alt from 'alt-server';
import * as fs from "fs";

export function loadFile(name: string, callback: CallableFunction) {
  fs.readFile(name, "utf-8", (err, data) => {
    alt.logError(err);
    alt.log("Reading file: " + name);
    callback(data);
  });
}

export function loadFileJSON(name: string, callback: CallableFunction) {
  callback(loadFile(name + ".JSON", (data) => { JSON.parse(data) }))
}

export function saveFile(name: string, data: any) {
  fs.writeFile(name, data, "utf-8", (err) => {
    alt.logError(err);
  });
}