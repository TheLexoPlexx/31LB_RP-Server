/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { database } from '../startup';
import tables from '../database/tables';
import * as pm from "./playerManager";


export function getWeapon(serial: string): Promise<any> {
  return database.fetchDataAsync("serial", serial, tables.weapons);
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
 */
export function newWeapon(weapon: string): void {
  var serialNumber = generateSerial();

  let res = database.fetchDataAsync("serial", serialNumber, tables.weapons);
  
  res.then(result => {
    if (result == null) {
      database.upsertData({ serial: serialNumber, weaponname: weapon }, tables.weapons, null);    
    } else {
      newWeapon(weapon);
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