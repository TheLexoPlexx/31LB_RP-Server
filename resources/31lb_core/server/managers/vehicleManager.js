import * as alt from 'alt-server';
import { database } from '../startup';
import tables from '../database/tables';
import { vehicleList } from '../util/vehicles';
export function saveAllVehicles() {
    alt.log("Found " + alt.Vehicle.all.length + " Vehicles. Saving...");
    return saveV(0);
}
function saveV(index) {
    return new Promise((resolve, reject) => {
        let vehicle = alt.Vehicle.all[index];
        database.upsertData({
            vin: vehicle.getSyncedMeta("vin") == null ? generateVIN(getManufacturerNameByVehicle(vehicle)) : vehicle.getSyncedMeta("vin"),
            model: vehicle.model,
            a: vehicle.getAppearanceDataBase64(),
            d: vehicle.getDamageStatusBase64(),
            g: vehicle.getGamestateDataBase64(),
            h: vehicle.getHealthDataBase64(),
            s: vehicle.getScriptDataBase64(),
            pos: JSON.stringify(vehicle.pos),
            rot: JSON.stringify(vehicle.rot),
            spawned: true,
        }, tables.vehicles, (result) => {
            if (alt.Vehicle.all[index + 1] != null) {
                saveV(index + 1).then(() => {
                    resolve(result);
                });
            }
            else {
                resolve(result);
            }
        });
    });
}
export function loadVehicles() {
    database.fetchAllData(tables.vehicles, vehicles => {
        if (vehicles != undefined) {
            vehicles.forEach(veh => {
                if (veh.spawned) {
                    let pos = JSON.parse(veh.pos);
                    let rot = JSON.parse(veh.rot);
                    let v = new alt.Vehicle(parseInt(veh.model), pos.x, pos.y, pos.z, rot.x, rot.y, rot.z);
                    v.setAppearanceDataBase64(veh.a);
                    v.setDamageStatusBase64(veh.d);
                    v.setGamestateDataBase64(veh.g);
                    v.setHealthDataBase64(veh.h);
                    v.setScriptDataBase64(veh.s);
                    v.setSyncedMeta("vin", veh.vin);
                }
            });
        }
        else {
            alt.log("No vehicles in database!");
        }
    });
}
export function spawnNewVehicle(model, px, py, pz, rx, ry, rz) {
    let v = new alt.Vehicle(model, px, py, pz, rx, ry, rz);
    let vin = generateVIN(getManufacturerNameByVehicle(v));
    v.setSyncedMeta("vin", vin);
    v.numberPlateIndex = 0;
    v.numberPlateText = generateRandomLicensePlate();
    saveSingleVehilce(v);
    alt.log("Spawned new Vehicle with VIN: " + vin);
    return v;
}
export function saveSingleVehilce(vehicle) {
    database.upsertData({
        vin: vehicle.getSyncedMeta("vin"),
        model: vehicle.model,
        a: vehicle.getAppearanceDataBase64(),
        d: vehicle.getDamageStatusBase64(),
        g: vehicle.getGamestateDataBase64(),
        h: vehicle.getHealthDataBase64(),
        s: vehicle.getScriptDataBase64(),
        pos: JSON.stringify(vehicle.pos),
        rot: JSON.stringify(vehicle.rot),
        spawned: true,
    }, tables.vehicles, (result) => { });
}
export function getVehicleByVin(vin, callback) {
    database.fetchData("vin", vin, tables.vehicles, (result) => {
        callback(result);
    });
}
export function updateVehicle(vehicleJSONData) {
    database.upsertData(vehicleJSONData, tables.vehicles, (result) => { });
}
function generateVIN(manufacturer) {
    let shortCode = vinManufacturerDictionary.filter(pair => pair.key == manufacturer)[0].value;
    var symbols = '1234567890ABCDEFGHJKLMNPRSTUVWXYZ', serialLengthAlphabet = 14, randomSerialAlphabet = "", i, randomNumber;
    for (i = 0; i < serialLengthAlphabet; i++) {
        randomNumber = Math.floor(Math.random() * symbols.length);
        randomSerialAlphabet += symbols.substring(randomNumber, randomNumber + 1);
    }
    return shortCode + randomSerialAlphabet;
}
function generateRandomLicensePlate() {
    var symbols = '1234567890ABCDEFGHJKLMNPRSTUVWXYZ', serialLengthAlphabet = Math.floor(Math.random() * (8 - 5 + 1)) + 5, randomSerialAlphabet = "", i, randomNumber;
    for (i = 0; i < serialLengthAlphabet; i++) {
        randomNumber = Math.floor(Math.random() * symbols.length);
        randomSerialAlphabet += symbols.substring(randomNumber, randomNumber + 1);
    }
    return randomSerialAlphabet;
}
export function findVehicles(key, value) {
    return vehicleList.filter(vehicle => vehicle[key] == value);
}
export function findFirstVehicle(key, value) {
    let list = findVehicles(key, value);
    if (list.length == 0) {
        return null;
    }
    else if (list.length == 1) {
        return list[0];
    }
    else {
        alt.logWarning("More than one Car found for request with key " + key + " and value " + value);
        return list[0];
    }
}
export function getManufacturerNameByVehicle(vehicle) {
    return vehicleList.filter(element => element.Hash == vehicle.model)[0].Manufacturer;
}
export function getManufacturerNameByHash(hash) {
    return vehicleList.filter(element => element.Hash == hash)[0].Manufacturer;
}
let vinManufacturerDictionary = [
    { key: "TRUFFADE", value: "TRU" },
    { key: "", value: "ZZZ" },
    { key: "DINKA", value: "DNK" },
    { key: "ALBANY", value: "LBN" },
    { key: "BUCKING", value: "BUC" },
    { key: "HVY", value: "HVY" },
    { key: "OCELOT", value: "CLT" },
    { key: "MAXWELL", value: "MXW" },
    { key: "DECLASSE", value: "DCL" },
    { key: "KARIN", value: "KRN" },
    { key: "OVERFLOD", value: "OVR" },
    { key: "LCC", value: "LCC" },
    { key: "MAMMOTH", value: "MMM" },
    { key: "KRAKEN", value: "KRK" },
    { key: "WESTERN", value: "WST" },
    { key: "GALLIVAN", value: "GLV" },
    { key: "BRAVADO", value: "BRV" },
    { key: "PEGASSI", value: "PGS" },
    { key: "VAPID", value: "VPD" },
    { key: "GROTTI", value: "GTI" },
    { key: "NAGASAKI", value: "NGK" },
    { key: "BF", value: "BFZ" },
    { key: "CANIS", value: "CNS" },
    { key: "BRUTE", value: "BRT" },
    { key: "COIL", value: "CIL" },
    { key: "MTL", value: "MTL" },
    { key: "BENEFAC", value: "BFC" },
    { key: "LAMPADA", value: "LMP" },
    { key: "RUNE", value: "RUN" },
    { key: "ENUS", value: "ENS" },
    { key: "PFISTER", value: "PFS" },
    { key: "INVERTO", value: "INV" },
    { key: "SHITZU", value: "SHT" },
    { key: "IMPONTE", value: "IMP" },
    { key: "PRINCIPL", value: "PRC" },
    { key: "SCHYSTER", value: "SYT" },
    { key: "OBEY", value: "OBY" },
    { key: "WEENY", value: "WNY" },
    { key: "ANNIS", value: "AIS" },
    { key: "PROGEN", value: "PRO" },
    { key: "DEWBAUCH", value: "DWB" },
    { key: "WILLARD", value: "WLD" },
    { key: "VULCAR", value: "VLC" },
    { key: "FATHOM", value: "FAT" },
    { key: "CHEVAL", value: "CVL" },
    { key: "EMPEROR", value: "EMP" },
    { key: "JOBUILT", value: "JBT" },
    { key: "ZIRCONIU", value: "ZRC" },
    { key: "HIJAK", value: "HIJ" },
    { key: "LAMPADATI", value: "LPT" },
    { key: "BENEFACTOR", value: "BFC" },
    { key: "DUNDREAR", value: "DNR" },
    { key: "MAIBATSU", value: "MAI" },
    { key: "VYSSER", value: "VYS" },
    { key: "UBERMACH", value: "UBR" },
    { key: "BOLLOKAN", value: "BLK" },
    { key: "UBERMACHT", value: "UBR" },
    { key: "CHARIOT", value: "CHA" },
    { key: "SPEEDOPH", value: "SPO" },
    { key: "STANLEY", value: "STY" },
    { key: "VOMFEUER", value: "VFR" }
];
