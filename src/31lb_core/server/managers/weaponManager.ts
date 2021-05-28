/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { database } from '../startup';
import tables from '../util/tables';
import * as pm from "./playerManager";


export function getWeapon(serial: string, callback: CallableFunction): void {
  database.fetchData("serial", serial, tables.weapons, (result) => {
    if (callback != null) {
      callback(result);
    }
  });
}

export function setValue(result: JSON, callback: CallableFunction): void {
  database.upsertData(result, tables.weapons, (r) => {
    if (callback != null) {
      callback(r);
    }
  });
}

/**
 * Erstellt eine neue Waffe in der Datenbank, ohne Quelle
 * @param {String} weapon Name aus WeaponList
 * @param {*} ownerId Besitzer-Id
 */
export function newWeapon(weapon: string, ownerId: number): void {
  var serialNumber = generateSerial();

  database.fetchData("serial", serialNumber, tables.weapons, (result) => {
    if (result == null) {
      pm.getPlayerBySerialId(ownerId, (r) => {
        if (r == null) {
          alt.logError("New Weapon " + serialNumber + " does not have an existing owner!");
        }
      });

      database.upsertData({ serial: serialNumber, weaponname: weapon, owner: ownerId }, tables.weapons, null);    
    } else {
      newWeapon(weapon, ownerId);
    }
  });
}

/**
 * Ändert den Besitzer einer Waffe in der Datenbank
 * @param {String} serial Die Seriennummer der Waffe
 * @param {int} newOwnerId Die Id des neuen Besitzers
 */
export function changeWeaponOwner(serial: string, newOwnerId: number): void {
  database.fetchData("serial", serial, tables.weapons, (result: any) => {
    if (result == null) {
      alt.logError("Wrong serial: " + serial);
    } else {
      pm.getPlayerBySerialId(newOwnerId, (r) => {
        if (r == null) {
          alt.logError("Weapon " + serial + " does not have an existing owner!");
        }
      });
      result.owner = newOwnerId;
      database.upsertData(result, tables.weapons, null);
    }
  });
}

function generateSerial(): string {
  var numbers = '1234567890',
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    serialLengthAlphabet = 4,
    serialLengthNumbers = 6,
    randomSerialAlphabet = "",
    randomSerialNumbers = "",
    i: number,
    j: number,
    randomNumber: number;

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