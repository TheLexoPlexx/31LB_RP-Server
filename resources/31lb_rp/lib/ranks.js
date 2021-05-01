const RankList = {
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
export function getRank(number) {
    return RankList[number];
}
//# sourceMappingURL=ranks.js.map