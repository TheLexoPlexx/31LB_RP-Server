import * as fs from "fs";
const filePath = "./src/31lb_core/data_dumps/vehicles";
const filePathExport = "./src/31lb_core/server/util/manufacturerShortCodes";
export function genShortCodes() {
    let vehicleFile = JSON.parse(fs.readFileSync(filePath + ".json", "utf-8"));
    let shortCodeList = [];
    vehicleFile.forEach(v => {
        let m = v["Manufacturer"];
        if (!shortCodeList.includes(m)) {
            shortCodeList.push(m);
        }
    });
    let shortCodeListFileExport = [];
    shortCodeList.forEach(element => {
        shortCodeListFileExport.push({ key: element, value: element });
    });
    fs.writeFile(filePathExport + ".ts", "let vinManufacturerDictionary: List<string, string>[] = " + JSON.stringify(shortCodeListFileExport, null, 2) + ";", "utf-8", (err) => {
        if (err != null) {
            console.log(err);
        }
    });
    console.log("Success");
}
genShortCodes();
