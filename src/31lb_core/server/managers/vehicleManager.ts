/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { database } from '../startup';
import tables from '../database/tables';
import { VehicleFromDump, vehicleList } from '../util/vehicles';
import { List } from '../util/util';

//im Moment noch unbenutzt, das sind aber alle Speicherbaren Variationen
interface SaveableVehicle {
  activeradio: alt.RadioStation;
  bodyAdditionalHealth: number;
  bodyHealth: number;
  customPrimaryColor: alt.RGBA;
  customSecondaryColor: alt.RGBA;
  customTires: boolean;
  darkness: number;
  dashboardColor: number;
  daylightOn: boolean;
  destroyed: boolean;
  dirtLevel: number;
  engineHealth: number;
  engineOn: boolean;
  flamethrowerActive: boolean;
  frontWheels: number;
  handbrakeActive: boolean;
  hasArmoredWindows: number;
  headlightColor: number;
  interiorColor: number;
  lightsMultiplier: number;
  livery: number;
  lockState: alt.VehicleLockState;
  manualEngineControl: boolean;
  modKit: number;
  modKitsCount: number;
  model: number | string;
  neon: alt.IVehicleNeon;
  neonColor: alt.RGBA;
  nightlightOn: boolean;
  numberPlateIndex: alt.NumberPlateStyle;
  numberPlateText: string;
  pearlColor: number;
  petrolTankHealth: number;
  primaryColor: number;
  rearWheels: number;
  repairsCount: number;
  roofLivery: number;
  roofState: boolean;
  secondaryColor: number;
  sirenActive: boolean;
  tireSmokeColor: alt.RGBA;
  wheelColor: number;
  wheelType: number;
  windowTint: number;
}

/**
 * Speichert alle Fahrzeuge rekursiv
 * @returns einen Promise nachdem abgeschlossen werden kann
 */
export function saveAllVehicles() {
  alt.log("Found " + alt.Vehicle.all.length + " Vehicles. Saving...");
  return saveV(0);
}

function saveV(index: number) {
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
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * Lädt alle Fahrzeuge auf dem Server und spawnt diese.
 */
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
          //alt.log("Spawned vehicle at " + JSON.stringify(pos) + ": " + veh.model);
        }
      });
    } else {
      alt.log("No vehicles in database!");
    }
  });
}

/**
 * Spawnt ein neues Fahrzeug mit VIN
 * @param model Das Modell
 * @param px Position-X
 * @param py Position-Y
 * @param pz Position-Z
 * @param rx Rotation-X
 * @param ry Rotation-Y
 * @param rz Rotation-Z
 * @returns Das Fahrzeug
 */
export function spawnNewVehicle(model, px, py, pz, rx, ry, rz): alt.Vehicle {
  let v = new alt.Vehicle(model, px, py, pz, rx, ry, rz);
  let vin = generateVIN(getManufacturerNameByVehicle(v));
  v.setSyncedMeta("vin", vin);
  v.numberPlateIndex = alt.NumberPlateStyle.BlueWhite; //Vielleicht randomizen oder halt später bei LSC
  v.numberPlateText = generateRandomLicensePlate();
  saveSingleVehilce(v);
  alt.log("Spawned new Vehicle with VIN: " + vin);
  return v;
}

/**
 * Speichert ein einzelnes Fahrzeug in der Datenbank
 * @param vehicle Das Fahrzeug, das gespeichert werden soll.
 */
export function saveSingleVehilce(vehicle: alt.Vehicle) {
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
  }, tables.vehicles, (result) => {});
}

/**
 * Gibt die Reihe zurück für eine Fahrgestellnummer
 * @param vin Die Fahrgestellnummer als string
 * @param callback result aus der Datenbank
 */
export function getVehicleByVin(vin: string, callback: CallableFunction) {
  let vinRes = database.fetchDataAsync("vin", vin, tables.vehicles);
  vinRes.then(result => {
    callback(result);
  });
}

/**
 * Speichert Datena aus getVehicleByVin wieder in der Datenbank
 * @param vehicleJSONData Die Daten
 */
export function updateVehicle(vehicleJSONData) {
  database.upsertData(vehicleJSONData, tables.vehicles, (result) => {});
}


function generateVIN(manufacturer: string): string {
  let shortCode: string = vinManufacturerDictionary.filter(pair => pair.key == manufacturer)[0].value;

  //Wahrscheinlichkeiten für doppelte Fahrgestellnummern: 61 + 36^14 = 6.140.942.214.464.815.497.277
  var symbols = '1234567890ABCDEFGHJKLMNPRSTUVWXYZ',
    serialLengthAlphabet = 14,
    randomSerialAlphabet = "",
    i: number,
    randomNumber: number;

  for (i = 0; i < serialLengthAlphabet; i++) {
    randomNumber = Math.floor(Math.random() * symbols.length);
    randomSerialAlphabet += symbols.substring(randomNumber, randomNumber + 1);
  }

  return shortCode + randomSerialAlphabet;
}

function generateRandomLicensePlate(): string {
  //Die Wahrscheinlichkeit, dass sich Nummernschilder doppeln dürfte bei 36^6 + 36^7 + 36^8 liegen also: 2.901.650.853.888
  var symbols = '1234567890ABCDEFGHJKLMNPRSTUVWXYZ',
    serialLengthAlphabet = Math.floor(Math.random() * (8 - 5 + 1)) + 5,
    randomSerialAlphabet = "",
    i: number,
    randomNumber: number;

  for (i = 0; i < serialLengthAlphabet; i++) {
    randomNumber = Math.floor(Math.random() * symbols.length);
    randomSerialAlphabet += symbols.substring(randomNumber, randomNumber + 1);
  }

  return randomSerialAlphabet;
}

export function findVehicles(key: string, value: any): VehicleFromDump[] {
  return vehicleList.filter(vehicle => vehicle[key] == value);
}

export function findFirstVehicle(key: string, value: any): VehicleFromDump {
  let list = findVehicles(key, value);
  if (list.length == 0) {
    return null;
  } else if (list.length == 1) {
    return list[0];
  } else {
    alt.logWarning("More than one Car found for request with key " + key + " and value " + value);
    return list[0];
  }
}

export function getManufacturerNameByVehicle(vehicle: alt.Vehicle) {
  return vehicleList.filter(element => element.Hash == vehicle.model)[0].Manufacturer;
}

export function getManufacturerNameByHash(hash: number) {
  return vehicleList.filter(element => element.Hash == hash)[0].Manufacturer;
}

let vinManufacturerDictionary: List<string, string>[] = [
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