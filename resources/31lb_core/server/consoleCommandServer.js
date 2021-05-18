import { sortClothes } from "./eventHandlers/clothHandler";
export function consoleCommandServer(...args) {
    if (args[0] == "sortclothes") {
        sortClothes();
    }
}
