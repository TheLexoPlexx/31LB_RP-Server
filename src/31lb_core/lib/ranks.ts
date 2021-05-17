export interface Rank {
  name: string;
  color ? : RankColor;
}

export interface RankColor {
  r: number;
  g: number;
  b: number;
}

const RankList: {
  [key: number]: Rank
} = {
  0: {
    name: "Normal",
    color: {
      r: 255,
      g: 255,
      b: 255,
    }
  },
  30: {
    name: "Junior-Supporter",
    color: {
      r: 255,
      g: 0,
      b: 0,
    }
  },
  40: {
    name: "Supporter I",
    color: {
      r: 205,
      g: 0,
      b: 0,
    }
  },
  50: {
    name: "Supporter II",
    color: {
      r: 139,
      g: 0,
      b: 0,
    }
  },
  60: {
    name: "Admin I",
    color: {
      r: 0,
      g: 255,
      b: 0,
    }
  },
  70: {
    name: "Admin II",
    color: {
      r: 0,
      g: 205,
      b: 0,
    }
  },
  80: {
    name: "Admin III",
    color: {
      r: 0,
      g: 139,
      b: 0,
    }
  },
  90: {
    name: "Head-Admin",
    color: {
      r: 0,
      g: 0,
      b: 128,
    }
  },
  100: {
    name: "Projektleitung",
    color: {
      r: 0,
      g: 229,
      b: 238,
    }
  },
};

/**
 * Get a Rank Name by number.
 * @export
 * @param {number} name
 * @return {Rank}  {(Rank | null)}
 */
export function getRank(number: number): Rank | null {
  return RankList[number];
}