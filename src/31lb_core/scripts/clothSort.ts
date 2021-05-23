import * as fs from "fs";

interface PedComponentVariationDLC {
  DlcName: string,
  PedName: string,
  ComponentVariations: PedComponentVariation[]
  Props: PedProps[]
}

interface PedComponentVariation {
  NameHash: string;
  ComponentType: string;
  ComponentId: number;
  DrawableId: number;
  TextureId: number;
  TranslatedLabel: string;
  Price: number;
  RestrictionTags: string[];
}

interface PedProps {
  NameHash: string,
  AnchorPoint: string,
  ComponentId: number,
  DrawableId: number,
  TextureId: number,
  TranslatedLabel: string;
  Price: number,
  RestrictionTags: string[]
}

interface ClothData {
  cHash: string;
  price: number;
  drawable: number;
  inventory: InventorySpace;
  texture: string[];
  restrictionTags: string[];
  componentType: string;
}

interface PropData {
  cHash: string;
  price: number;
  drawable: number;
  texture: string[];
  restrictionTags: string[];
  componentType: string;
}

interface InventorySpace {
  x: number;
  y: number;
}

const filePath: string = "./src/31lb_core/data_dumps/pedComponentVariations";
const filePathExport: string = "./src/31lb_core/client/shops/inventories/clothing";

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

//TODO: As of now: Replaces the entire file and recreates it, check if file already exist and load that, blacklist not entirely tested and refactoring is also needed.

export function sortClothes() {
  let clothFile: PedComponentVariationDLC[] = JSON.parse(fs.readFileSync(filePath + ".json", "utf-8"));

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
    dlcHash: null
  };

  let tempProp = {
    cHash: null,
    price: 0,
    drawable: -1,
    texture: [],
    restrictionTags: null,
    dlcHash: null
  };
  let tempCompId: number;

  clothFile.forEach(dlc => {
    dlc.ComponentVariations.forEach(comp => {
      let currentHash = comp.NameHash.split("_");
      currentHash.pop();
      let tempHash = currentHash.join("_");

      if (tempCloth.cHash == null) {
        tempCloth.cHash = tempHash;
        tempCompId = comp.ComponentId;
        tempCloth.texture[comp.TextureId] = (comp.TranslatedLabel == (undefined || null)) ? null : JSON.parse(JSON.stringify(comp.TranslatedLabel)).German;
      }

      if (tempCloth.cHash == tempHash) {
        tempCloth.texture[comp.TextureId] = (comp.TranslatedLabel == (undefined || null)) ? null : JSON.parse(JSON.stringify(comp.TranslatedLabel)).German;
      } else {
        tempCloth.drawable = comp.DrawableId;
        tempCloth.restrictionTags = comp.RestrictionTags;
        tempCloth.dlcHash = dlc.DlcName;

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
          if (tempCloth.cHash.split("_").includes("M")) { //TODO: Ändern von includes zu dlc.PedName und zwar so, dass die Zuordnung stimmt.
            if (customClothCache.m.clothes[tempCompId] == undefined) {
              customClothCache.m.clothes[tempCompId] = [];
            }
            customClothCache.m.clothes[tempCompId].push(tempCloth);
          } else {
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
          dlcHash: null
        };
        tempCloth.texture[comp.TextureId] = (comp.TranslatedLabel == (undefined || null)) ? null : JSON.parse(JSON.stringify(comp.TranslatedLabel)).German;
      }
    });
    dlc.Props.forEach(prop => {
      let currentHash = prop.NameHash.split("_");
      currentHash.pop();
      let tempHash = currentHash.join("_");

      if (tempProp.cHash == null) {
        tempProp.cHash = tempHash;
        tempCompId = prop.ComponentId;
        tempProp.texture[prop.TextureId] = (prop.TranslatedLabel == (undefined || null)) ? "no_translation" : JSON.parse(JSON.stringify(prop.TranslatedLabel)).German;
      }

      if (tempProp.cHash == tempHash) {
        tempProp.texture[prop.TextureId] = (prop.TranslatedLabel == (undefined || null)) ? "no_translation" : JSON.parse(JSON.stringify(prop.TranslatedLabel)).German;
      } else {
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
          } else {
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
          dlcHash: null
        };
        tempProp.texture[prop.TextureId] = (prop.TranslatedLabel == (undefined || null)) ? "no_translation" : JSON.parse(JSON.stringify(prop.TranslatedLabel)).German;
      }
    });
  });

  let pathparts = filePathExport.split("/");
  if (pathparts.length >= 1) {
    let fullPath = "";
    pathparts.forEach(part => {
      if (part != "." && part != pathparts[pathparts.length -1]) {
        fullPath += part + "/";
        try {
          fs.statSync(fullPath);
        } catch {
          fs.mkdirSync(fullPath);
        }
      }
    });
  }
  fs.writeFile(filePathExport + "_m.ts", "export var clothing_inventory_m = " + JSON.stringify(customClothCache.m, null, 2) + ";", "utf-8", (err) => {
    if (err != null) {
      console.log(err);
    }
  });
  fs.writeFile(filePathExport + "_f.ts", "export var clothing_inventory_f = " + JSON.stringify(customClothCache.f, null, 2) + ";", "utf-8", (err) => {
    if (err != null) {
      console.log(err);
    }
  });
  console.log("Success");
}

export const cloth_blacklist = {
  0: {
    isProp: !0,
    male: [1, 38, 46, 47, 57, 111, 112, 113, 115, 116, 117, 118, 119, 123, 124, 125, 126, 129, 133, 134, 137, 138, 144, 147, 148, 149],
    female: [1, 37, 45, 46, 110, 111, 112, 114, 115, 116, 117, 118, 122, 123, 124, 125, 128, 132, 133, 136, 137, 143, 146, 147, 148]
  },
  1: {
    isProp: !0,
    male: [26, 27],
    female: [28, 29]
  },
  4: {
    male: [30, 38, 39, 56, 77, 84, 85, 95, 106, 108, 109, 110, 111, 112, 113, 114, 115, 120],
    female: [21, 29, 38, 39, 79, 86, 88, 98, 113, 115, , 117, 118, 119, 120, 121, 122, 126, 131, 132]
  },
  6: {
    male: [0, 17, 33, 58, 67, 68, 87, 91],
    female: [17, 34, 61, 70, 71, 87, 91, 94, 95]
  },
  7: {
    male: [33, 40, 41, 125, 126, 127, 128, 133],
    female: [16, 24, 95, 96, 97, 98, 102]
  },
  8: {
    male: [19, 20, 58, 97, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 145, 151, 152, 153, 154, 155, 156, 164, 165],
    female: [18, 19, 35, 105, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 186, 187, 189, 190, 191, 192, 201]
  },
  11: {
    male: [2, 18, 48, 51, 54, 55, 65, 66, 116, 178, 186, 201, 228, 231, 246, 274, 275, 276, 277, 278, 283, 284, 285, 286, 287, 289, 291, 314, 315, 320],
    female: [19, 41, 44, 47, 48, 59, 60, 108, 180, 188, 238, 241, 254, 288, 289, 290, 296, 297, 298, 299, 300, 302, 304, 325, 326, 327, 328, 329]
  }
};

sortClothes();