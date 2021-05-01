export interface WeaponTint {
  name: string;
  id: number;
}

const WeaponTintList: {
  [key: string]: WeaponTint
} = {
  normal: {
    name: "Normal",
    id: 0,
  },
  green: {
    name: "Green",
    id: 1,
  },
  golf: {
    name: "Gold",
    id: 2,
  },
  pink: {
    name: "Pink",
    id: 3,
  },
  army: {
    name: "Army",
    id: 4,
  },
  lspd: {
    name: "LSPD",
    id: 5,
  },
  orange: {
    name: "Orange",
    id: 6,
  },
  platinum: {
    name: "Platinum",
    id: 7,
  },
};

/**
 * Get a weapon tint by its string name.
 * @export
 * @param {string} name
 * @return {*}  {(number | null)}
 */
export function getWeaponTintByName(name: string): WeaponTint | null {
  return WeaponTintList[name];
}