/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import {
  database
} from './startup';
import * as pm from "./playerManager";


export function getWeapon(serial, callback) {
  database.fetchData("serial", serial, "weapons", (result) => {
    if (callback != null) {
      callback(result);
    }
  });
}

export function setValue(result, callback) {
  database.upsertData(result, "weapons", (r) => {
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
export function newWeapon(weapon, ownerId) {
  var serialNumber = generateSerial();

  database.fetchData("serial", serialNumber, "weapons", (result) => {
    if (result == null) {
      pm.getPlayerBySerialId(ownerId, (r) => {
        if (r == null) {
          alt.logError("New Weapon " + serialNumber + " does not have an existing owner!");
        }
      });

      database.upsertData({ serial: serialNumber, weaponname: weapon, owner: ownerId }, "weapons", null);    
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
export function changeWeaponOwner(serial, newOwnerId) {
  database.fetchData("serial", serial, "weapons", (result) => {
    if (result == null) {
      alt.logError("Wrong serial: " + serial);
    } else {
      pm.getPlayerBySerialId(newOwnerId, (r) => {
        if (r == null) {
          alt.logError("Weapon " + serial + " does not have an existing owner!");
        }
      });
      result.owner = newOwnerId;
      database.upsertData(result, "weapons", null);
    }
  });
}

function generateSerial() {
  'use strict';

  var numbers = '1234567890',
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    serialLengthAlphabet = 4,
    serialLengthNumbers = 6,
    randomSerialAlphabet = "",
    randomSerialNumbers = "",
    i,
    j,
    randomNumber;

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