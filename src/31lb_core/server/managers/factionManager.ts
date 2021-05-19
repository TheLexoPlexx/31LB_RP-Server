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
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.state,
  },
  lsfd: {
    name: "Los Santos Fire Department",
    shortname: "LSPD",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.state,
  },
  fib: {
    name: "Federal Investigation Bureau",
    shortname: "FIB",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.state,
  },
  army: {
    name: "Armee",
    shortname: "ARMY",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.state,
  },
  lsac: {
    name: "Los Santos Automobilclub",
    shortname: "LSAC",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.state,
  },
  fahrschule: {
    name: "Fahrschule",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.state,
  },
  news: {
    name: "Weazel News",
    shortname: "News",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.neutral,
  },
  lsc: {
    name: "Los Santos Customs",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.neutral,
  },
  state: {
    name: "Regierung",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.neutral,
  },
  grovestreet: {
    name: "Grove Street Families",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.gang,
  },
  ballas: {
    name: "Ballas",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.gang,
  },
  vagos: {
    name: "Los Santos Vagos",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.gang,
  },
  lostmc: {
    name: "The Lost MC",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.gang,
  },
  aztecas: {
    name: "Varrios Los Aztecas",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.gang,
  },
  madrazo: {
    name: "Madrazo Cartel",
    color: { r: 255, g: 255, b: 255 },
    type: FactionType.gang,
  },
};

export function setPlayerToFaction(player: alt.Player, argFaction: Faction) {
  getPlayer(player, (playerres) => {
    playerres.faction = argFaction.constructor.name;
    setValue(playerres, () => {});
  })
}