const RankList = {
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
export function getRank(number) {
    return RankList[number];
}
