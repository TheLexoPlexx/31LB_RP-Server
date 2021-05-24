/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { getPlayer, setValue } from './playerManager';

interface FactionColor {
  r: number;
  g: number;
  b: number;
}

const FactionType = {
  state: "Staatsfraktion",
  neutral: "Neutrale Fraktion",
  gang: "Gang",
}

interface Faction {
  name: string;
  shortname?: string;
  color: FactionColor;
  type: string;
}

export const Factions: {
  [key: string]: Faction } = {
  sapd: {
    name: "San Andreas Police Department",
    shortname: "SAPD",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.state,
  },
  lsmc: {
    name: "Los Santos Medical Centre",
    shortname: "LSCM",
    color: { r: 205, g: 205, b: 0 },
    type: FactionType.state,
  },
  lsfd: {
    name: "Los Santos Fire Department",
    shortname: "LSFD",
    color: { r: 139, g: 0, b: 0 },
    type: FactionType.state,
  },
  fib: {
    name: "Federal Investigation Bureau",
    shortname: "FIB",
    color: { r: 0, g: 0, b: 139 },
    type: FactionType.state,
  },
  army: {
    name: "Armee",
    shortname: "ARMY",
    color: { r: 0, g: 100, b: 0 },
    type: FactionType.state,
  },
  lsac: {
    name: "Los Santos Automobilclub",
    shortname: "LSAC",
    color: { r: 238, g: 118, b: 0 },
    type: FactionType.state,
  },
  fahrschule: {
    name: "Fahrschule",
    color: { r: 205, g: 198, b: 115 },
    type: FactionType.state,
  },
  news: {
    name: "Weazel News",
    shortname: "News",
    color: { r: 139, g: 0, b: 0 },
    type: FactionType.neutral,
  },
  lsc: {
    name: "Los Santos Customs",
    color: { r: 72, g: 61, b: 139 },
    type: FactionType.neutral,
  },
  state: {
    name: "Regierung",
    color: { r: 224, g: 238, b: 238 },
    type: FactionType.neutral,
  },
  grovestreet: {
    name: "Grove Street Families",
    color: { r: 0, g: 205, b: 0 },
    type: FactionType.gang,
  },
  ballas: {
    name: "Ballas",
    color: { r: 139, g: 0, b: 139 },
    type: FactionType.gang,
  },
  vagos: {
    name: "Los Santos Vagos",
    color: { r: 205, g: 115, b: 29 },
    type: FactionType.gang,
  },
  lostmc: {
    name: "The Lost MC",
    color: { r: 139, g: 90, b: 43 },
    type: FactionType.gang,
  },
  aztecas: {
    name: "Varrios Los Aztecas",
    color: { r: 255, g: 127, b: 36 },
    type: FactionType.gang,
  },
  madrazo: {
    name: "Madrazo Cartel",
    color: { r: 47, g: 79, b: 79 },
    type: FactionType.gang,
  },
};

export function setPlayerToFaction(player: alt.Player, argFaction: Faction) {
  getPlayer(player, (playerres) => {
    playerres.faction = argFaction.constructor.name;
    setValue(playerres, () => {});
  })
}
