/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import game from 'natives';
import * as NativeUI from "./nativeui/nativeui";

alt.on("consoleCommand", (name, ...args) => {
  if (name == "login") {
    if (args.length < 1) {
      alt.logError("Password missing");
    } else if (args.length == 1) {
      alt.emitServer("a_login", alt.player, args[0]);
    } else {
      alt.logError("Too many Args");
    }
    
  } else {
    alt.logError("Not a valid command");
  }
});

//TODO native switchOutPlayer on successfull connect