/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-client" />
import * as alt from 'alt-client';
import { drawText, gtafonts } from './util/messenger';

export function consoleCommand(name, ...args) {
  if (name == "login") {
    if (args.length < 1) {
      alt.logError("Password missing");
    } else if (args.length == 1) {
      alt.emitServer("a_login", alt.player, args[0]);
    } else {
      alt.logError("Too many Args");
    }

  } else if (name == "test") {
    drawText("Du Pimmock", 5000, 0.5, 0.5, 1, gtafonts.Pricedown);
    
  } else {
    alt.logError("Not a valid command: " + name);
  }
}

//TODO native switchOutPlayer on successfull connect