export interface Rank {
  name: string;
}

const RankList: {
  [key: number]: Rank
} = {
  0: {
    name: "Normal",
  },
  100: {
    name: "Admin",
  },
};

/**
 * Get a weapon tint by its string name.
 * @export
 * @param {string} name
 * @return {*}  {(number | null)}
 */
export function getRank(number: number): Rank | null {
  return RankList[number];
}