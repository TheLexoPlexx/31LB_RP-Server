import { cloth_blacklist } from '../../lib/cloth_blacklist';
import { loadFileJSON, saveFileJSON } from '../fileManager';
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
const filePath = "pedComponentVariations";
let customClothCache = {
    m: {
        clothes: [],
        props: []
    },
    f: {
        clothes: [],
        props: []
    }
};
export function sortClothes() {
    let clothFile = loadFileJSON("pedComponentVariations");
    let tempCloth = {
        cHash: null,
        price: 0,
        drawable: -1,
        inventory: {
            x: 10,
            y: 12
        },
        texture: [],
        restrictionTags: null,
        componentType: null
    };
    let tempProp = {
        cHash: null,
        price: 0,
        drawable: -1,
        texture: [],
        restrictionTags: null,
        componentType: null
    };
    let tempCompId;
    clothFile.forEach(dlc => {
        dlc.ComponentVariations.forEach(comp => {
            let currentHash = comp.NameHash.split("_");
            currentHash.pop();
            let tempHash = currentHash.join("_");
            if (tempCloth.cHash == null) {
                tempCloth.cHash = tempHash;
                tempCompId = comp.ComponentId;
            }
            if (tempCloth.cHash == tempHash) {
                tempCloth.texture[comp.TextureId] = (comp.TranslatedLabel == (undefined || null)) ? "no_translation" : JSON.parse(JSON.stringify(comp.TranslatedLabel)).German;
            }
            else {
                tempCloth.drawable = comp.DrawableId;
                tempCloth.restrictionTags = comp.RestrictionTags;
                tempCloth.componentType = comp.ComponentType;
                var skip = false;
                if (cloth_blacklist[tempCompId] != null) {
                    if (!cloth_blacklist[tempCompId].isProp) {
                        if (tempCloth.cHash.split("_").includes("M")) {
                            if (cloth_blacklist[tempCompId].male.includes(comp.DrawableId) || cloth_blacklist[tempCompId].female.includes(comp.DrawableId)) {
                                skip = true;
                            }
                        }
                    }
                }
                if (!skip) {
                    if (tempCloth.cHash.split("_").includes("M")) {
                        if (customClothCache.m.clothes[tempCompId] == undefined) {
                            customClothCache.m.clothes[tempCompId] = [];
                        }
                        customClothCache.m.clothes[tempCompId].push(tempCloth);
                    }
                    else {
                        if (customClothCache.f.clothes[tempCompId] == undefined) {
                            customClothCache.f.clothes[tempCompId] = [];
                        }
                        customClothCache.f.clothes[tempCompId].push(tempCloth);
                    }
                }
                tempCompId = comp.ComponentId;
                tempCloth = {
                    cHash: tempHash,
                    price: 0,
                    drawable: -1,
                    inventory: {
                        x: 10,
                        y: 12
                    },
                    texture: [],
                    restrictionTags: null,
                    componentType: null
                };
            }
        });
        dlc.Props.forEach(prop => {
            let currentHash = prop.NameHash.split("_");
            currentHash.pop();
            let tempHash = currentHash.join("_");
            if (tempProp.cHash == null) {
                tempProp.cHash = tempHash;
                tempCompId = prop.ComponentId;
            }
            if (tempProp.cHash == tempHash) {
                tempProp.texture[prop.TextureId] = (prop.TranslatedLabel == (undefined || null)) ? "no_translation" : JSON.parse(JSON.stringify(prop.TranslatedLabel)).German;
            }
            else {
                tempProp.drawable = prop.DrawableId;
                tempProp.restrictionTags = prop.RestrictionTags;
                var skip = false;
                if (cloth_blacklist[tempCompId] != null) {
                    if (cloth_blacklist[tempCompId].isProp) {
                        if (tempCloth.cHash.split("_").includes("M")) {
                            if (cloth_blacklist[tempCompId].male.includes(prop.DrawableId) || cloth_blacklist[tempCompId].female.includes(prop.DrawableId)) {
                                skip = true;
                            }
                        }
                    }
                }
                if (!skip) {
                    if (tempCloth.cHash.split("_").includes("M")) {
                        if (customClothCache.m.props[tempCompId] == undefined) {
                            customClothCache.m.props[tempCompId] = [];
                        }
                        customClothCache.m.props[tempCompId].push(tempCloth);
                    }
                    else {
                        if (customClothCache.f.props[tempCompId] == undefined) {
                            customClothCache.f.props[tempCompId] = [];
                        }
                        customClothCache.f.props[tempCompId].push(tempCloth);
                    }
                }
                tempCompId = prop.ComponentId;
                tempProp = {
                    cHash: tempHash,
                    price: 0,
                    drawable: -1,
                    texture: [],
                    restrictionTags: null,
                    componentType: null
                };
            }
        });
    });
    saveFileJSON("_clothTest", customClothCache);
}
