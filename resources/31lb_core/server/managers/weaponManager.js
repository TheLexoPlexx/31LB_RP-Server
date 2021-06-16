import { database } from '../startup';
import tables from '../database/tables';
export function getWeapon(serial, callback) {
    database.fetchData("serial", serial, tables.weapons, (result) => {
        if (callback != null) {
            callback(result);
        }
    });
}
export function setValue(result, callback) {
    database.upsertData(result, tables.weapons, (r) => {
        if (callback != null) {
            callback(r);
        }
    });
}
export function newWeapon(weapon) {
    var serialNumber = generateSerial();
    database.fetchData("serial", serialNumber, tables.weapons, (result) => {
        if (result == null) {
            database.upsertData({ serial: serialNumber, weaponname: weapon }, tables.weapons, null);
        }
        else {
            newWeapon(weapon);
        }
    });
}
function generateSerial() {
    var numbers = '1234567890', alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', serialLengthAlphabet = 4, serialLengthNumbers = 6, randomSerialAlphabet = "", randomSerialNumbers = "", i, j, randomNumber;
    for (i = 0; i < serialLengthAlphabet; i++) {
        randomNumber = Math.floor(Math.random() * alphabet.length);
        randomSerialAlphabet += alphabet.substring(randomNumber, randomNumber + 1);
    }
    for (j = 0; j < serialLengthNumbers; j++) {
        randomNumber = Math.floor(Math.random() * numbers.length);
        randomSerialNumbers += numbers.substring(randomNumber, randomNumber + 1);
    }
    return randomSerialAlphabet + randomSerialNumbers;
}
