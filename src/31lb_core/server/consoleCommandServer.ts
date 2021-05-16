/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { sortClothes } from "./eventHandlers/clothHandler";

export function consoleCommandServer(...args: string[]) {
  if (args[0] == "sortclothes") {
    if (args.length >= 1) {
      alt.logError("Too many args");
    } else {
      sortClothes();
    }
  } 
}