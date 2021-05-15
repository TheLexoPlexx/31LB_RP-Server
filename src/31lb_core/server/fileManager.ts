import * as alt from 'alt-server';
import * as fs from "fs";

//TODO: Error Handling, try catch and stuff

export function loadFile(name: string) {
  alt.log("Reading " + name + "...");
  return fs.readFileSync(name, "utf-8");
}

export function loadFileJSON(name: string) {
  return JSON.parse(loadFile(name + ".json"));
}

export function saveFile(name: string, data: any) {
  alt.log("Saving " + name + "...");
  fs.writeFile(name, data, "utf-8", (err) => {
    if (err != null) {
      alt.logError(err);
    }
  });
}

export function saveFileJSON(name: string, data: JSON | any) {
  saveFile(name + ".json", JSON.stringify(data));
}
