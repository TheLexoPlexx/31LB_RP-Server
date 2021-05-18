import * as fs from "fs";

//TODO: Error Handling, try catch and stuff

/**
 * Lädt eine Datei, Basis-Ordner ist der Server-Ordner
 * 
 * @param name Der Pfad 
 * @returns Inhalt der Datei in utf-8
 */
export function loadFile(name: string) {
  console.log("Reading " + name + "...");
  return fs.readFileSync(name, "utf-8");
}

/**
 * Lädt eine JSON-Datei, Basis-Ordner ist der Server-Ordner
 * 
 * @param name Der Pfad ohne ".json"
 * @returns ein geparstes JSON-Objekt des Dateiinhaltes
 */
export function loadFileJSON(name: string) {
  return JSON.parse(loadFile(name + ".json"));
}


/**
 * Speichert eine Datei
 * 
 * @param name Der Pfad, falls er nicht existiert, wird er erzeugt
 * @param data Der Inhalt der Datei
 */
export function saveFile(name: string, data: any) {
  console.log("Saving " + name + "...");
  let pathparts = name.split("/");
  if (pathparts.length >= 1) {
    let fullPath = "";
    pathparts.forEach(part => {
      if (part != "." && part != pathparts[pathparts.length -1]) {
        fullPath += part + "/";
        try {
          fs.statSync(fullPath);
        } catch {
          fs.mkdirSync(fullPath);
        }
      }
    });
  }
  fs.writeFile(name, data, "utf-8", (err) => {
    if (err != null) {
      console.log(err);
    }
  });
}

/**
 * Speichert eine JSON-Datei
 * 
 * @param name Der Pfad
 * @param data Was gespeichert werden soll, JSON, Object oder any
 */
export function saveFileJSON(name: string, data: JSON | Object | any) {
  saveFile(name + ".json", JSON.stringify(data, null, 2));
}
