/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { clearColshapes } from './eventHandlers/placeHandler';
import { playerRestartDisconnect } from './eventHandlers/playerDisconnect';
import { saveAllVehicles } from './managers/vehicleManager';

interface ServerCommand {
  main: string,
  alias: string[]
  continue: CallableFunction;
}

export let safeStopped: boolean = false;

let tooManyArgs = "Too many arguments";

let commandList: ServerCommand[] = [
  { main: "restart", alias: ["r"], continue: restartCommand },
  { main: "stop", alias: ["s"], continue: stopCommand },
  { main: "test", alias: [], continue: testCommand }
];

export function consoleCommand(name: string, ...args: string[]): void {
  if (name == "rp") {
    let filteredList = commandList.filter(c => (c.main == args[0]) || c.alias.includes(args[0]));
    if (filteredList.length == 0) {
      alt.logError("Unbekannter Befehl!");
    } else if (filteredList.length == 1) {   
      filteredList[0].continue(args.splice(0, 1));
    } else {
      alt.logError("Das hätte nicht passieren dürfen. Mehrere Befehle registriert, abbruch.");
    }
  }
}

function restartCommand(args: string[]) {
  if (args.length > 1) {
    alt.logError(tooManyArgs);
  } else {
    save("a_restart_rp");
  }
}

function stopCommand(args: string[]) {
  if (args.length > 1) {
    alt.logError(tooManyArgs);
  } else {
    save("a_stop_rp");
  }
}
  
function save(emitEvent: string) {
  clearColshapes();
  alt.Player.all.forEach((p) => {
    playerRestartDisconnect(p);
  });
  safeStopped = true;

  if (alt.Vehicle.all.length > 0) {
    saveAllVehicles().then(() => {
      alt.emit(emitEvent);
    });
  } else {
    alt.log("[31LB] No vehicles found to save");
    alt.emit(emitEvent);
  }
}

export function testCommand(args: string[]) {
  alt.Player.all.forEach((player) => {
    player.spawn(-1005.84, -478.92, 50.02733, 10);
  });
}