/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { cloth_blacklist } from '../../lib/cloth_blacklist';
import { loadFileJSON, saveFileJSON } from './../managers/fileManager';
import * as playerManager from "./../managers/playerManager";
//import { clothesFile, whitelistClothesFile } from '../startup';

/*
export function clothSelect(player) {
  playerManager.getPlayer(player, (r) => {
    if (r.permissionsgroup >= 100) {
      alt.emitClient(player, "a_clothselector", clothesFile, whitelistClothesFile);
    } else {
      alt.emitClient(player, "a_nopermission");
    }
  });
}
*/

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

const filePath: string = "./resources/31lb_core/data_dumps/pedComponentVariations";
const filePathExport: string = "./resources/31lb_core/client/bin/clothlist";

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
  let clothFile: PedComponentVariationDLC[] = loadFileJSON(filePath);

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
  let tempCompId: number;

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
      } else {
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
          componentType: null
        };
      }
    });
  });
  
  saveFileJSON(filePathExport, customClothCache);
}