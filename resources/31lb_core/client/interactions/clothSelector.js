const CompIds = {
    0: "Head",
    1: "Masks",
    2: "Hair Styles",
    3: "Torsos",
    4: "Legs",
    5: "Bags and Parachutes",
    6: "Shoes",
    7: "Accessories",
    8: "Undershirts",
    9: "Body Armors",
    10: "Decals",
    11: "Tops",
};
const propIds = {
    0: "Hats",
    1: "Glasses",
    2: "Ears",
    6: "Watches",
    7: "Bracelets",
};
export function isObjectEmpty(object) {
    for (const property in object) {
        return false;
    }
    return true;
}
export function clothSelector(pedComponentVariations) {
}
