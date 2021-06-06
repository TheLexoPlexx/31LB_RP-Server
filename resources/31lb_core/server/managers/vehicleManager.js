import * as alt from 'alt-server';
import { database } from '../startup';
import tables from '../database/tables';
export function saveVehicles() {
    alt.log("Found " + alt.Vehicle.all.length + " Vehicles. Saving...");
    return saveV(0);
}
function saveV(index) {
    return new Promise((resolve, reject) => {
        let vehicle = alt.Vehicle.all[index];
        database.upsertData({
            vin: vehicle.getSyncedMeta("vin") == null ? generateVIN() : vehicle.getSyncedMeta("vin"),
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
export function getVehicleByVin(vin, callback) {
    database.fetchData("vin", vin, tables.vehicles, (result) => {
        callback(result);
    });
}
function generateVIN() {
    var numbers = '1234567890', alphabet = 'ABCDEFGHJKLMNPRSTUVWXYZ', serialLengthAlphabet = 6, serialLengthNumbers = 2, serialLengthAlphabet2 = 3, serialLengthNumbers2 = 6, randomSerialAlphabet = "", randomSerialNumbers = "", randomSerialAlphabet2 = "", randomSerialNumbers2 = "", i, j, randomNumber;
    for (i = 0; i < serialLengthAlphabet; i++) {
        randomNumber = Math.floor(Math.random() * alphabet.length);
        randomSerialAlphabet += alphabet.substring(randomNumber, randomNumber + 1);
    }
    for (j = 0; j < serialLengthNumbers; j++) {
        randomNumber = Math.floor(Math.random() * numbers.length);
        randomSerialNumbers += numbers.substring(randomNumber, randomNumber + 1);
    }
    for (i = 0; i < serialLengthAlphabet2; i++) {
        randomNumber = Math.floor(Math.random() * alphabet.length);
        randomSerialAlphabet2 += alphabet.substring(randomNumber, randomNumber + 1);
    }
    for (j = 0; j < serialLengthNumbers2; j++) {
        randomNumber = Math.floor(Math.random() * numbers.length);
        randomSerialNumbers2 += numbers.substring(randomNumber, randomNumber + 1);
    }
    return randomSerialAlphabet + randomSerialNumbers + randomSerialAlphabet2 + randomSerialNumbers2;
}
