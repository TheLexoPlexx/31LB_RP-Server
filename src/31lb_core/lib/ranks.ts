export interface Rank {
  name: string;
}

const RankList: {
  [key: number]: Rank
} = {
  0: {
    name: "Normal",
  },
  30: {
    name: "Junior-Supporter",
  },
  40: {
    name: "Supporter",
  },
  50: {
    name: "Senior-Supporter",
  },
  70: {
    name: "Moderator",
  },
  80: {
    name: "Senior-Moderator",
  },
  100: {
    name: "Admin",
  },
  120: {
    name: "Developer",
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