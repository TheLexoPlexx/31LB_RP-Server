/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { loadFileJSON, saveFileJSON } from '../fileManager';
import * as playerManager from "../playerManager";
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

const CompIds: {
  [key: number]: string } = {
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

const propIds: {
  [key: number]: string } = {
  0: "Hats",
  1: "Glasses",
  2: "Ears",
  6: "Watches",
  7: "Bracelets",
};

const filePath: string = "pedComponentVariations";
let customClothCache = {
  m: undefined,
  f: undefined
};

const t_sort = {
  clothes: [],
  props: []
}

export function sortClothes() {
  let clothFile: PedComponentVariationDLC[] = loadFileJSON("pedComponentVariations");

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

  //TODO: Refactor, m&f, comp&props
  clothFile.forEach(dlc => {
    if (dlc.PedName == "mp_m_freemode_01") {


    } else if (dlc.PedName == "mp_f_freemode_01") {


    } else {
      alt.logWarning("Ped not handled: " + dlc.DlcName + " / " + dlc.PedName);
    }

    dlc.ComponentVariations.forEach(comp => {
      let currentHash = comp.NameHash.split("_");
      currentHash.pop();
      let tempHash = currentHash.join("_");

      if (tempCloth.cHash == null) {
        tempCloth.cHash = tempHash;
        tempCompId = comp.TextureId;
      }

      if (tempCloth.cHash == tempHash) {
        tempCloth.texture[comp.TextureId] = (comp.TranslatedLabel == (undefined || null)) ? "no_translation" : JSON.parse(JSON.stringify(comp.TranslatedLabel)).German;
      } else {
        if (t_sort.clothes[tempCompId] == undefined) {
          t_sort.clothes[tempCompId] = [];
        }
        tempCloth.drawable = comp.DrawableId;
        tempCloth.restrictionTags = comp.RestrictionTags;
        tempCloth.componentType = comp.ComponentType;
        t_sort.clothes[tempCompId].push(tempCloth);

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

      if (dlc.PedName == "mp_m_freemode_01") {
        customClothCache.m = t_sort;
      } else if (dlc.PedName == "mp_f_freemode_01") {
        customClothCache.f = t_sort;
      } else {
        alt.logWarning("Ped not handled: " + dlc.DlcName + " / " + dlc.PedName);
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
        if (t_sort.props[tempCompId] == undefined) {
          t_sort.props[tempCompId] = [];
        }
        tempProp.drawable = prop.DrawableId;
        tempProp.restrictionTags = prop.RestrictionTags;
        t_sort.props[tempCompId].push(tempProp);

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

      if (dlc.PedName == "mp_m_freemode_01") {
        customClothCache.m = t_sort;
      } else if (dlc.PedName == "mp_f_freemode_01") {
        customClothCache.f = t_sort;
      } else {
        alt.logWarning("Ped not handled: " + dlc.DlcName + " / " + dlc.PedName);
      }
    });
  });
  
  saveFileJSON("_clothTest", customClothCache);
}