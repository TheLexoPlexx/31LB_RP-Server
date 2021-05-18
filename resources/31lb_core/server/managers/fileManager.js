import * as fs from "fs";
export function loadFile(name) {
    console.log("Reading " + name + "...");
    return fs.readFileSync(name, "utf-8");
}
export function loadFileJSON(name) {
    return JSON.parse(loadFile(name + ".json"));
}
export function saveFile(name, data) {
    console.log("Saving " + name + "...");
    let pathparts = name.split("/");
    if (pathparts.length >= 1) {
        let fullPath = "";
        pathparts.forEach(part => {
            if (part != "." && part != pathparts[pathparts.length - 1]) {
                fullPath += part + "/";
                try {
                    fs.statSync(fullPath);
                }
                catch {
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
export function saveFileJSON(name, data) {
    saveFile(name + ".json", JSON.stringify(data, null, 2));
}
