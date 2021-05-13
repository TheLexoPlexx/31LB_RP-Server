import * as alt from 'alt-client';
export function consoleCommand(name, ...args) {
    if (name == "login") {
        if (args.length < 1) {
            alt.logError("Password missing");
        }
        else if (args.length == 1) {
            alt.emitServer("a_login", args[0]);
        }
        else {
            alt.logError("Too many Args");
        }
    }
    else if (name == "place") {
        if (args.length > 1) {
            alt.logError("Too many Args");
        }
        else {
            alt.emitServer("a_placegen");
        }
    }
    else if (name == "cloth") {
        if (args.length > 1) {
            alt.logError("Too many Args");
        }
        else {
            alt.emitServer("a_clothselect");
        }
    }
    else {
        alt.logError("Not a valid command: " + name);
    }
}
