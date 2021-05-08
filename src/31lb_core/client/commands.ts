/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-client" />
import * as alt from 'alt-client';

export function consoleCommand(name: string, ...args: string[]): void {
  if (name == "login") {
    if (args.length < 1) {
      alt.logError("Password missing");
    } else if (args.length == 1) {
      alt.emitServer("a_login", args[0]);
    } else {
      alt.logError("Too many Args");
    }

  } else if (name == "place") {
    if (args.length > 1) {
      alt.logError("Too many Args");
    } else {
      alt.emitServer("a_placegen");
    }
  } else {
    alt.logError("Not a valid command: " + name);
  }
}

//TODO native switchOutPlayer on successfull connect