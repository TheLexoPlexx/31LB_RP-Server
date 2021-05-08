const WeaponTintList = {
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
export function getWeaponTintByName(name) {
    return WeaponTintList[name];
}
