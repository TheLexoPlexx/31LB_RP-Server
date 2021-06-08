import { BaseObject } from "alt-client";

export interface Item extends BaseObject {
  displayname: string,
  description: string,
  icon?: string,
  size: {
    x: number,
    y: number
  },
  stackSizeMax: number,
  tags?: ItemRestrictionTags[]
}

export enum ItemRestrictionTags {

}

export class ItemHolder {
  displayname: string;
  sizeHeight: number;
  sizeWidth: number;
  items : [
    {
      posx: string;
      posy: string;
      item: Item;
    }
  ];
}