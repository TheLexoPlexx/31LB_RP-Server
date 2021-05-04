//TODO Check mk2finish and mk2paint
var WeaponComponentType;
(function (WeaponComponentType) {
    WeaponComponentType[WeaponComponentType["magazine"] = 0] = "magazine";
    WeaponComponentType[WeaponComponentType["finish"] = 1] = "finish";
    WeaponComponentType[WeaponComponentType["muzzle"] = 2] = "muzzle";
    WeaponComponentType[WeaponComponentType["flashlight"] = 3] = "flashlight";
    WeaponComponentType[WeaponComponentType["scope"] = 4] = "scope";
    WeaponComponentType[WeaponComponentType["grip"] = 5] = "grip";
    WeaponComponentType[WeaponComponentType["barrel"] = 6] = "barrel";
    WeaponComponentType[WeaponComponentType["mk2paint"] = 7] = "mk2paint";
    WeaponComponentType[WeaponComponentType["mk2finish"] = 8] = "mk2finish";
})(WeaponComponentType || (WeaponComponentType = {}));
export const WeaponList = {
    advancedrifle: {
        hash: 0xaf113f99,
        name: 'Advanced Rifle',
        desc: 'The most lightweight and compact of all assault rifles, without compromising accuracy and rate of fire.',
        type: 'Assault Rifle',
        price: 14250,
        clip: 30,
        stats: {
            damage: 24,
            rate: 70,
            accuracy: 50,
            range: 45,
        },
        overall: 47.8,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_ADVANCEDRIFLE_CLIP_01",
                hash: 0xFA8FA10F,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_ADVANCEDRIFLE_CLIP_02",
                hash: 0x8EC1C979,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_SMALL",
                hash: 0xAA2C45B4,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP",
                hash: 0x837445AA,
                type: WeaponComponentType.muzzle
            },
            gildedgunmetalfinish: {
                name: "Gilded Gun Metal Finish",
                hash_key: "COMPONENT_ADVANCEDRIFLE_VARMOD_LUXE",
                hash: 0x377CD377,
                type: WeaponComponentType.finish
            },
        }
    },
    appistol: {
        hash: 0x22d8fe39,
        name: 'AP Pistol',
        desc: 'High-penetration, fully-automatic pistol. Holds 18 rounds in magazine with option to extend to 36 rounds.',
        type: 'Handgun',
        price: 5000,
        clip: 18,
        stats: {
            damage: 26,
            rate: 80,
            accuracy: 35,
            range: 30,
        },
        overall: 38.2,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_APPISTOL_CLIP_01",
                hash: 0x31C4B22A,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_APPISTOL_CLIP_02",
                hash: 0x249A17D5,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_PI_FLSH",
                hash: 0x359B7AAE,
                type: WeaponComponentType.flashlight
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_PI_SUPP",
                hash: 0xC304849A,
                type: WeaponComponentType.muzzle
            },
            gildedgunmetalfinish: {
                name: "Gilded Gun Metal Finish",
                hash_key: "COMPONENT_APPISTOL_VARMOD_LUXE",
                hash: 0x9B76C72C,
                type: WeaponComponentType.finish
            },
        }
    },
    assaultrifle: {
        hash: 0xbfefff6d,
        name: 'Assault Rifle',
        desc: 'This standard assault rifle boasts a large capacity magazine and long distance accuracy.',
        type: 'Assault Rifle',
        price: 8550,
        clip: 30,
        stats: {
            damage: 30,
            rate: 60,
            accuracy: 45,
            range: 45,
        },
        overall: 44,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_ASSAULTRIFLE_CLIP_01",
                hash: 0xBE5EEA16,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_ASSAULTRIFLE_CLIP_02",
                hash: 0xB1214F9B,
                type: WeaponComponentType.magazine
            },
            drummagazine: {
                name: "Drum Magazine",
                hash_key: "COMPONENT_ASSAULTRIFLE_CLIP_03",
                hash: 0xDBF0A53D,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_MACRO",
                hash: 0x9D2FBF29,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP_02",
                hash: 0xA73D4664,
                type: WeaponComponentType.muzzle
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP",
                hash: 0xC164F53,
                type: WeaponComponentType.grip
            },
            yusufamirluxuryfinish: {
                name: "Yusuf Amir Luxury Finish",
                hash_key: "COMPONENT_ASSAULTRIFLE_VARMOD_LUXE",
                hash: 0x4EAD7533,
                type: WeaponComponentType.finish
            },
        }
    },
    assaultriflemk2: {
        hash: 0x394f415c,
        name: 'Assault Rifle MK II',
        desc: 'The definitive revision of an all-time classic: all it takes is a little work, and looks can kill after all.',
        type: 'Assault Rifle',
        price: 98750,
        clip: 30,
        stats: {
            damage: 33,
            rate: 60,
            accuracy: 45,
            range: 45,
        },
        overall: 44.6,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CLIP_01",
                hash: 0x8610343F,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CLIP_02",
                hash: 0xD12ACA6F,
                type: WeaponComponentType.magazine
            },
            tracerrounds: {
                name: "Tracer Rounds",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CLIP_TRACER",
                hash: 0xEF2C78C1,
                type: WeaponComponentType.magazine
            },
            incendiaryrounds: {
                name: "Incendiary Rounds",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CLIP_INCENDIARY",
                hash: 0xFB70D853,
                type: WeaponComponentType.magazine
            },
            armorpiercingrounds: {
                name: "Armor Piercing Rounds",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CLIP_ARMORPIERCING",
                hash: 0xA7DD1E58,
                type: WeaponComponentType.magazine
            },
            fullmetaljacketrounds: {
                name: "Full Metal Jacket Rounds",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CLIP_FMJ",
                hash: 0x63E0A098,
                type: WeaponComponentType.magazine
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP_02",
                hash: 0x9D65907A,
                type: WeaponComponentType.grip
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            holographicsight: {
                name: "Holographic Sight",
                hash_key: "COMPONENT_AT_SIGHTS",
                hash: 0x420FD713,
                type: WeaponComponentType.scope
            },
            smallscope: {
                name: "Small Scope",
                hash_key: "COMPONENT_AT_SCOPE_MACRO_MK2",
                hash: 0x49B2945,
                type: WeaponComponentType.scope
            },
            largescope: {
                name: "Large Scope",
                hash_key: "COMPONENT_AT_SCOPE_MEDIUM_MK2",
                hash: 0xC66B6542,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP_02",
                hash: 0xA73D4664,
                type: WeaponComponentType.muzzle
            },
            flatmuzzlebrake: {
                name: "Flat Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_01",
                hash: 0xB99402D4,
                type: WeaponComponentType.muzzle
            },
            tacticalmuzzlebrake: {
                name: "Tactical Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_02",
                hash: 0xC867A07B,
                type: WeaponComponentType.muzzle
            },
            flatendmuzzlebrake: {
                name: "Fat-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_03",
                hash: 0xDE11CBCF,
                type: WeaponComponentType.muzzle
            },
            precisionmuzzlebrake: {
                name: "Precision Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_04",
                hash: 0xEC9068CC,
                type: WeaponComponentType.muzzle
            },
            heavydutymuzzlebrake: {
                name: "Heavy Duty Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_05",
                hash: 0x2E7957A,
                type: WeaponComponentType.muzzle
            },
            slantedmuzzlebrake: {
                name: "Slanted Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_06",
                hash: 0x347EF8AC,
                type: WeaponComponentType.muzzle
            },
            splitendmuzzlebrake: {
                name: "Split-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_07",
                hash: 0x4DB62ABE,
                type: WeaponComponentType.muzzle
            },
            defaultbarrel: {
                name: "Default Barrel",
                hash_key: "COMPONENT_AT_AR_BARREL_01",
                hash: 0x43A49D26,
                type: WeaponComponentType.barrel
            },
            heavybarrel: {
                name: "Heavy Barrel",
                hash_key: "COMPONENT_AT_AR_BARREL_02",
                hash: 0x5646C26A,
                type: WeaponComponentType.barrel
            },
            digitalcamo: {
                name: "Digital Camo",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CAMO",
                hash: 0x911B24AF,
                type: WeaponComponentType.mk2finish
            },
            bruhstrokecamo: {
                name: "Brushstroke Camo",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CAMO_02",
                hash: 0x37E5444B,
                type: WeaponComponentType.mk2finish
            },
            woodlandcamo: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CAMO_03",
                hash: 0x538B7B97,
                type: WeaponComponentType.mk2finish
            },
            skull: {
                name: "Skull",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CAMO_04",
                hash: 0x25789F72,
                type: WeaponComponentType.mk2finish
            },
            sessantanove: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CAMO_05",
                hash: 0xC5495F2D,
                type: WeaponComponentType.mk2finish
            },
            perseus: {
                name: "Perseus",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CAMO_06",
                hash: 0xCF8B73B1,
                type: WeaponComponentType.mk2finish
            },
            leopard: {
                name: "Leopard",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CAMO_07",
                hash: 0xA9BB2811,
                type: WeaponComponentType.mk2finish
            },
            zebra: {
                name: "Zebra",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CAMO_08",
                hash: 0xFC674D54,
                type: WeaponComponentType.mk2finish
            },
            geometric: {
                name: "Geometric",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CAMO_09",
                hash: 0x7C7FCD9B,
                type: WeaponComponentType.mk2finish
            },
            boom: {
                name: "Boom!",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CAMO_10",
                hash: 0xA5C38392,
                type: WeaponComponentType.mk2finish
            },
            patriotic: {
                name: "Patriotic",
                hash_key: "COMPONENT_ASSAULTRIFLE_MK2_CAMO_IND_01",
                hash: 0xB9B15DB0,
                type: WeaponComponentType.mk2finish
            },
        }
    },
    assaultshotgun: {
        hash: 0xe284c527,
        name: 'Assault Shotgun',
        desc: 'Fully automatic shotgun with 8 round magazine and high rate of fire.',
        type: 'Shotgun',
        price: 10000,
        clip: 8,
        stats: {
            damage: 77,
            rate: 50,
            accuracy: 25,
            range: 15,
        },
        overall: 35.4,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_ASSAULTSHOTGUN_CLIP_01",
                hash: 0x94E81BC7,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_ASSAULTSHOTGUN_CLIP_02",
                hash: 0x86BD7F72,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP",
                hash: 0x837445AA,
                type: WeaponComponentType.muzzle
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP",
                hash: 0xC164F53,
                type: WeaponComponentType.grip
            },
        }
    },
    assaultsmg: {
        hash: 0xefe7e2df,
        name: 'Assault SMG',
        desc: 'A high-capacity submachine gun that is both compact and lightweight. Holds up to 30 bullets in one magazine.',
        type: 'Machine Gun',
        price: 12550,
        clip: 30,
        stats: {
            damage: 23,
            rate: 55,
            accuracy: 45,
            range: 40,
        },
        overall: 40.6,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_ASSAULTSMG_CLIP_01",
                hash: 0x8D1307B0,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_ASSAULTSMG_CLIP_02",
                hash: 0xBB46E417,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_MACRO",
                hash: 0x9D2FBF29,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP_02",
                hash: 0xA73D4664,
                type: WeaponComponentType.muzzle
            },
            yusufamirluxuryfinish: {
                name: "Yusuf Amir Luxury Finish",
                hash_key: "COMPONENT_ASSAULTSMG_VARMOD_LOWRIDER",
                hash: 0x278C78AF,
                type: WeaponComponentType.finish
            },
        }
    },
    autoshotgun: {
        hash: 0x12e82d3d,
        name: 'Auto Shotgun',
        desc: 'Fully automatic shotgun with 8 round magazine and high rate of fire.',
        type: 'Shotgun',
        price: 10000,
        clip: 8,
        stats: {
            damage: 77,
            rate: 50,
            accuracy: 25,
            range: 15,
        },
        overall: 35.4,
    },
    ball: {
        hash: 0x23c9f95c,
        name: 'Baseball',
        desc: `Come and get ya hotdog $5!`,
        type: 'Thrown',
        price: 10,
        clip: 1,
        stats: {
            damage: 0,
            rate: 10,
            accuracy: 10,
            range: 0,
        },
        overall: 5,
    },
    bat: {
        hash: 0x958a4a8f,
        name: 'Baseball Bat',
        desc: 'Aluminum baseball bat with leather grip. Lightweight yet powerful for all you big hitters out there.',
        type: 'Melee',
        price: 100,
        stats: {
            damage: 20,
            rate: 10,
            range: 1,
        },
        overall: 10.33,
    },
    battleaxe: {
        hash: 0xcd274149,
        name: 'Battle Axe',
        desc: `If it's good enough for medieval foot soldiers, modern border guards and pushy soccer moms, it's good enough for you.`,
        type: 'Melee',
        price: 300,
        stats: {
            damage: 15,
            rate: 15,
            range: 0,
        },
        overall: 10,
    },
    bottle: {
        hash: 0xf9e6aa4b,
        name: 'Broken Bottle',
        desc: `It's not clever and it's not pretty but, most of the time, neither is the guy coming at you with a knife. When all else fails, this gets the job done.`,
        type: 'Melee',
        price: 8,
        stats: {
            damage: 20,
            rate: 15,
            range: 1,
        },
        overall: 12,
    },
    bullpuprifle: {
        hash: 0x7f229f94,
        name: 'Bullpup Rifle',
        desc: `The latest Chinese import taking America by storm, this rifle is known for its balanced handling. Lightweight and very controllable in automatic fire.`,
        type: 'Assault Rifle',
        price: 14500,
        clip: 30,
        stats: {
            damage: 32,
            rate: 70,
            accuracy: 45,
            range: 45,
        },
        overall: 46,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_BULLPUPRIFLE_CLIP_01",
                hash: 0xC5A12F80,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_BULLPUPRIFLE_CLIP_02",
                hash: 0xB3688B0F,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_SMALL",
                hash: 0xAA2C45B4,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP",
                hash: 0x837445AA,
                type: WeaponComponentType.muzzle
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP",
                hash: 0xC164F53,
                type: WeaponComponentType.grip
            },
            gildedgunmetalfinish: {
                name: "Gilded Gun Metal Finish",
                hash_key: "COMPONENT_BULLPUPRIFLE_VARMOD_LOW",
                hash: 0xA857BC78,
                type: WeaponComponentType.finish
            },
        }
    },
    bullpupriflemk2: {
        hash: 0x84d6fafd,
        name: 'Bullpup Rifle MK II',
        desc: `So precise, so exquisite, it's not so much a hail of bullets as a symphony.`,
        type: 'Assault Rifle',
        price: 14500,
        clip: 30,
        stats: {
            damage: 35,
            rate: 72,
            accuracy: 45,
            range: 45,
        },
        overall: 47.4,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CLIP_01",
                hash: 0x18929DA,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CLIP_02",
                hash: 0xEFB00628,
                type: WeaponComponentType.magazine
            },
            tracerrounds: {
                name: "Tracer Rounds",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CLIP_TRACER",
                hash: 0x822060A9,
                type: WeaponComponentType.magazine
            },
            incendiaryrounds: {
                name: "Incendiary Rounds",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CLIP_INCENDIARY",
                hash: 0xA99CF95A,
                type: WeaponComponentType.magazine
            },
            armorpiercingrounds: {
                name: "Armor Piercing Rounds",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CLIP_ARMORPIERCING",
                hash: 0xFAA7F5ED,
                type: WeaponComponentType.magazine
            },
            fullmetaljacketrounds: {
                name: "Full Metal Jacket Rounds",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CLIP_FMJ",
                hash: 0x43621710,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            holographicsight: {
                name: "Holographic Sight",
                hash_key: "COMPONENT_AT_SIGHTS",
                hash: 0x420FD713,
                type: WeaponComponentType.scope
            },
            smallscope: {
                name: "Small Scope",
                hash_key: "COMPONENT_AT_SCOPE_MACRO_02_MK2",
                hash: 0xC7ADD105,
                type: WeaponComponentType.scope
            },
            mediumscope: {
                name: "Medium Scope",
                hash_key: "COMPONENT_AT_SCOPE_SMALL_MK2",
                hash: 0x3F3C8181,
                type: WeaponComponentType.scope
            },
            defaultbarrel: {
                name: "Default Barrel",
                hash_key: "COMPONENT_AT_BP_BARREL_01",
                hash: 0x659AC11B,
                type: WeaponComponentType.barrel
            },
            heavybarrel: {
                name: "Heavy Barrel",
                hash_key: "COMPONENT_AT_BP_BARREL_02",
                hash: 0x3BF26DC7,
                type: WeaponComponentType.barrel
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP",
                hash: 0x837445AA,
                type: WeaponComponentType.muzzle
            },
            flatmuzzlebrake: {
                name: "Flat Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_01",
                hash: 0xB99402D4,
                type: WeaponComponentType.muzzle
            },
            tacticalmuzzlebrake: {
                name: "Tactical Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_02",
                hash: 0xC867A07B,
                type: WeaponComponentType.muzzle
            },
            flatendmuzzlebrake: {
                name: "Fat-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_03",
                hash: 0xDE11CBCF,
                type: WeaponComponentType.muzzle
            },
            precisionmuzzlebrake: {
                name: "Precision Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_04",
                hash: 0xEC9068CC,
                type: WeaponComponentType.muzzle
            },
            heavydutymuzzlebrake: {
                name: "Heavy Duty Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_05",
                hash: 0x2E7957A,
                type: WeaponComponentType.muzzle
            },
            slantedmuzzlebrake: {
                name: "Slanted Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_06",
                hash: 0x347EF8AC,
                type: WeaponComponentType.muzzle
            },
            splitendmuzzlebrake: {
                name: "Split-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_07",
                hash: 0x4DB62ABE,
                type: WeaponComponentType.muzzle
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP_02",
                hash: 0x9D65907A,
                type: WeaponComponentType.grip
            },
            digitalcamo: {
                name: "Digital Camo",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CAMO",
                hash: 0xAE4055B7,
                type: WeaponComponentType.mk2finish
            },
            brushstrokecamo: {
                name: "Brushstroke Camo",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CAMO_02",
                hash: 0xB905ED6B,
                type: WeaponComponentType.mk2finish
            },
            woodlandcamo: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CAMO_03",
                hash: 0xA6C448E8,
                type: WeaponComponentType.mk2finish
            },
            skull: {
                name: "Skull",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CAMO_04",
                hash: 0x9486246C,
                type: WeaponComponentType.mk2finish
            },
            sessantanove: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CAMO_05",
                hash: 0x8A390FD2,
                type: WeaponComponentType.mk2finish
            },
            perseus: {
                name: "Perseus",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CAMO_06",
                hash: 0x2337FC5,
                type: WeaponComponentType.mk2finish
            },
            leopard: {
                name: "Leopard",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CAMO_07",
                hash: 0xEFFFDB5E,
                type: WeaponComponentType.mk2finish
            },
            zebra: {
                name: "Zebra",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CAMO_08",
                hash: 0xDDBDB6DA,
                type: WeaponComponentType.mk2finish
            },
            geometric: {
                name: "Geometric",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CAMO_09",
                hash: 0xCB631225,
                type: WeaponComponentType.mk2finish
            },
            boom: {
                name: "Boom!",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CAMO_10",
                hash: 0xA87D541E,
                type: WeaponComponentType.mk2finish
            },
            patriotic: {
                name: "Patriotic",
                hash_key: "COMPONENT_BULLPUPRIFLE_MK2_CAMO_IND_01",
                hash: 0xC5E9AE52,
                type: WeaponComponentType.mk2finish
            },
        }
    },
    bullpupshotgun: {
        hash: 0x9d61e50f,
        name: 'Bullpup Shotgun',
        desc: `More than makes up for its slow, pump-action rate of fire with its range and spread. Decimates anything in its projectile path.`,
        type: 'Shotgun',
        price: 8000,
        clip: 14,
        stats: {
            damage: 67,
            rate: 20,
            accuracy: 30,
            range: 20,
        },
        overall: 31.4,
        components: {
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP_02",
                hash: 0xA73D4664,
                type: WeaponComponentType.muzzle
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP",
                hash: 0xC164F53,
                type: WeaponComponentType.grip
            },
        }
    },
    bzgas: {
        hash: 0xa0973d5e,
        name: 'Tear Gas',
        desc: `Tear gas grenade, particularly effective at incapacitating multiple assailants. Sustained exposure can be lethal.`,
        type: 'Thrown',
        price: 150,
        clip: 25,
        stats: {
            damage: 10,
            rate: 20,
            accuracy: 10,
            range: 15,
        },
        overall: 13.75,
    },
    carbinerifle: {
        hash: 0x83bf0278,
        name: 'Carbine Rifle',
        desc: 'Combining long distance accuracy with a high capacity magazine, the Carbine Rifle can be relied on to make the hit.',
        type: 'Assault Rifle',
        price: 13000,
        clip: 30,
        stats: {
            damage: 32,
            rate: 65,
            accuracy: 55,
            range: 45,
        },
        overall: 47.4,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_CARBINERIFLE_CLIP_01",
                hash: 0x9FBE33EC,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_CARBINERIFLE_CLIP_02",
                hash: 0x91109691,
                type: WeaponComponentType.magazine
            },
            boxmagazine: {
                name: "Box Magazine",
                hash_key: "COMPONENT_CARBINERIFLE_CLIP_03",
                hash: 0xBA62E935,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_MEDIUM",
                hash: 0xA0D89C42,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP",
                hash: 0x837445AA,
                type: WeaponComponentType.muzzle
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP",
                hash: 0xC164F53,
                type: WeaponComponentType.grip
            },
            yusufamirluxuryfinish: {
                name: "Yusuf Amir Luxury Finish",
                hash_key: "COMPONENT_CARBINERIFLE_VARMOD_LUXE",
                hash: 0xD89B9658,
                type: WeaponComponentType.finish
            },
        }
    },
    carbineriflemk2: {
        hash: 0xfad1f1c9,
        name: 'Carbine Rifle MK II',
        desc: `This is bespoke, artisan firepower: you couldn't deliver a hail of bullets with more love and care if you inserted them by hand.`,
        type: 'Assault Rifle',
        price: 107500,
        clip: 30,
        stats: {
            damage: 36,
            rate: 65,
            accuracy: 55,
            range: 45,
        },
        overall: 48.2,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CLIP_01",
                hash: 0x4C7A391E,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CLIP_02",
                hash: 0x5DD5DBD5,
                type: WeaponComponentType.magazine
            },
            tracerrounds: {
                name: "Tracer Rounds",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CLIP_TRACER",
                hash: 0x1757F566,
                type: WeaponComponentType.magazine
            },
            incendiaryrounds: {
                name: "Incendiary Rounds",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CLIP_INCENDIARY",
                hash: 0x3D25C2A7,
                type: WeaponComponentType.magazine
            },
            armorpiercingrounds: {
                name: "Armor Piercing Rounds",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CLIP_ARMORPIERCING",
                hash: 0x255D5D57,
                type: WeaponComponentType.magazine
            },
            fullmetaljacketrounds: {
                name: "Full Metal Jacket Rounds",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CLIP_FMJ",
                hash: 0x44032F11,
                type: WeaponComponentType.magazine
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP_02",
                hash: 0x9D65907A,
                type: WeaponComponentType.grip
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            holographicsight: {
                name: "Holographic Sight",
                hash_key: "COMPONENT_AT_SIGHTS",
                hash: 0x420FD713,
                type: WeaponComponentType.scope
            },
            smallscope: {
                name: "Small Scope",
                hash_key: "COMPONENT_AT_SCOPE_MACRO_MK2",
                hash: 0x49B2945,
                type: WeaponComponentType.scope
            },
            largescope: {
                name: "Large Scope",
                hash_key: "COMPONENT_AT_SCOPE_MEDIUM_MK2",
                hash: 0xC66B6542,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP",
                hash: 0x837445AA,
                type: WeaponComponentType.muzzle
            },
            flatmuzzlebrake: {
                name: "Flat Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_01",
                hash: 0xB99402D4,
                type: WeaponComponentType.muzzle
            },
            tacticalmuzzlebrake: {
                name: "Tactical Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_02",
                hash: 0xC867A07B,
                type: WeaponComponentType.muzzle
            },
            flatendmuzzlebrake: {
                name: "Fat-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_03",
                hash: 0xDE11CBCF,
                type: WeaponComponentType.muzzle
            },
            precisionmuzzlebrake: {
                name: "Precision Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_04",
                hash: 0xEC9068CC,
                type: WeaponComponentType.muzzle
            },
            heavydutymuzzlebrake: {
                name: "Heavy Duty Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_05",
                hash: 0x2E7957A,
                type: WeaponComponentType.muzzle
            },
            slantedmuzzlebrake: {
                name: "Slanted Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_06",
                hash: 0x347EF8AC,
                type: WeaponComponentType.muzzle
            },
            splitendmuzzlebrake: {
                name: "Split-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_07",
                hash: 0x4DB62ABE,
                type: WeaponComponentType.muzzle
            },
            defaultbarrel: {
                name: "Default Barrel",
                hash_key: "COMPONENT_AT_CR_BARREL_01",
                hash: 0x833637FF,
                type: WeaponComponentType.barrel
            },
            heavybarrel: {
                name: "Heavy Barrel",
                hash_key: "COMPONENT_AT_CR_BARREL_02",
                hash: 0x8B3C480B,
                type: WeaponComponentType.barrel
            },
            digitalcamo: {
                name: "Digital Camo",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CAMO",
                hash: 0x4BDD6F16,
                type: WeaponComponentType.mk2finish
            },
            brushstrokecamo: {
                name: "Brushstroke Camo",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CAMO_02",
                hash: 0x406A7908,
                type: WeaponComponentType.mk2finish
            },
            woodlandcamo: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CAMO_03",
                hash: 0x2F3856A4,
                type: WeaponComponentType.mk2finish
            },
            skull: {
                name: "Skull",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CAMO_04",
                hash: 0xE50C424D,
                type: WeaponComponentType.mk2finish
            },
            sessantanove: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CAMO_05",
                hash: 0xD37D1F2F,
                type: WeaponComponentType.mk2finish
            },
            perseus: {
                name: "Perseus",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CAMO_06",
                hash: 0x86268483,
                type: WeaponComponentType.mk2finish
            },
            leopard: {
                name: "Leopard",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CAMO_07",
                hash: 0xF420E076,
                type: WeaponComponentType.mk2finish
            },
            zebra: {
                name: "Zebra",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CAMO_08",
                hash: 0xAAE14DF8,
                type: WeaponComponentType.mk2finish
            },
            geometric: {
                name: "Geometric",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CAMO_09",
                hash: 0x9893A95D,
                type: WeaponComponentType.mk2finish
            },
            boom: {
                name: "Boom!",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CAMO_10",
                hash: 0x6B13CD3E,
                type: WeaponComponentType.mk2finish
            },
            patriotic: {
                name: "Patriotic",
                hash_key: "COMPONENT_CARBINERIFLE_MK2_CAMO_IND_01",
                hash: 0xDA55CD3F,
                type: WeaponComponentType.mk2finish
            },
        }
    },
    ceramicpistol: {
        hash: 0x2b5ef5ec,
        name: 'Ceramic Pistol',
        desc: `Not your grandma's ceramics. Although this pint-sized pistol is small enough to fit into her purse and won't set off a metal detector.`,
        type: 'Handgun',
        price: 20000,
        clip: 12,
        stats: {
            damage: 32,
            rate: 44,
            accuracy: 36,
            range: 20,
        },
        overall: 27.6,
    },
    combatmg: {
        hash: 0x7fd62962,
        name: 'Combat MG',
        desc: `Lightweight, compact machine gun that combines excellent maneuverability with a high rate of fire to devastating effect.`,
        type: 'Machine Gun',
        price: 14800,
        clip: 100,
        stats: {
            damage: 55,
            rate: 65,
            accuracy: 45,
            range: 60,
        },
        overall: 59,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_COMBATMG_CLIP_01",
                hash: 0xE1FFB34A,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_COMBATMG_CLIP_02",
                hash: 0xD6C59CD6,
                type: WeaponComponentType.magazine
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_MEDIUM",
                hash: 0xA0D89C42,
                type: WeaponComponentType.scope
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP",
                hash: 0xC164F53,
                type: WeaponComponentType.grip
            },
            etchedgunmetalfinish: {
                name: "Etched Gun Metal Finish",
                hash_key: "COMPONENT_COMBATMG_VARMOD_LOWRIDER",
                hash: 0x92FECCDD,
                type: WeaponComponentType.finish
            },
        }
    },
    combatmgmk2: {
        hash: 0xdbbd7280,
        name: 'Combat MG MKII',
        desc: `You can never have too much of a good thing: after all, if the first shot counts, then the next hundred or so must count for double.`,
        type: 'Machine Gun',
        price: 119000,
        clip: 100,
        stats: {
            damage: 57,
            rate: 65,
            accuracy: 45,
            range: 60,
        },
        overall: 59.4,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_COMBATMG_MK2_CLIP_01",
                hash: 0x492B257C,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_COMBATMG_MK2_CLIP_02",
                hash: 0x17DF42E9,
                type: WeaponComponentType.magazine
            },
            tracerrounds: {
                name: "Tracer Rounds",
                hash_key: "COMPONENT_COMBATMG_MK2_CLIP_TRACER",
                hash: 0xF6649745,
                type: WeaponComponentType.magazine
            },
            incendiaryrounds: {
                name: "Incendiary Rounds",
                hash_key: "COMPONENT_COMBATMG_MK2_CLIP_INCENDIARY",
                hash: 0xC326BDBA,
                type: WeaponComponentType.magazine
            },
            armorpiercingrounds: {
                name: "Armor Piercing Rounds",
                hash_key: "COMPONENT_COMBATMG_MK2_CLIP_ARMORPIERCING",
                hash: 0x29882423,
                type: WeaponComponentType.magazine
            },
            fullmetaljacketrounds: {
                name: "Full Metal Jacket Rounds",
                hash_key: "COMPONENT_COMBATMG_MK2_CLIP_FMJ",
                hash: 0x57EF1CC8,
                type: WeaponComponentType.magazine
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP_02",
                hash: 0x9D65907A,
                type: WeaponComponentType.grip
            },
            holographicsight: {
                name: "Holographic Sight",
                hash_key: "COMPONENT_AT_SIGHTS",
                hash: 0x420FD713,
                type: WeaponComponentType.scope
            },
            mediumscope: {
                name: "Medium Scope",
                hash_key: "COMPONENT_AT_SCOPE_SMALL_MK2",
                hash: 0x3F3C8181,
                type: WeaponComponentType.scope
            },
            largescope: {
                name: "Large Scope",
                hash_key: "COMPONENT_AT_SCOPE_MEDIUM_MK2",
                hash: 0xC66B6542,
                type: WeaponComponentType.scope
            },
            flatmuzzlebrake: {
                name: "Flat Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_01",
                hash: 0xB99402D4,
                type: WeaponComponentType.muzzle
            },
            tacticalmuzzlebrake: {
                name: "Tactical Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_02",
                hash: 0xC867A07B,
                type: WeaponComponentType.muzzle
            },
            flatendmuzzlebrake: {
                name: "Fat-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_03",
                hash: 0xDE11CBCF,
                type: WeaponComponentType.muzzle
            },
            precisionmuzzlebrake: {
                name: "Precision Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_04",
                hash: 0xEC9068CC,
                type: WeaponComponentType.muzzle
            },
            heavydutymuzzlebrake: {
                name: "Heavy Duty Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_05",
                hash: 0x2E7957A,
                type: WeaponComponentType.muzzle
            },
            slantedmuzzlebrake: {
                name: "Slanted Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_06",
                hash: 0x347EF8AC,
                type: WeaponComponentType.muzzle
            },
            splitendmuzzlebrake: {
                name: "Split-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_07",
                hash: 0x4DB62ABE,
                type: WeaponComponentType.muzzle
            },
            defaultbarrel: {
                name: "Default Barrel",
                hash_key: "COMPONENT_AT_MG_BARREL_01",
                hash: 0xC34EF234,
                type: WeaponComponentType.barrel
            },
            heavybarrel: {
                name: "Heavy Barrel",
                hash_key: "COMPONENT_AT_MG_BARREL_02",
                hash: 0xB5E2575B,
                type: WeaponComponentType.barrel
            },
            digitalcamo: {
                name: "Digital Camo",
                hash_key: "COMPONENT_COMBATMG_MK2_CAMO",
                hash: 0x4A768CB5,
                type: WeaponComponentType.mk2finish
            },
            brushstrokecamo: {
                name: "Brushstroke Camo",
                hash_key: "COMPONENT_COMBATMG_MK2_CAMO_02",
                hash: 0xCCE06BBD,
                type: WeaponComponentType.mk2finish
            },
            woodlandcamo: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_COMBATMG_MK2_CAMO_03",
                hash: 0xBE94CF26,
                type: WeaponComponentType.mk2finish
            },
            skull: {
                name: "Skull",
                hash_key: "COMPONENT_COMBATMG_MK2_CAMO_04",
                hash: 0x7609BE11,
                type: WeaponComponentType.mk2finish
            },
            sessantanove: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_COMBATMG_MK2_CAMO_05",
                hash: 0x48AF6351,
                type: WeaponComponentType.mk2finish
            },
            perseus: {
                name: "Perseus",
                hash_key: "COMPONENT_COMBATMG_MK2_CAMO_06",
                hash: 0x9186750A,
                type: WeaponComponentType.mk2finish
            },
            leopard: {
                name: "Leopard",
                hash_key: "COMPONENT_COMBATMG_MK2_CAMO_07",
                hash: 0x84555AA8,
                type: WeaponComponentType.mk2finish
            },
            zebra: {
                name: "Zebra",
                hash_key: "COMPONENT_COMBATMG_MK2_CAMO_08",
                hash: 0x1B4C088B,
                type: WeaponComponentType.mk2finish
            },
            geometric: {
                name: "Geometric",
                hash_key: "COMPONENT_COMBATMG_MK2_CAMO_09",
                hash: 0xE046DFC,
                type: WeaponComponentType.mk2finish
            },
            boom: {
                name: "Boom!",
                hash_key: "COMPONENT_COMBATMG_MK2_CAMO_10",
                hash: 0x28B536E,
                type: WeaponComponentType.mk2finish
            },
            patriotic: {
                name: "Patriotic",
                hash_key: "COMPONENT_COMBATMG_MK2_CAMO_IND_01",
                hash: 0xD703C94D,
                type: WeaponComponentType.mk2finish
            },
        }
    },
    combatpdw: {
        hash: 0xa3d4d34,
        name: 'Combat PDW',
        desc: `Who said personal weaponry couldn't be worthy of military personnel? Thanks to our lobbyists, not Congress. Integral suppressor.`,
        type: 'Machine Gun',
        price: 11750,
        clip: 30,
        stats: {
            damage: 25,
            rate: 50,
            accuracy: 45,
            range: 38,
        },
        overall: 39.6,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_COMBATPDW_CLIP_01",
                hash: 0x4317F19E,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_COMBATPDW_CLIP_02",
                hash: 0x334A5203,
                type: WeaponComponentType.magazine
            },
            drummagazine: {
                name: "Drum Magazine",
                hash_key: "COMPONENT_COMBATPDW_CLIP_03",
                hash: 0x6EB8C8DB,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP",
                hash: 0xC164F53,
                type: WeaponComponentType.grip
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_SMALL",
                hash: 0xAA2C45B4,
                type: WeaponComponentType.scope
            },
        }
    },
    combatpistol: {
        hash: 0x5ef9fec4,
        name: 'Combat Pistol',
        desc: `A compact, lightweight semi-automatic pistol designed for law enforcement and personal defense use. 12-round magazine with option to extend to 16 rounds.`,
        type: 'Handgun',
        price: 3200,
        clip: 12,
        stats: {
            damage: 27,
            rate: 40,
            accuracy: 50,
            range: 30,
        },
        overall: 31.4,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_COMBATPISTOL_CLIP_01",
                hash: 0x721B079,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_COMBATPISTOL_CLIP_02",
                hash: 0xD67B4F2D,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_PI_FLSH",
                hash: 0x359B7AAE,
                type: WeaponComponentType.flashlight
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_PI_SUPP",
                hash: 0xC304849A,
                type: WeaponComponentType.muzzle
            },
            yusufamirluxuryfinish: {
                name: "Yusuf Amir Luxury Finish",
                hash_key: "COMPONENT_COMBATPISTOL_VARMOD_LOWRIDER",
                hash: 0xC6654D72,
                type: WeaponComponentType.finish
            },
        }
    },
    compactlauncher: {
        hash: 0x781fe4a,
        name: 'Compact Grenade Launcher',
        desc: `Focus groups using the regular model suggested it was too accurate and found it awkward to use with one hand on the throttle. Easy fix.`,
        type: `Heavy Weapon`,
        price: 45000,
        clip: 1,
        stats: {
            damage: 95,
            rate: 10,
            accuracy: 15,
            range: 55,
        },
        overall: 39,
    },
    compactrifle: {
        hash: 0x624fe830,
        name: 'Compact Rifle',
        desc: `Half the size, all the power, double the recoil: there's no riskier way to say "I'm compensating for something".`,
        type: 'Assault Rifle',
        price: 14650,
        clip: 30,
        stats: {
            damage: 36,
            rate: 60,
            accuracy: 35,
            range: 45,
        },
        overall: 43.2,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_COMPACTRIFLE_CLIP_01",
                hash: 0x513F0A63,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_COMPACTRIFLE_CLIP_02",
                hash: 0x59FF9BF8,
                type: WeaponComponentType.magazine
            },
            drummagazine: {
                name: "Drum Magazine",
                hash_key: "COMPONENT_COMPACTRIFLE_CLIP_03",
                hash: 0xC607740E,
                type: WeaponComponentType.magazine
            },
        }
    },
    crowbar: {
        hash: 0x84bd7bfd,
        name: 'Crowbar',
        desc: `Heavy-duty crowbar forged from high quality, tempered steel for that extra leverage you need to get the job done.`,
        type: 'Melee',
        price: 55,
        stats: {
            damage: 10,
            rate: 15,
            range: 1,
        },
        overall: 8.67,
    },
    dagger: {
        hash: 0x92a27487,
        name: 'Antique Cavalry Dagger',
        desc: `You've been rocking the pirate-chic look for a while, but no vicious weapon to complete the look? Get this dagger with guarded hilt.`,
        type: 'Melee',
        price: 2000,
        stats: {
            damage: 20,
            rate: 20,
            range: 2,
        },
        overall: 14,
    },
    dbshotgun: {
        hash: 0xef951fbb,
        name: 'Double Barrel Shotgun',
        desc: `Do one thing, do it well. Who needs a high rate of fire when your first shot turns the other guy into a fine mist?`,
        type: 'Shotgun',
        price: 15450,
        clip: 2,
        stats: {
            damage: 98,
            rate: 25,
            accuracy: 15,
            range: 10,
        },
        overall: 30,
    },
    doubleaction: {
        hash: 0x97ea20b8,
        name: 'Double Action Revolver',
        desc: `Because sometimes revenge is a dish best served six times, in quick succession, right between the eyes.`,
        type: 'Handgun',
        price: 75000,
        clip: 6,
        stats: {
            damage: 70,
            rate: 35,
            accuracy: 65,
            range: 20,
        },
        overall: 39.2,
    },
    fireextinguisher: {
        hash: 0x60ec506,
        name: 'Fire Extinguisher',
        desc: `Smother the flames of your enemies.`,
        type: 'Utility',
        price: 200,
        clip: 100,
    },
    firework: {
        hash: 0x7f7497e5,
        name: 'Firework Launcher',
        desc: `Put the flair back in flare with this firework launcher, guaranteed to raise some oohs and aahs from the crowd.`,
        type: 'Heavy Weapon',
        price: 65000,
        clip: 1,
        stats: {
            damage: 45,
            rate: 5,
            accuracy: 12,
            range: 60,
        },
        overall: 26.4,
    },
    flare: {
        hash: 0x497facc3,
        name: 'Flare',
        desc: `Signal some assistance.`,
        type: `Thrown`,
        price: 50,
        clip: 1,
        stats: {
            damage: 0,
            rate: 10,
            accuracy: 10,
            range: 25
        },
        overall: 11.25,
    },
    flaregun: {
        hash: 0x47757124,
        name: 'Flare Gun',
        desc: `Use to signal distress or drunken excitement. Warning: pointing directly at individuals may cause spontaneous combustion.`,
        type: `Handgun`,
        price: 3750,
        clip: 1,
        stats: {
            damage: 20,
            rate: 10,
            accuracy: 30,
            range: 10,
        },
        overall: 16,
    },
    flashlight: {
        hash: 0x8bb05fd7,
        name: 'Flashlight',
        desc: `Intensify your fear of the dark with this short range, battery-powered light source. Handy for blunt force trauma.`,
        type: 'Melee',
        price: 250,
        stats: {
            damage: 10,
            rate: 15,
            range: 0,
        },
        overall: 8.33,
    },
    golfclub: {
        hash: 0x440e4788,
        name: 'Golf Club',
        desc: `Standard length, mid iron golf club with rubber grip for a lethal short game.`,
        type: `Melee`,
        price: 125,
        stats: {
            damage: 20,
            rate: 10,
            range: 1,
        },
        overall: 10.33,
    },
    grenade: {
        hash: 0x93e220bd,
        name: 'Grenade',
        desc: `Standard fragmentation grenade. Pull pin, throw, then find cover. Ideal for eliminating clustered assailants.`,
        type: `Heavy Weapon`,
        price: 2500,
        clip: 1,
        stats: {
            damage: 95,
            rate: 20,
            accuracy: 10,
            range: 15,
        },
        overall: 35,
    },
    grenadelauncher: {
        hash: 0xa284510b,
        name: 'Grenade Launcher',
        desc: `A compact, lightweight grenade launcher with semi-automatic functionality. Holds up to 10 rounds.`,
        type: `Heavy Weapon`,
        price: 32400,
        clip: 10,
        stats: {
            damage: 95,
            rate: 20,
            accuracy: 10,
            range: 50,
        },
        overall: 39.0,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_GRENADELAUNCHER_CLIP_01",
                hash: 0x11AE5C97,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP",
                hash: 0xC164F53,
                type: WeaponComponentType.grip
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_SMALL",
                hash: 0xAA2C45B4,
                type: WeaponComponentType.scope
            }
        }
    },
    smokelauncher: {
        hash: 0x4dd2dc56,
        name: 'Smoke Launcher',
        desc: `A compact, lightweight smoke launcher with semi-automatic functionality. Holds up to 10 rounds.`,
        type: `Utility`,
        price: 4200,
        clip: 10,
    },
    gusenberg: {
        hash: 0x61012683,
        name: 'Gusenberg Sweeper',
        desc: `Complete your look with a Prohibition gun. Looks great being fired from an Albany Roosevelt or paired with a pinstripe suit.`,
        type: `Machine Gun`,
        price: 14600,
        clip: 30,
        stats: {
            damage: 34,
            rate: 65,
            accuracy: 38,
            range: 56,
        },
        overall: 46.6,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_GUSENBERG_CLIP_01",
                hash: 0x1CE5A6A5,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_GUSENBERG_CLIP_02",
                hash: 0xEAC8C270,
                type: WeaponComponentType.magazine
            },
        }
    },
    hammer: {
        hash: 0x4e875f73,
        name: `Hammer`,
        desc: `A robust, multi-purpose hammer with wooden handle and curved claw, this old classic still nails the competition.`,
        type: `Melee`,
        price: 500,
        stats: {
            damage: 10,
            rate: 15,
            range: 1,
        },
        overall: 8.67,
    },
    hatchet: {
        hash: 0xf9dcbf2d,
        name: 'Hatchet',
        desc: `Add a good old-fashioned hatchet to your armory, and always have a back up for when ammo is hard to come by.`,
        type: `Melee`,
        price: 750,
        stats: {
            damage: 15,
            rate: 15,
            range: 0,
        },
        overall: 10,
    },
    hazardcan: {
        hash: 0xba536372,
        name: 'Hazard Can',
        desc: `No idea what this is.`,
        type: `Thrown`,
        price: 100,
        clip: 100,
        stats: {
            damage: 0,
            rate: 10,
            accuracy: 30,
            range: 1,
        },
        overall: 24.2,
    },
    heavypistol: {
        hash: 0xd205520e,
        name: 'Heavy Pistol',
        desc: `The heavyweight champion of the magazine fed, semi-automatic handgun world. Delivers accuracy and a serious forearm workout every time.`,
        type: `Handgun`,
        price: 3750,
        clip: 18,
        stats: {
            damage: 40,
            rate: 40,
            accuracy: 50,
            range: 35
        },
        overall: 37,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_HEAVYPISTOL_CLIP_01",
                hash: 0xD4A969A,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_HEAVYPISTOL_CLIP_02",
                hash: 0x64F9C62B,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_PI_FLSH",
                hash: 0x359B7AAE,
                type: WeaponComponentType.flashlight
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_PI_SUPP",
                hash: 0xC304849A,
                type: WeaponComponentType.muzzle
            },
            etchedwoodgripfinish: {
                name: "Etched Wood Grip Finish",
                hash_key: "COMPONENT_HEAVYPISTOL_VARMOD_LUXE",
                hash: 0x7A6A7B7B,
                type: WeaponComponentType.finish
            },
        }
    },
    heavyshotgun: {
        hash: 0x3aabbbaa,
        name: 'Heavy Shotgun',
        desc: `The weapon to reach for when you absolutely need to make a horrible mess of the room. Best used near easy-wipe surfaces only.`,
        type: `Shotgun`,
        price: 13550,
        clip: 6,
        stats: {
            damage: 85,
            rate: 45,
            accuracy: 30,
            range: 25
        },
        overall: 38.6,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_HEAVYSHOTGUN_CLIP_01",
                hash: 0x324F2D5F,
                type: WeaponComponentType.grip
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_HEAVYSHOTGUN_CLIP_02",
                hash: 0x971CF6FD,
                type: WeaponComponentType.grip
            },
            drummagazine: {
                name: "Drum Magazine",
                hash_key: "COMPONENT_HEAVYSHOTGUN_CLIP_03",
                hash: 0x88C7DA53,
                type: WeaponComponentType.grip
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.grip
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP_02",
                hash: 0xA73D4664,
                type: WeaponComponentType.grip
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP",
                hash: 0xC164F53,
                type: WeaponComponentType.grip
            },
        }
    },
    heavysniper: {
        hash: 0xc472fe2,
        name: `Heavy Sniper`,
        desc: `Features armor-piercing rounds for heavy damage. Comes with laser scope as standard.`,
        type: `Sniper Rifle`,
        price: 38150,
        clip: 6,
        stats: {
            damage: 98,
            rate: 20,
            accuracy: 90,
            range: 100,
        },
        overall: 62.6,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_HEAVYSNIPER_CLIP_01",
                hash: 0x476F52F4,
                type: WeaponComponentType.magazine
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_LARGE",
                hash: 0xD2443DDC,
                type: WeaponComponentType.scope
            },
            advancedscope: {
                name: "Advanced Scope",
                hash_key: "COMPONENT_AT_SCOPE_MAX",
                hash: 0xBC54DA77,
                type: WeaponComponentType.scope
            },
        }
    },
    heavysnipermk2: {
        hash: 0xa914799,
        name: 'Heavy Sniper MK II',
        desc: `Far away, yet always intimate: if you're looking for a secure foundation for that long-distance relationship, this is it.`,
        type: `Sniper Rifle`,
        price: 165375,
        clip: 6,
        stats: {
            damage: 98,
            rate: 20,
            accuracy: 90,
            range: 100,
        },
        overall: 62.6,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CLIP_01",
                hash: 0xFA1E1A28,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CLIP_02",
                hash: 0x2CD8FF9D,
                type: WeaponComponentType.magazine
            },
            incendiaryrounds: {
                name: "Incendiary Rounds",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CLIP_INCENDIARY",
                hash: 0xEC0F617,
                type: WeaponComponentType.magazine
            },
            armorpiercingrounds: {
                name: "Armor Piercing Rounds",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CLIP_ARMORPIERCING",
                hash: 0xF835D6D4,
                type: WeaponComponentType.magazine
            },
            fullmetaljacketrounds: {
                name: "Full Metal Jacket Rounds",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CLIP_FMJ",
                hash: 0x3BE948F6,
                type: WeaponComponentType.magazine
            },
            explosiverounds: {
                name: "Explosive Rounds",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CLIP_EXPLOSIVE",
                hash: 0x89EBDAA7,
                type: WeaponComponentType.magazine
            },
            zoomscope: {
                name: "Zoom Scope",
                hash_key: "COMPONENT_AT_SCOPE_LARGE_MK2",
                hash: 0x82C10383,
                type: WeaponComponentType.scope
            },
            advancedscope: {
                name: "Advanced Scope",
                hash_key: "COMPONENT_AT_SCOPE_MAX",
                hash: 0xBC54DA77,
                type: WeaponComponentType.scope
            },
            nightvisionscope: {
                name: "Night Vision Scope",
                hash_key: "COMPONENT_AT_SCOPE_NV",
                hash: 0xB68010B0,
                type: WeaponComponentType.scope
            },
            thermalscope: {
                name: "Thermal Scope",
                hash_key: "COMPONENT_AT_SCOPE_THERMAL",
                hash: 0x2E43DA41,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_SR_SUPP_03",
                hash: 0xAC42DF71,
                type: WeaponComponentType.muzzle
            },
            squaredmuzzlebrake: {
                name: "Squared Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_08",
                hash: 0x5F7DCE4D,
                type: WeaponComponentType.muzzle
            },
            bellendmuzzlebrake: {
                name: "Bell-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_09",
                hash: 0x6927E1A1,
                type: WeaponComponentType.muzzle
            },
            defaultbarrel: {
                name: "Default Barrel",
                hash_key: "COMPONENT_AT_SR_BARREL_01",
                hash: 0x909630B7,
                type: WeaponComponentType.barrel
            },
            heavybarrel: {
                name: "Heavy Barrel",
                hash_key: "COMPONENT_AT_SR_BARREL_02",
                hash: 0x108AB09E,
                type: WeaponComponentType.barrel
            },
            digitalcamo: {
                name: "Digital Camo",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CAMO",
                hash: 0xF8337D02,
                type: WeaponComponentType.mk2finish
            },
            brushstrokecamo: {
                name: "Brushstroke Camo",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CAMO_02",
                hash: 0xC5BEDD65,
                type: WeaponComponentType.mk2finish
            },
            woodlandcamo: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CAMO_03",
                hash: 0xE9712475,
                type: WeaponComponentType.mk2finish
            },
            skull: {
                name: "Skull",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CAMO_04",
                hash: 0x13AA78E7,
                type: WeaponComponentType.mk2finish
            },
            sessantanove: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CAMO_05",
                hash: 0x26591E50,
                type: WeaponComponentType.mk2finish
            },
            perseus: {
                name: "Perseus",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CAMO_06",
                hash: 0x302731EC,
                type: WeaponComponentType.mk2finish
            },
            leopard: {
                name: "Leopard",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CAMO_07",
                hash: 0xAC722A78,
                type: WeaponComponentType.mk2finish
            },
            zebra: {
                name: "Zebra",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CAMO_08",
                hash: 0xBEA4CEDD,
                type: WeaponComponentType.mk2finish
            },
            geometric: {
                name: "Geometric",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CAMO_09",
                hash: 0xCD776C82,
                type: WeaponComponentType.mk2finish
            },
            boom: {
                name: "Boom!",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CAMO_10",
                hash: 0xABC5ACC7,
                type: WeaponComponentType.mk2finish
            },
            patriotic: {
                name: "Patriotic",
                hash_key: "COMPONENT_HEAVYSNIPER_MK2_CAMO_IND_01",
                hash: 0x6C32D2EB,
                type: WeaponComponentType.mk2finish
            },
        }
    },
    hominglauncher: {
        hash: 0x63ab0442,
        name: 'Homing Launcher',
        desc: `Infrared guided fire-and-forget missile launcher. For all your moving target needs.`,
        type: `Heavy Weapon`,
        price: 165000,
        clip: 1,
        stats: {
            damage: 95,
            rate: 5,
            accuracy: 25,
            range: 75,
        },
        overall: 42,
    },
    knife: {
        hash: 0x99b507ea,
        name: 'Knife',
        desc: `This carbon steel 7" bladed knife is dual edged with a serrated spine to provide improved stabbing and thrusting capabilities.`,
        type: `Melee`,
        price: 400,
        stats: {
            damage: 15,
            rate: 20,
            range: 1,
        },
        overall: 12,
    },
    knuckle: {
        hash: 0xd8df3c3c,
        name: 'Knuckle Dusters',
        desc: `Perfect for knocking out gold teeth, or as a gift to the trophy partner who has everything.`,
        type: `Melee`,
        price: 7500,
        stats: {
            damage: 10,
            rate: 20,
            range: 1,
        },
        overall: 1,
        components: {
            theballas: {
                name: "The Ballas",
                hash_key: "COMPONENT_KNUCKLE_VARMOD_BALLAS",
                hash: 0xEED9FD63,
                type: WeaponComponentType.finish
            },
            basemodel: {
                name: "Base Model",
                hash_key: "COMPONENT_KNUCKLE_VARMOD_BASE",
                hash: 0xF3462F33,
                type: WeaponComponentType.finish
            },
            therock: {
                name: "The Rock",
                hash_key: "COMPONENT_KNUCKLE_VARMOD_DIAMOND",
                hash: 0x9761D9DC,
                type: WeaponComponentType.finish
            },
            thehustler: {
                name: "The Hustler",
                hash_key: "COMPONENT_KNUCKLE_VARMOD_DOLLAR",
                hash: 0x50910C31,
                type: WeaponComponentType.finish
            },
            thehater: {
                name: "The Hater",
                hash_key: "COMPONENT_KNUCKLE_VARMOD_HATE",
                hash: 0x7DECFE30,
                type: WeaponComponentType.finish
            },
            theking: {
                name: "The King",
                hash_key: "COMPONENT_KNUCKLE_VARMOD_KING",
                hash: 0xE28BABEF,
                type: WeaponComponentType.finish
            },
            thelover: {
                name: "The Lover",
                hash_key: "COMPONENT_KNUCKLE_VARMOD_LOVE",
                hash: 0x3F4E8AA6,
                type: WeaponComponentType.finish
            },
            thepimp: {
                name: "The Pimp",
                hash_key: "COMPONENT_KNUCKLE_VARMOD_PIMP",
                hash: 0xC613F685,
                type: WeaponComponentType.finish
            },
            theplayer: {
                name: "The Player",
                hash_key: "COMPONENT_KNUCKLE_VARMOD_PLAYER",
                hash: 0x8B808BB,
                type: WeaponComponentType.finish
            },
            thevagos: {
                name: "The Vagos",
                hash_key: "COMPONENT_KNUCKLE_VARMOD_VAGOS",
                hash: 0x7AF3F785,
                type: WeaponComponentType.finish
            },
        }
    },
    machete: {
        hash: 0xdd5df8d9,
        name: 'Machete',
        desc: `America's West African arms trade isn't just about giving. Rediscover the simple life with this rusty cleaver.`,
        type: `Melee`,
        price: 8900,
        stats: {
            damage: 15,
            rate: 15,
            range: 0,
        },
        overall: 10,
    },
    machinepistol: {
        hash: 0xdb1aa450,
        name: 'Machine Pistol',
        desc: `This fully automatic is the snare drum to your twin-engine V8 bass: no drive-by sounds quite right without it.`,
        type: `Machine Gun`,
        price: 6250,
        clip: 12,
        stats: {
            damage: 28,
            rate: 70,
            accuracy: 40,
            range: 30,
        },
        overall: 36,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_MACHINEPISTOL_CLIP_01",
                hash: 0x476E85FF,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_MACHINEPISTOL_CLIP_02",
                hash: 0xB92C6979,
                type: WeaponComponentType.magazine
            },
            drummagazine: {
                name: "Drum Magazine",
                hash_key: "COMPONENT_MACHINEPISTOL_CLIP_03",
                hash: 0xA9E9CAF4,
                type: WeaponComponentType.magazine
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_PI_SUPP",
                hash: 0xC304849A,
                type: WeaponComponentType.muzzle
            },
        }
    },
    marksmanpistol: {
        hash: 0xdc4db296,
        name: 'Marksman Pistol',
        desc: `Not for the risk averse. Make it count as you'll be reloading as much as you shoot.`,
        type: `Handgun`,
        price: 4350,
        clip: 1,
        stats: {
            damage: 80,
            rate: 15,
            accuracy: 30,
            range: 35,
        },
        overall: 32.4,
    },
    marksmanrifle: {
        hash: 0xc734385a,
        name: 'Marksman Rifle',
        desc: `Whether you're up close or a disconcertingly long way away, this weapon will get the job done. A multi-range tool for tools.`,
        type: `Sniper Rifle`,
        price: 15750,
        clip: 8,
        stats: {
            damage: 70,
            rate: 40,
            accuracy: 80,
            range: 90,
        },
        overall: 58,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_MARKSMANRIFLE_CLIP_01",
                hash: 0xD83B4141,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_MARKSMANRIFLE_CLIP_02",
                hash: 0xCCFD2AC5,
                type: WeaponComponentType.magazine
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_LARGE_FIXED_ZOOM",
                hash: 0x1C221B1A,
                type: WeaponComponentType.scope
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP",
                hash: 0x837445AA,
                type: WeaponComponentType.muzzle
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP",
                hash: 0xC164F53,
                type: WeaponComponentType.grip
            },
            yusufamirluxuryfinish: {
                name: "Yusuf Amir Luxury Finish",
                hash_key: "COMPONENT_MARKSMANRIFLE_VARMOD_LUXE",
                hash: 0x161E9241,
                type: WeaponComponentType.finish
            },
        }
    },
    marksmanriflemk2: {
        hash: 0x6a6c02e0,
        name: 'Marksman Rifle MK II',
        desc: `Known in military circles as The Dislocator, this mod set will destroy both the target and your shoulder, in that order.`,
        type: `Sniper Rifle`,
        price: 149000,
        clip: 8,
        stats: {
            damage: 70,
            rate: 40,
            accuracy: 80,
            range: 90,
        },
        overall: 58,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CLIP_01",
                hash: 0x94E12DCE,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CLIP_02",
                hash: 0xE6CFD1AA,
                type: WeaponComponentType.magazine
            },
            tracerrounds: {
                name: "Tracer Rounds",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CLIP_TRACER",
                hash: 0xD77A22D2,
                type: WeaponComponentType.magazine
            },
            incendiaryrounds: {
                name: "Incendiary Rounds",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CLIP_INCENDIARY",
                hash: 0x6DD7A86E,
                type: WeaponComponentType.magazine
            },
            armorpiercingrounds: {
                name: "Armor Piercing Rounds",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CLIP_ARMORPIERCING",
                hash: 0xF46FD079,
                type: WeaponComponentType.magazine
            },
            fullmetaljacketrounds: {
                name: "Full Metal Jacket Rounds",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CLIP_FMJ",
                hash: 0xE14A9ED3,
                type: WeaponComponentType.magazine
            },
            holographicsight: {
                name: "Holographic Sight",
                hash_key: "COMPONENT_AT_SIGHTS",
                hash: 0x420FD713,
                type: WeaponComponentType.scope
            },
            largescope: {
                name: "Large Scope",
                hash_key: "COMPONENT_AT_SCOPE_MEDIUM_MK2",
                hash: 0xC66B6542,
                type: WeaponComponentType.scope
            },
            zoomscope: {
                name: "Zoom Scope",
                hash_key: "COMPONENT_AT_SCOPE_LARGE_FIXED_ZOOM_MK2",
                hash: 0x5B1C713C,
                type: WeaponComponentType.scope
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP",
                hash: 0x837445AA,
                type: WeaponComponentType.muzzle
            },
            flatmuzzlebrake: {
                name: "Flat Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_01",
                hash: 0xB99402D4,
                type: WeaponComponentType.muzzle
            },
            tacticalmuzzlebrake: {
                name: "Tactical Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_02",
                hash: 0xC867A07B,
                type: WeaponComponentType.muzzle
            },
            fatendmuzzlebrake: {
                name: "Fat-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_03",
                hash: 0xDE11CBCF,
                type: WeaponComponentType.muzzle
            },
            precisionmuzzlebrake: {
                name: "Precision Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_04",
                hash: 0xEC9068CC,
                type: WeaponComponentType.muzzle
            },
            heavydutymuzzlebrake: {
                name: "Heavy Duty Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_05",
                hash: 0x2E7957A,
                type: WeaponComponentType.muzzle
            },
            slantedmuzzlebrake: {
                name: "Slanted Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_06",
                hash: 0x347EF8AC,
                type: WeaponComponentType.muzzle
            },
            splitendmuzzlebrake: {
                name: "Split-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_07",
                hash: 0x4DB62ABE,
                type: WeaponComponentType.muzzle
            },
            defaultbarrel: {
                name: "Default Barrel",
                hash_key: "COMPONENT_AT_MRFL_BARREL_01",
                hash: 0x381B5D89,
                type: WeaponComponentType.barrel
            },
            heavybarrel: {
                name: "Heavy Barrel",
                hash_key: "COMPONENT_AT_MRFL_BARREL_02",
                hash: 0x68373DDC,
                type: WeaponComponentType.barrel
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP_02",
                hash: 0x9D65907A,
                type: WeaponComponentType.mk2finish
            },
            digitalcamo: {
                name: "Digital Camo",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CAMO",
                hash: 0x9094FBA0,
                type: WeaponComponentType.mk2finish
            },
            brushtrokecamo: {
                name: "Brushstroke Camo",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CAMO_02",
                hash: 0x7320F4B2,
                type: WeaponComponentType.mk2finish
            },
            woodlandcamo: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CAMO_03",
                hash: 0x60CF500F,
                type: WeaponComponentType.mk2finish
            },
            skull: {
                name: "Skull",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CAMO_04",
                hash: 0xFE668B3F,
                type: WeaponComponentType.mk2finish
            },
            sessantanove: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CAMO_05",
                hash: 0xF3757559,
                type: WeaponComponentType.mk2finish
            },
            perseus: {
                name: "Perseus",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CAMO_06",
                hash: 0x193B40E8,
                type: WeaponComponentType.mk2finish
            },
            leopard: {
                name: "Leopard",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CAMO_07",
                hash: 0x107D2F6C,
                type: WeaponComponentType.mk2finish
            },
            zebra: {
                name: "Zebra",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CAMO_08",
                hash: 0xC4E91841,
                type: WeaponComponentType.mk2finish
            },
            geometric: {
                name: "Geometric",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CAMO_09",
                hash: 0x9BB1C5D3,
                type: WeaponComponentType.mk2finish
            },
            boom: {
                name: "Boom!",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CAMO_10",
                hash: 0x3B61040B,
                type: WeaponComponentType.mk2finish
            },
            boomslide: {
                name: "Boom!",
                hash_key: "COMPONENT_MARKSMANRIFLE_MK2_CAMO_IND_01",
                hash: 0xB7A316DA,
                type: WeaponComponentType.mk2finish
            },
        }
    },
    mg: {
        hash: 0x9d07f764,
        name: 'MG',
        desc: `General purpose machine gun that combines rugged design with dependable performance. Long range penetrative power. Very effective against large groups.`,
        type: `Machine Gun`,
        price: 13500,
        clip: 54,
        stats: {
            damage: 50,
            rate: 60,
            accuracy: 40,
            range: 60,
        },
        overall: 52,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_MG_CLIP_01",
                hash: 0xF434EF84,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_MG_CLIP_02",
                hash: 0x82158B47,
                type: WeaponComponentType.magazine
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_SMALL_02",
                hash: 0x3C00AFED,
                type: WeaponComponentType.scope
            },
            yusufamirluxuryfinish: {
                name: "Yusuf Amir Luxury Finish",
                hash_key: "COMPONENT_MG_VARMOD_LOWRIDER",
                hash: 0xD6DABABE,
                type: WeaponComponentType.finish
            },
        }
    },
    microsmg: {
        hash: 0x13532244,
        name: `Micro SMG`,
        desc: `Combines compact design with a high rate of fire at approximately 700-900 rounds per minute.`,
        type: `Machine Gun`,
        price: 3750,
        clip: 16,
        stats: {
            damage: 21,
            rate: 60,
            accuracy: 30,
            range: 25,
        },
        overall: 31.2,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_MICROSMG_CLIP_01",
                hash: 0xCB48AEF0,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_MICROSMG_CLIP_02",
                hash: 0x10E6BA2B,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_PI_FLSH",
                hash: 0x359B7AAE,
                type: WeaponComponentType.flashlight
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_MACRO",
                hash: 0x9D2FBF29,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP_02",
                hash: 0xA73D4664,
                type: WeaponComponentType.muzzle
            },
            yusufamirluxuryfinish: {
                name: "Yusuf Amir Luxury Finish",
                hash_key: "COMPONENT_MICROSMG_VARMOD_LUXE",
                hash: 0x487AAE09,
                type: WeaponComponentType.finish
            },
        }
    },
    minigun: {
        hash: 0x42bf8a85,
        name: 'Minigun',
        desc: `A devastating 6-barrel machine gun that features Gatling-style rotating barrels. Very high rate of fire (2000 to 6000 rounds per minute).`,
        type: `Heavy Weapon`,
        price: 470000,
        clip: 595,
        stats: {
            damage: 30,
            rate: 100,
            accuracy: 40,
            range: 55,
        },
        overall: 63,
    },
    minismg: {
        hash: 0xbd248b55,
        name: `Mini SMG`,
        desc: `Increasingly popular since the marketing team looked beyond spec ops units and started caring about the little guys in low income areas.`,
        type: `Machine Gun`,
        price: 8900,
        clip: 20,
        stats: {
            damage: 22,
            rate: 84,
            accuracy: 33,
            range: 30,
        },
        overall: 36.2,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_MINISMG_CLIP_01",
                hash: 0x84C8B2D3,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_MINISMG_CLIP_02",
                hash: 0x937ED0B7,
                type: WeaponComponentType.magazine
            },
        }
    },
    molotov: {
        hash: 0x24b17070,
        name: 'Molotov',
        desc: `Crude yet highly effective incendiary weapon. No happy hour with this cocktail.`,
        type: `Thrown`,
        price: 200,
        clip: 1,
        stats: {
            damage: 50,
            rate: 20,
            accuracy: 20,
            range: 8,
        },
        overall: 24.5,
    },
    musket: {
        hash: 0xa89cb99e,
        name: `Musket`,
        desc: `Armed with nothing but muskets and a superiority complex, the Brits took over half the world. Own the gun that built an Empire.`,
        type: `Shotgun`,
        price: 21400,
        clip: 1,
        stats: {
            damage: 97,
            rate: 10,
            accuracy: 65,
            range: 85,
        },
        overall: 53.4,
    },
    navyrevolver: {
        hash: 0x917f6c8c,
        name: 'Navy Revolver',
        desc: `A true museum piece. You want to know how the West was won - slow reload speeds and a whole heap of bloodshed.`,
        type: `Handgun`,
        price: 55000,
        stats: {
            damage: 70,
            rate: 25,
            accuracy: 60,
            range: 35,
        },
        overall: 40,
    },
    nightstick: {
        hash: 0x678b81b1,
        name: 'Nightstick',
        desc: `24" polycarbonate side-handled nightstick.`,
        type: `Melee`,
        price: 400,
        stats: {
            damage: 10,
            rate: 15,
            range: 1
        },
        overall: 8.67,
    },
    parachute: {
        hash: 0xfbab5776,
        name: 'Parachute',
        desc: `Suicidal tendencies interrupted by parachuttal tendencies.`,
        type: `Utility`,
        price: 250,
    },
    jerrycan: {
        hash: 0x34a67b97,
        name: 'Jerry Can',
        desc: `Leaves a trail of gasoline that can be ignited.`,
        type: `Thrown`,
        price: 100,
        clip: 100,
        stats: {
            damage: 0,
            rate: 10,
            accuracy: 30,
            range: 1,
        },
        overall: 24.2,
    },
    pipebomb: {
        hash: 0xba45e8b8,
        name: 'Pipebomb',
        desc: `Remember, it doesn't count as an IED when you buy it in a store and use it in a first world country.`,
        type: `Heavy Weapon`,
        price: 50000,
        clip: 10,
        stats: {
            damage: 85,
            rate: 10,
            accuracy: 35,
            range: 15,
        },
        overall: 36.25,
    },
    pipewrench: {
        hash: 0x19044ee0,
        name: 'Pipe Wrench',
        desc: `Perennial favourite of apocalyptic survivalists and violent fathers the world over, apparently it also doubles as some kind of tool.`,
        type: `Melee`,
        price: 7150,
        stats: {
            damage: 10,
            rate: 15,
            range: 0,
        },
        overall: 8.33,
    },
    pistol: {
        hash: 0x1b06d571,
        name: 'Pistol',
        desc: `Standard handgun. A .45 caliber combat pistol with a magazine capacity of 12 rounds that can be extended to 16.`,
        type: `Handgun`,
        price: 2500,
        clip: 12,
        stats: {
            damage: 26,
            rate: 40,
            accuracy: 40,
            range: 25,
        },
        overall: 28.2,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_PISTOL_CLIP_01",
                hash: 0xFED0FD71,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_PISTOL_CLIP_02",
                hash: 0xED265A1C,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_PI_FLSH",
                hash: 0x359B7AAE,
                type: WeaponComponentType.flashlight
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_PI_SUPP_02",
                hash: 0x65EA7EBB,
                type: WeaponComponentType.muzzle
            },
            yusufamirluxuryfinish: {
                name: "Yusuf Amir Luxury Finish",
                hash_key: "COMPONENT_PISTOL_VARMOD_LUXE",
                hash: 0xD7391086,
                type: WeaponComponentType.finish
            },
        }
    },
    pistol50: {
        hash: 0x99aeeb3b,
        name: `Pistol .50`,
        desc: `High-impact pistol that delivers immense power but with extremely strong recoil. Holds 9 rounds in magazine.`,
        type: `Handgun`,
        price: 3900,
        clip: 9,
        stats: {
            damage: 51,
            rate: 40,
            accuracy: 55,
            range: 35,
        },
        overall: 37.8,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_PISTOL50_CLIP_01",
                hash: 0x2297BE19,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_PISTOL50_CLIP_02",
                hash: 0xD9D3AC92,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_PI_FLSH",
                hash: 0x359B7AAE,
                type: WeaponComponentType.flashlight
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP_02",
                hash: 0xA73D4664,
                type: WeaponComponentType.muzzle
            },
            platinumpearldeluxefinish: {
                name: "Platinum Pearl Deluxe Finish",
                hash_key: "COMPONENT_PISTOL50_VARMOD_LUXE",
                hash: 0x77B8AB2F,
                type: WeaponComponentType.finish
            },
        }
    },
    pistolmk2: {
        hash: 0xbfe256d4,
        name: 'Pistol MK II',
        desc: `Balance, simplicity, precision: nothing keeps the peace like an extended barrel in the other guy's mouth.`,
        type: `Handgun`,
        price: 73750,
        clip: 12,
        stats: {
            damage: 38,
            rate: 40,
            accuracy: 40,
            range: 25,
        },
        overall: 30.6,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_PISTOL_MK2_CLIP_01",
                hash: 0x94F42D62,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_PISTOL_MK2_CLIP_02",
                hash: 0x5ED6C128,
                type: WeaponComponentType.magazine
            },
            tracerrounds: {
                name: "Tracer Rounds",
                hash_key: "COMPONENT_PISTOL_MK2_CLIP_TRACER",
                hash: 0x25CAAEAF,
                type: WeaponComponentType.magazine
            },
            incendaryrounds: {
                name: "Incendiary Rounds",
                hash_key: "COMPONENT_PISTOL_MK2_CLIP_INCENDIARY",
                hash: 0x2BBD7A3A,
                type: WeaponComponentType.magazine
            },
            hollowpointrounds: {
                name: "Hollow Point Rounds",
                hash_key: "COMPONENT_PISTOL_MK2_CLIP_HOLLOWPOINT",
                hash: 0x85FEA109,
                type: WeaponComponentType.magazine
            },
            fullmetaljacketrounds: {
                name: "Full Metal Jacket Rounds",
                hash_key: "COMPONENT_PISTOL_MK2_CLIP_FMJ",
                hash: 0x4F37DF2A,
                type: WeaponComponentType.magazine
            },
            mountedscope: {
                name: "Mounted Scope",
                hash_key: "COMPONENT_AT_PI_RAIL",
                hash: 0x8ED4BB70,
                type: WeaponComponentType.scope
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_PI_FLSH_02",
                hash: 0x43FD595B,
                type: WeaponComponentType.flashlight
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_PI_SUPP_02",
                hash: 0x65EA7EBB,
                type: WeaponComponentType.muzzle
            },
            compensator: {
                name: "Compensator",
                hash_key: "COMPONENT_AT_PI_COMP",
                hash: 0x21E34793,
                type: WeaponComponentType.muzzle
            },
            digitalcamo: {
                name: "Digital Camo",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO",
                hash: 0x5C6C749C,
                type: WeaponComponentType.mk2paint
            },
            brushstrokecamo: {
                name: "Brushstroke Camo",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_02",
                hash: 0x15F7A390,
                type: WeaponComponentType.mk2paint
            },
            woodlandcamo: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_03",
                hash: 0x968E24DB,
                type: WeaponComponentType.mk2paint
            },
            skull: {
                name: "Skull",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_04",
                hash: 0x17BFA99,
                type: WeaponComponentType.mk2paint
            },
            sessantanove: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_05",
                hash: 0xF2685C72,
                type: WeaponComponentType.mk2paint
            },
            perseus: {
                name: "Perseus",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_06",
                hash: 0xDD2231E6,
                type: WeaponComponentType.mk2paint
            },
            leopard: {
                name: "Leopard",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_07",
                hash: 0xBB43EE76,
                type: WeaponComponentType.mk2paint
            },
            zebra: {
                name: "Zebra",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_08",
                hash: 0x4D901310,
                type: WeaponComponentType.mk2paint
            },
            geometric: {
                name: "Geometric",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_09",
                hash: 0x5F31B653,
                type: WeaponComponentType.mk2paint
            },
            boom: {
                name: "Boom!",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_10",
                hash: 0x697E19A0,
                type: WeaponComponentType.mk2paint
            },
            patriotic: {
                name: "Patriotic",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_IND_01",
                hash: 0x930CB951,
                type: WeaponComponentType.mk2paint
            },
            digitalcamoslide: {
                name: "Digital Camo",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_SLIDE",
                hash: 0xB4FC92B0,
                type: WeaponComponentType.mk2finish
            },
            brushstrokecamoslide: {
                name: "Brushtroke Camo",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_02_SLIDE",
                hash: 0x1A1F1260,
                type: WeaponComponentType.mk2finish
            },
            woodlandcamoslide: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_03_SLIDE",
                hash: 0xE4E00B70,
                type: WeaponComponentType.mk2finish
            },
            skullslide: {
                name: "Skull",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_04_SLIDE",
                hash: 0x2C298B2B,
                type: WeaponComponentType.mk2finish
            },
            sessantanoveslide: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_05_SLIDE",
                hash: 0xDFB79725,
                type: WeaponComponentType.mk2finish
            },
            perseusslide: {
                name: "Perseus",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_06_SLIDE",
                hash: 0x6BD7228C,
                type: WeaponComponentType.mk2finish
            },
            leopardslide: {
                name: "Leopard",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_07_SLIDE",
                hash: 0x9DDBCF8C,
                type: WeaponComponentType.mk2finish
            },
            zebraslide: {
                name: "Zebra",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_08_SLIDE",
                hash: 0xB319A52C,
                type: WeaponComponentType.mk2finish
            },
            geometricslide: {
                name: "Geometric",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_09_SLIDE",
                hash: 0xC6836E12,
                type: WeaponComponentType.mk2finish
            },
            boomslide: {
                name: "Boom!",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_10_SLIDE",
                hash: 0x43B1B173,
                type: WeaponComponentType.mk2finish
            },
            patrioticslide: {
                name: "Patriotic",
                hash_key: "COMPONENT_PISTOL_MK2_CAMO_IND_01_SLIDE",
                hash: 0x4ABDA3FA,
                type: WeaponComponentType.mk2finish
            },
        }
    },
    poolcue: {
        hash: 0x94117305,
        name: `Pool Cue`,
        desc: `Ah, there's no sound as satisfying as the crack of a perfect break, especially when it's the other guy's spine.`,
        type: `Melee`,
        price: 6250,
        stats: {
            damage: 20,
            rate: 10,
            range: 0,
        },
        overall: 10,
    },
    proxmine: {
        hash: 0xab564b93,
        name: `Proximity Mine`,
        desc: `Leave a present for your friends with these motion sensor landmines. Short delay after activation.`,
        type: `Heavy Weapon`,
        price: 1000,
        clip: 5,
        stats: {
            damage: 90,
            rate: 10,
            accuracy: 30,
            range: 20,
        },
        overall: 37.5,
    },
    pumpshotgun: {
        hash: 0x1d073a89,
        name: `Pump Shotgun`,
        desc: `Standard shotgun ideal for short-range combat. A high-projectile spread makes up for its lower accuracy at long range.`,
        type: `Shotgun`,
        price: 3500,
        clip: 8,
        stats: {
            damage: 67,
            rate: 20,
            accuracy: 30,
            range: 20,
        },
        overall: 29.4,
        components: {
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_SR_SUPP",
                hash: 0xE608B35E,
                type: WeaponComponentType.muzzle
            },
            yusufamirluxuryfinish: {
                name: "Yusuf Amir Luxury Finish",
                hash_key: "COMPONENT_PUMPSHOTGUN_VARMOD_LOWRIDER",
                hash: 0xA2D79DDB,
                type: WeaponComponentType.finish
            },
        }
    },
    pumpshotgunmk2: {
        hash: 0x555af99a,
        name: `Pump Shotgun MK II`,
        desc: `Only one thing pumps more action than a pump action: watch out, the recoil is almost as deadly as the shot.`,
        type: `Shotgun`,
        price: 82500,
        clip: 8,
        stats: {
            damage: 67,
            rate: 20,
            accuracy: 30,
            range: 20,
        },
        overall: 29.4,
        components: {
            defaultshells: {
                name: "Default Shells",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CLIP_01",
                hash: 0xCD940141,
                type: WeaponComponentType.magazine
            },
            dragonsbreathshells: {
                name: "Dragon's Breath Shells",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CLIP_INCENDIARY",
                hash: 0x9F8A1BF5,
                type: WeaponComponentType.magazine
            },
            steelbuckshotshells: {
                name: "Steel Buckshot Shells",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CLIP_ARMORPIERCING",
                hash: 0x4E65B425,
                type: WeaponComponentType.magazine
            },
            flechetteshells: {
                name: "Flechette Shells",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CLIP_HOLLOWPOINT",
                hash: 0xE9582927,
                type: WeaponComponentType.magazine
            },
            explosiveslugs: {
                name: "Explosive Slugs",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CLIP_EXPLOSIVE",
                hash: 0x3BE4465D,
                type: WeaponComponentType.magazine
            },
            holographicsight: {
                name: "Holographic Sight",
                hash_key: "COMPONENT_AT_SIGHTS",
                hash: 0x420FD713,
                type: WeaponComponentType.scope
            },
            smallscope: {
                name: "Small Scope",
                hash_key: "COMPONENT_AT_SCOPE_MACRO_MK2",
                hash: 0x49B2945,
                type: WeaponComponentType.scope
            },
            mediumscope: {
                name: "Medium Scope",
                hash_key: "COMPONENT_AT_SCOPE_SMALL_MK2",
                hash: 0x3F3C8181,
                type: WeaponComponentType.scope
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_SR_SUPP_03",
                hash: 0xAC42DF71,
                type: WeaponComponentType.muzzle
            },
            squaredmuzzlebrake: {
                name: "Squared Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_08",
                hash: 0x5F7DCE4D,
                type: WeaponComponentType.muzzle
            },
            digitalcamo: {
                name: "Digital Camo",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CAMO",
                hash: 0xE3BD9E44,
                type: WeaponComponentType.mk2finish
            },
            brushstrokecamo: {
                name: "Brushstroke Camo",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CAMO_02",
                hash: 0x17148F9B,
                type: WeaponComponentType.mk2finish
            },
            woodlandcamo: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CAMO_03",
                hash: 0x24D22B16,
                type: WeaponComponentType.mk2finish
            },
            skull: {
                name: "Skull",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CAMO_04",
                hash: 0xF2BEC6F0,
                type: WeaponComponentType.mk2finish
            },
            sessantanove: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CAMO_05",
                hash: 0x85627D,
                type: WeaponComponentType.mk2finish
            },
            perseus: {
                name: "Perseus",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CAMO_06",
                hash: 0xDC2919C5,
                type: WeaponComponentType.mk2finish
            },
            leopard: {
                name: "Leopard",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CAMO_07",
                hash: 0xE184247B,
                type: WeaponComponentType.mk2finish
            },
            zebra: {
                name: "Zebra",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CAMO_08",
                hash: 0xD8EF9356,
                type: WeaponComponentType.mk2finish
            },
            geometric: {
                name: "Geometric",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CAMO_09",
                hash: 0xEF29BFCA,
                type: WeaponComponentType.mk2finish
            },
            boom: {
                name: "Boom!",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CAMO_10",
                hash: 0x67AEB165,
                type: WeaponComponentType.mk2finish
            },
            patriotic: {
                name: "Patriotic",
                hash_key: "COMPONENT_PUMPSHOTGUN_MK2_CAMO_IND_01",
                hash: 0x46411A1D,
                type: WeaponComponentType.mk2finish
            },
        }
    },
    railgun: {
        hash: 0x6d544c99,
        name: 'Railgun',
        desc: `Fully-automatic, battery-powered gun, perfect for those looking for a more unusual yet highly-lethal weapon.`,
        type: `Heavy Weapon`,
        price: 250000,
        clip: 20,
        stats: {
            damage: 90,
            rate: 25,
            accuracy: 20,
            range: 70,
        },
        overall: 44,
    },
    raycarbine: {
        hash: 0x476bf155,
        name: 'Unholy Hellbringer',
        desc: `Republican Space Ranger Special. If you want to turn a little green man into little green goo, this is the only American way to do it.`,
        type: `Machine Gun`,
        price: 449000,
        clip: 9999,
        stats: {
            damage: 55,
            rate: 65,
            accuracy: 45,
            range: 60,
        },
        overall: 59,
    },
    rayminigun: {
        hash: 0xb62d1f67,
        name: 'Widowmaker',
        desc: `A futuristic Minigun. Republican Space Ranger Special. GO AHEAD, SAY I'M COMPENSATING FOR SOMETHING. I DARE YOU.`,
        type: `Heavy Weapon`,
        price: 449000,
        clip: 9999,
        stats: {
            damage: 30,
            rate: 100,
            accuracy: 40,
            range: 55,
        },
        overall: 63,
    },
    raypistol: {
        hash: 0xaf3696a1,
        name: `Up-n-Atomizer`,
        desc: `A futuristic alien pistol, also known as Raygun. Republican Space Ranger Special, fresh from the galactic war on socialism: no ammo, no mag, just one brutal energy pulse after another.`,
        type: `Handgun`,
        price: 399000,
        clip: 9999,
        stats: {
            damage: 80,
            rate: 10,
            accuracy: 10,
            range: 50,
        },
        overall: 32,
        components: {
            festivetint: {
                name: "Festive tint",
                hash_key: "COMPONENT_RAYPISTOL_VARMOD_XMAS18",
                hash: 0xD7DBF707,
                type: WeaponComponentType.finish
            },
        }
    },
    revolver: {
        hash: 0xc1b3c3d1,
        name: 'Heavy Revolver',
        desc: `A handgun with enough stopping power to drop a crazed rhino, and heavy enough to beat it to death if you're out of ammo.`,
        type: `Handgun`,
        price: 5900,
        clip: 6,
        stats: {
            damage: 70,
            rate: 20,
            accuracy: 65,
            range: 35,
        },
        overall: 39.2,
        components: {
            vipvariant: {
                name: "VIP Variant",
                hash_key: "COMPONENT_REVOLVER_VARMOD_BOSS",
                hash: 0x16EE3040,
                type: WeaponComponentType.finish
            },
            bodyguardvariant: {
                name: "Bodyguard Variant",
                hash_key: "COMPONENT_REVOLVER_VARMOD_GOON",
                hash: 0x9493B80D,
                type: WeaponComponentType.finish
            },
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_REVOLVER_CLIP_01",
                hash: 0xE9867CE3,
                type: WeaponComponentType.magazine
            },
        }
    },
    revolvermk2: {
        hash: 0xcb96392f,
        name: 'Heavy Revolver MK II',
        desc: `A handgun with enough stopping power to drop a crazed rhino, and heavy enough to beat it to death if you're out of ammo.`,
        type: `Handgun`,
        price: 99000,
        clip: 6,
        stats: {
            damage: 75,
            rate: 30,
            accuracy: 65,
            range: 35,
        },
        overall: 42.2,
        components: {
            defaultrounds: {
                name: "Default Rounds",
                hash_key: "COMPONENT_REVOLVER_MK2_CLIP_01",
                hash: 0xBA23D8BE,
                type: WeaponComponentType.magazine
            },
            tracerrounds: {
                name: "Tracer Rounds",
                hash_key: "COMPONENT_REVOLVER_MK2_CLIP_TRACER",
                hash: 0xC6D8E476,
                type: WeaponComponentType.magazine
            },
            incendiaryrounds: {
                name: "Incendiary Rounds",
                hash_key: "COMPONENT_REVOLVER_MK2_CLIP_INCENDIARY",
                hash: 0xEFBF25,
                type: WeaponComponentType.magazine
            },
            hollowpointrounds: {
                name: "Hollow Point Rounds",
                hash_key: "COMPONENT_REVOLVER_MK2_CLIP_HOLLOWPOINT",
                hash: 0x10F42E8F,
                type: WeaponComponentType.magazine
            },
            fullmetaljacketrounds: {
                name: "Full Metal Jacket Rounds",
                hash_key: "COMPONENT_REVOLVER_MK2_CLIP_FMJ",
                hash: 0xDC8BA3F,
                type: WeaponComponentType.magazine
            },
            holographicsight: {
                name: "Holographic Sight",
                hash_key: "COMPONENT_AT_SIGHTS",
                hash: 0x420FD713,
                type: WeaponComponentType.scope
            },
            smallscope: {
                name: "Small Scope",
                hash_key: "COMPONENT_AT_SCOPE_MACRO_MK2",
                hash: 0x49B2945,
                type: WeaponComponentType.scope
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_PI_FLSH",
                hash: 0x359B7AAE,
                type: WeaponComponentType.flashlight
            },
            compensator: {
                name: "Compensator",
                hash_key: "COMPONENT_AT_PI_COMP_03",
                hash: 0x27077CCB,
                type: WeaponComponentType.muzzle
            },
            digitalcamo: {
                name: "Digital Camo",
                hash_key: "COMPONENT_REVOLVER_MK2_CAMO",
                hash: 0xC03FED9F,
                type: WeaponComponentType.mk2paint
            },
            brushstrokecamo: {
                name: "Brushstroke Camo",
                hash_key: "COMPONENT_REVOLVER_MK2_CAMO_02",
                hash: 0xB5DE24,
                type: WeaponComponentType.mk2paint
            },
            woodlandcamo: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_REVOLVER_MK2_CAMO_03",
                hash: 0xA7FF1B8,
                type: WeaponComponentType.mk2paint
            },
            skull: {
                name: "Skull",
                hash_key: "COMPONENT_REVOLVER_MK2_CAMO_04",
                hash: 0xF2E24289,
                type: WeaponComponentType.mk2paint
            },
            sessantanove: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_REVOLVER_MK2_CAMO_05",
                hash: 0x11317F27,
                type: WeaponComponentType.mk2paint
            },
            perseus: {
                name: "Perseus",
                hash_key: "COMPONENT_REVOLVER_MK2_CAMO_06",
                hash: 0x17C30C42,
                type: WeaponComponentType.mk2paint
            },
            leopard: {
                name: "Leopard",
                hash_key: "COMPONENT_REVOLVER_MK2_CAMO_07",
                hash: 0x257927AE,
                type: WeaponComponentType.mk2paint
            },
            zebra: {
                name: "Zebra",
                hash_key: "COMPONENT_REVOLVER_MK2_CAMO_08",
                hash: 0x37304B1C,
                type: WeaponComponentType.mk2paint
            },
            geometric: {
                name: "Geometric",
                hash_key: "COMPONENT_REVOLVER_MK2_CAMO_09",
                hash: 0x48DAEE71,
                type: WeaponComponentType.mk2paint
            },
            boom: {
                name: "Boom!",
                hash_key: "COMPONENT_REVOLVER_MK2_CAMO_10",
                hash: 0x20ED9B5B,
                type: WeaponComponentType.mk2paint
            },
            patriotic: {
                name: "Patriotic",
                hash_key: "COMPONENT_REVOLVER_MK2_CAMO_IND_01",
                hash: 0xD951E867,
                type: WeaponComponentType.mk2paint
            },
        }
    },
    rpg: {
        hash: 0xb1ca77b1,
        name: 'RPG',
        desc: `A portable, shoulder-launched, anti-tank weapon that fires explosive warheads. Very effective for taking down vehicles or large groups of assailants.`,
        type: `Heavy Weapon`,
        price: 26250,
        clip: 1,
        stats: {
            damage: 100,
            rate: 5,
            accuracy: 10,
            range: 70,
        },
        overall: 39,
    },
    sawnoffshotgun: {
        hash: 0x7846a318,
        name: 'Sawed-Off Shotgun',
        desc: `This single-barrel, sawed-off shotgun compensates for its low range and ammo capacity with devastating efficiency in close combat.`,
        type: `Shotgun`,
        price: 30000,
        clip: 8,
        stats: {
            damage: 96,
            rate: 20,
            accuracy: 20,
            range: 15,
        },
        overall: 32.2,
        components: {
            gildedgunmetalfinish: {
                name: "Gilded Gun Metal Finish",
                hash_key: "COMPONENT_SAWNOFFSHOTGUN_VARMOD_LUXE",
                hash: 0x85A64DF9,
                type: WeaponComponentType.finish
            },
        }
    },
    smg: {
        hash: 0x2be6766b,
        name: `SMG`,
        desc: `This is known as a good all-around submachine gun. Lightweight with an accurate sight and 30-round magazine capacity.`,
        type: `Machine Gun`,
        price: 7500,
        clip: 30,
        stats: {
            damage: 22,
            rate: 55,
            accuracy: 40,
            range: 35,
        },
        overall: 38.4,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_SMG_CLIP_01",
                hash: 0x26574997,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_SMG_CLIP_02",
                hash: 0x350966FB,
                type: WeaponComponentType.magazine
            },
            drummagazine: {
                name: "Drum Magazine",
                hash_key: "COMPONENT_SMG_CLIP_03",
                hash: 0x79C77076,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_MACRO_02",
                hash: 0x3CC6BA57,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_PI_SUPP",
                hash: 0xC304849A,
                type: WeaponComponentType.muzzle
            },
            yusufamirluxuryfinish: {
                name: "Yusuf Amir Luxury Finish",
                hash_key: "COMPONENT_SMG_VARMOD_LUXE",
                hash: 0x27872C90,
                type: WeaponComponentType.finish
            },
        }
    },
    smgmk2: {
        hash: 0x78a97cd0,
        name: `SMG MK II`,
        desc: `Lightweight, compact, with a rate of fire to die very messily for: turn any confined space into a kill box at the click of a well-oiled trigger.`,
        type: `Machine Gun`,
        price: 85500,
        clip: 30,
        stats: {
            damage: 22,
            rate: 55,
            accuracy: 40,
            range: 35,
        },
        overall: 38.4,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_SMG_MK2_CLIP_01",
                hash: 0x4C24806E,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_SMG_MK2_CLIP_02",
                hash: 0xB9835B2E,
                type: WeaponComponentType.magazine
            },
            tracerrounds: {
                name: "Tracer Rounds",
                hash_key: "COMPONENT_SMG_MK2_CLIP_TRACER",
                hash: 0x7FEA36EC,
                type: WeaponComponentType.magazine
            },
            incendiaryrounds: {
                name: "Incendiary Rounds",
                hash_key: "COMPONENT_SMG_MK2_CLIP_INCENDIARY",
                hash: 0xD99222E5,
                type: WeaponComponentType.magazine
            },
            hollowpointrounds: {
                name: "Hollow Point Rounds",
                hash_key: "COMPONENT_SMG_MK2_CLIP_HOLLOWPOINT",
                hash: 0x3A1BD6FA,
                type: WeaponComponentType.magazine
            },
            fullmetaljacketrounds: {
                name: "Full Metal Jacket Rounds",
                hash_key: "COMPONENT_SMG_MK2_CLIP_FMJ",
                hash: 0xB5A715F,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            holographicsight: {
                name: "Holographic Sight",
                hash_key: "COMPONENT_AT_SIGHTS_SMG",
                hash: 0x9FDB5652,
                type: WeaponComponentType.scope
            },
            smallscope: {
                name: "Small Scope",
                hash_key: "COMPONENT_AT_SCOPE_MACRO_02_SMG_MK2",
                hash: 0xE502AB6B,
                type: WeaponComponentType.scope
            },
            mediumscope: {
                name: "Medium Scope",
                hash_key: "COMPONENT_AT_SCOPE_SMALL_SMG_MK2",
                hash: 0x3DECC7DA,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_PI_SUPP",
                hash: 0xC304849A,
                type: WeaponComponentType.muzzle
            },
            flatmuzzlebrake: {
                name: "Flat Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_01",
                hash: 0xB99402D4,
                type: WeaponComponentType.muzzle
            },
            tacticalmuzzlebrake: {
                name: "Tactical Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_02",
                hash: 0xC867A07B,
                type: WeaponComponentType.muzzle
            },
            flatendmuzzlebrake: {
                name: "Fat-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_03",
                hash: 0xDE11CBCF,
                type: WeaponComponentType.muzzle
            },
            precisionmuzzlebrake: {
                name: "Precision Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_04",
                hash: 0xEC9068CC,
                type: WeaponComponentType.muzzle
            },
            heavydutymuzzlebrake: {
                name: "Heavy Duty Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_05",
                hash: 0x2E7957A,
                type: WeaponComponentType.muzzle
            },
            slantedmuzzlebrake: {
                name: "Slanted Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_06",
                hash: 0x347EF8AC,
                type: WeaponComponentType.muzzle
            },
            splitendmuzzlebrake: {
                name: "Split-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_07",
                hash: 0x4DB62ABE,
                type: WeaponComponentType.muzzle
            },
            defaultbarrel: {
                name: "Default Barrel",
                hash_key: "COMPONENT_AT_SB_BARREL_01",
                hash: 0xD9103EE1,
                type: WeaponComponentType.barrel
            },
            heavybarrel: {
                name: "Heavy Barrel",
                hash_key: "COMPONENT_AT_SB_BARREL_02",
                hash: 0xA564D78B,
                type: WeaponComponentType.barrel
            },
            digitalcamo: {
                name: "Digital Camo",
                hash_key: "COMPONENT_SMG_MK2_CAMO",
                hash: 0xC4979067,
                type: WeaponComponentType.mk2paint
            },
            brushstrokecamo: {
                name: "Brushstroke Camo",
                hash_key: "COMPONENT_SMG_MK2_CAMO_02",
                hash: 0x3815A945,
                type: WeaponComponentType.mk2paint
            },
            woodlandcamo: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_SMG_MK2_CAMO_03",
                hash: 0x4B4B4FB0,
                type: WeaponComponentType.mk2paint
            },
            skull: {
                name: "Skull",
                hash_key: "COMPONENT_SMG_MK2_CAMO_04",
                hash: 0xEC729200,
                type: WeaponComponentType.mk2paint
            },
            sessantanove: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_SMG_MK2_CAMO_05",
                hash: 0x48F64B22,
                type: WeaponComponentType.mk2paint
            },
            perseus: {
                name: "Perseus",
                hash_key: "COMPONENT_SMG_MK2_CAMO_06",
                hash: 0x35992468,
                type: WeaponComponentType.mk2paint
            },
            leopard: {
                name: "Leopard",
                hash_key: "COMPONENT_SMG_MK2_CAMO_07",
                hash: 0x24B782A5,
                type: WeaponComponentType.mk2paint
            },
            zebra: {
                name: "Zebra",
                hash_key: "COMPONENT_SMG_MK2_CAMO_08",
                hash: 0xA2E67F01,
                type: WeaponComponentType.mk2paint
            },
            geometric: {
                name: "Geometric",
                hash_key: "COMPONENT_SMG_MK2_CAMO_09",
                hash: 0x2218FD68,
                type: WeaponComponentType.mk2paint
            },
            boom: {
                name: "Boom!",
                hash_key: "COMPONENT_SMG_MK2_CAMO_10",
                hash: 0x45C5C3C5,
                type: WeaponComponentType.mk2paint
            },
            patriotc: {
                name: "Patriotic",
                hash_key: "COMPONENT_SMG_MK2_CAMO_IND_01",
                hash: 0x399D558F,
                type: WeaponComponentType.mk2paint
            },
        }
    },
    smokegrenade: {
        hash: 0xfdbc8a50,
        name: 'Smoke Grenade',
        desc: `Smoookiinnnn...`,
        type: `Thrown`,
        price: 800
    },
    sniperrifle: {
        hash: 0x5fc3c11,
        name: `Sniper Rifle`,
        desc: `Standard sniper rifle. Ideal for situations that require accuracy at long range. Limitations include slow reload speed and very low rate of fire.`,
        type: `Sniper Rifle`,
        price: 20000,
        clip: 10,
        stats: {
            damage: 96,
            rate: 25,
            accuracy: 70,
            range: 95,
        },
        overall: 59.2,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_SNIPERRIFLE_CLIP_01",
                hash: 0x9BC64089,
                type: WeaponComponentType.magazine
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP_02",
                hash: 0xA73D4664,
                type: WeaponComponentType.muzzle
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_LARGE",
                hash: 0xD2443DDC,
                type: WeaponComponentType.scope
            },
            advancedscope: {
                name: "Advanced Scope",
                hash_key: "COMPONENT_AT_SCOPE_MAX",
                hash: 0xBC54DA77,
                type: WeaponComponentType.scope
            },
            etchedwoodgripfinish: {
                name: "Etched Wood Grip Finish",
                hash_key: "COMPONENT_SNIPERRIFLE_VARMOD_LUXE",
                hash: 0x4032B5E7,
                type: WeaponComponentType.finish
            },
        }
    },
    snowball: {
        hash: 0x787f0bb,
        name: 'Snowball',
        desc: `Be on the lookout and ready to round up your Crew for a friendly snowball fight, but be forewarned, those icy little suckers can pack a wallop`,
        type: `Thrown`,
        price: 5,
        clip: 9,
        stats: {
            damage: 1,
            rate: 10,
            accuracy: 10,
            range: 0,
        },
        overall: 5.25,
    },
    snspistol: {
        hash: 0xbfd21232,
        name: `SNS Pistol`,
        desc: `Like condoms or hairspray, this fits in your pocket for a night on the town. The price of a bottle at a club, it's half as accurate as a champagne cork, and twice as deadly.`,
        type: `Handgun`,
        price: 2750,
        clip: 6,
        stats: {
            damage: 30,
            rate: 40,
            accuracy: 40,
            range: 20,
        },
        overall: 26.6,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_SNSPISTOL_CLIP_01",
                hash: 0xF8802ED9,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_SNSPISTOL_CLIP_02",
                hash: 0x7B0033B3,
                type: WeaponComponentType.magazine
            },
            etchedwoodgripfinish: {
                name: "Etched Wood Grip Finish",
                hash_key: "COMPONENT_SNSPISTOL_VARMOD_LOWRIDER",
                hash: 0x8033ECAF,
                type: WeaponComponentType.finish
            },
        }
    },
    snspistolmk2: {
        hash: 0x88374054,
        name: `SNS Pistol MK II`,
        desc: `The ultimate purse-filler: if you want to make Saturday Night really special, this is your ticket.`,
        type: `Handgun`,
        price: 79575,
        clip: 6,
        stats: {
            damage: 30,
            rate: 40,
            accuracy: 40,
            range: 20,
        },
        overall: 26.6,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CLIP_01",
                hash: 0x1466CE6,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CLIP_02",
                hash: 0xCE8C0772,
                type: WeaponComponentType.magazine
            },
            tracerrounds: {
                name: "Tracer Rounds",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CLIP_TRACER",
                hash: 0x902DA26E,
                type: WeaponComponentType.magazine
            },
            incendiaryrounds: {
                name: "Incendiary Rounds",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CLIP_INCENDIARY",
                hash: 0xE6AD5F79,
                type: WeaponComponentType.magazine
            },
            hollowpointrounds: {
                name: "Hollow Point Rounds",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CLIP_HOLLOWPOINT",
                hash: 0x8D107402,
                type: WeaponComponentType.magazine
            },
            fullmetaljacketrounds: {
                name: "Full Metal Jacket Rounds",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CLIP_FMJ",
                hash: 0xC111EB26,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_PI_FLSH_03",
                hash: 0x4A4965F3,
                type: WeaponComponentType.flashlight
            },
            mountedscope: {
                name: "Mounted Scope",
                hash_key: "COMPONENT_AT_PI_RAIL_02",
                hash: 0x47DE9258,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_PI_SUPP_02",
                hash: 0x65EA7EBB,
                type: WeaponComponentType.muzzle
            },
            compensator: {
                name: "Compensator",
                hash_key: "COMPONENT_AT_PI_COMP_02",
                hash: 0xAA8283BF,
                type: WeaponComponentType.muzzle
            },
            digitalcamo: {
                name: "Digital Camo",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO",
                hash: 0xF7BEEDD,
                type: WeaponComponentType.mk2paint
            },
            brushstrokecamo: {
                name: "Brushstroke Camo",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_02",
                hash: 0x8A612EF6,
                type: WeaponComponentType.mk2paint
            },
            woodlandcamo: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_03",
                hash: 0x76FA8829,
                type: WeaponComponentType.mk2paint
            },
            skull: {
                name: "Skull",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_04",
                hash: 0xA93C6CAC,
                type: WeaponComponentType.mk2paint
            },
            sessantanove: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_05",
                hash: 0x9C905354,
                type: WeaponComponentType.mk2paint
            },
            perseus: {
                name: "Perseus",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_06",
                hash: 0x4DFA3621,
                type: WeaponComponentType.mk2paint
            },
            leopard: {
                name: "Leopard",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_07",
                hash: 0x42E91FFF,
                type: WeaponComponentType.mk2paint
            },
            zebra: {
                name: "Zebra",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_08",
                hash: 0x54A8437D,
                type: WeaponComponentType.mk2paint
            },
            geometric: {
                name: "Geometric",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_09",
                hash: 0x68C2746,
                type: WeaponComponentType.mk2paint
            },
            boom: {
                name: "Boom!",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_10",
                hash: 0x2366E467,
                type: WeaponComponentType.mk2paint
            },
            boom2: {
                name: "Boom!",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_IND_01",
                hash: 0x441882E6,
                type: WeaponComponentType.mk2finish
            },
            digitalcamoslide: {
                name: "Digital Camo",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_SLIDE",
                hash: 0xE7EE68EA,
                type: WeaponComponentType.mk2finish
            },
            brushstrokecamoslide: {
                name: "Brushstroke Camo",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_02_SLIDE",
                hash: 0x29366D21,
                type: WeaponComponentType.mk2finish
            },
            woodlandcamoslide: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_03_SLIDE",
                hash: 0x3ADE514B,
                type: WeaponComponentType.mk2finish
            },
            skullslide: {
                name: "Skull",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_04_SLIDE",
                hash: 0xE64513E9,
                type: WeaponComponentType.mk2finish
            },
            sessantanoveslide: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_05_SLIDE",
                hash: 0xCD7AEB9A,
                type: WeaponComponentType.mk2finish
            },
            perseusslide: {
                name: "Perseus",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_06_SLIDE",
                hash: 0xFA7B27A6,
                type: WeaponComponentType.mk2finish
            },
            leopardslide: {
                name: "Leopard",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_07_SLIDE",
                hash: 0xE285CA9A,
                type: WeaponComponentType.mk2finish
            },
            zebraslide: {
                name: "Zebra",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_08_SLIDE",
                hash: 0x2B904B19,
                type: WeaponComponentType.mk2finish
            },
            geometricslide: {
                name: "Geometric",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_09_SLIDE",
                hash: 0x22C24F9C,
                type: WeaponComponentType.mk2finish
            },
            boomslide: {
                name: "Boom!",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_10_SLIDE",
                hash: 0x8D0D5ECD,
                type: WeaponComponentType.mk2finish
            },
            patrioticslide: {
                name: "Patriotic",
                hash_key: "COMPONENT_SNSPISTOL_MK2_CAMO_IND_01_SLIDE",
                hash: 0x1F07150A,
                type: WeaponComponentType.mk2finish
            },
        }
    },
    specialcarbine: {
        hash: 0xc0a3098d,
        name: `Special Carbine`,
        desc: `Combining accuracy, maneuverability, firepower and low recoil, this is an extremely versatile assault rifle for any combat situation.`,
        type: `Assault Rifle`,
        price: 14750,
        clip: 30,
        stats: {
            damage: 34,
            rate: 65,
            accuracy: 55,
            range: 40,
        },
        overall: 46.8,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_SPECIALCARBINE_CLIP_01",
                hash: 0xC6C7E581,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_SPECIALCARBINE_CLIP_02",
                hash: 0x7C8BD10E,
                type: WeaponComponentType.magazine
            },
            drummagazine: {
                name: "Drum Magazine",
                hash_key: "COMPONENT_SPECIALCARBINE_CLIP_03",
                hash: 0x6B59AEAA,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            scope: {
                name: "Scope",
                hash_key: "COMPONENT_AT_SCOPE_MEDIUM",
                hash: 0xA0D89C42,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP_02",
                hash: 0xA73D4664,
                type: WeaponComponentType.muzzle
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP",
                hash: 0xC164F53,
                type: WeaponComponentType.grip
            },
            etchedgunmetalfinish: {
                name: "Etched Gun Metal Finish",
                hash_key: "COMPONENT_SPECIALCARBINE_VARMOD_LOWRIDER",
                hash: 0x730154F2,
                type: WeaponComponentType.finish
            },
        }
    },
    specialcarbinemk2: {
        hash: 0x969c3d67,
        name: `Special Carbine MK II`,
        desc: `The jack of all trades just got a serious upgrade: bow to the master.`,
        type: `Assault Rifle`,
        price: 135000,
        clip: 30,
        stats: {
            damage: 34,
            rate: 65,
            accuracy: 55,
            range: 40,
        },
        overall: 46.8,
        components: {
            defaultclip: {
                name: "Default Clip",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CLIP_01",
                hash: 0x16C69281,
                type: WeaponComponentType.magazine
            },
            extendedclip: {
                name: "Extended Clip",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CLIP_02",
                hash: 0xDE1FA12C,
                type: WeaponComponentType.magazine
            },
            tracerrounds: {
                name: "Tracer Rounds",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CLIP_TRACER",
                hash: 0x8765C68A,
                type: WeaponComponentType.magazine
            },
            incendiaryrounds: {
                name: "Incendiary Rounds",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CLIP_INCENDIARY",
                hash: 0xDE011286,
                type: WeaponComponentType.magazine
            },
            armorpiercingrounds: {
                name: "Armor Piercing Rounds",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CLIP_ARMORPIERCING",
                hash: 0x51351635,
                type: WeaponComponentType.magazine
            },
            fullmetaljacketrounds: {
                name: "Full Metal Jacket Rounds",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CLIP_FMJ",
                hash: 0x503DEA90,
                type: WeaponComponentType.magazine
            },
            flashlight: {
                name: "Flashlight",
                hash_key: "COMPONENT_AT_AR_FLSH",
                hash: 0x7BC4CDDC,
                type: WeaponComponentType.flashlight
            },
            holographicsight: {
                name: "Holographic Sight",
                hash_key: "COMPONENT_AT_SIGHTS",
                hash: 0x420FD713,
                type: WeaponComponentType.scope
            },
            smallscope: {
                name: "Small Scope",
                hash_key: "COMPONENT_AT_SCOPE_MACRO_MK2",
                hash: 0x49B2945,
                type: WeaponComponentType.scope
            },
            largescope: {
                name: "Large Scope",
                hash_key: "COMPONENT_AT_SCOPE_MEDIUM_MK2",
                hash: 0xC66B6542,
                type: WeaponComponentType.scope
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_AR_SUPP_02",
                hash: 0xA73D4664,
                type: WeaponComponentType.muzzle
            },
            flatmuzzlebrake: {
                name: "Flat Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_01",
                hash: 0xB99402D4,
                type: WeaponComponentType.muzzle
            },
            tacticalmuzzlebrake: {
                name: "Tactical Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_02",
                hash: 0xC867A07B,
                type: WeaponComponentType.muzzle
            },
            flatendmuzzlebrake: {
                name: "Fat-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_03",
                hash: 0xDE11CBCF,
                type: WeaponComponentType.muzzle
            },
            precisionmuzzlebrake: {
                name: "Precision Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_04",
                hash: 0xEC9068CC,
                type: WeaponComponentType.muzzle
            },
            heavydutymuzzlebrake: {
                name: "Heavy Duty Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_05",
                hash: 0x2E7957A,
                type: WeaponComponentType.muzzle
            },
            slantedmuzzlebrake: {
                name: "Slanted Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_06",
                hash: 0x347EF8AC,
                type: WeaponComponentType.muzzle
            },
            splitendmuzzlebrake: {
                name: "Split-End Muzzle Brake",
                hash_key: "COMPONENT_AT_MUZZLE_07",
                hash: 0x4DB62ABE,
                type: WeaponComponentType.muzzle
            },
            grip: {
                name: "Grip",
                hash_key: "COMPONENT_AT_AR_AFGRIP_02",
                hash: 0x9D65907A,
                type: WeaponComponentType.grip
            },
            defaultbarrel: {
                name: "Default Barrel",
                hash_key: "COMPONENT_AT_SC_BARREL_01",
                hash: 0xE73653A9,
                type: WeaponComponentType.barrel
            },
            heavybarrel: {
                name: "Heavy Barrel",
                hash_key: "COMPONENT_AT_SC_BARREL_02",
                hash: 0xF97F783B,
                type: WeaponComponentType.barrel
            },
            digitalcamo: {
                name: "Digital Camo",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CAMO",
                hash: 0xD40BB53B,
                type: WeaponComponentType.mk2finish
            },
            bruhstrokecamo: {
                name: "Brushstroke Camo",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CAMO_02",
                hash: 0x431B238B,
                type: WeaponComponentType.mk2finish
            },
            woodlandcamo: {
                name: "Woodland Camo",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CAMO_03",
                hash: 0x34CF86F4,
                type: WeaponComponentType.mk2finish
            },
            skull: {
                name: "Skull",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CAMO_04",
                hash: 0xB4C306DD,
                type: WeaponComponentType.mk2finish
            },
            sessanteanove: {
                name: "Sessanta Nove",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CAMO_05",
                hash: 0xEE677A25,
                type: WeaponComponentType.mk2finish
            },
            perseus: {
                name: "Perseus",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CAMO_06",
                hash: 0xDF90DC78,
                type: WeaponComponentType.mk2finish
            },
            leopard: {
                name: "Leopard",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CAMO_07",
                hash: 0xA4C31EE,
                type: WeaponComponentType.mk2finish
            },
            zebra: {
                name: "Zebra",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CAMO_08",
                hash: 0x89CFB0F7,
                type: WeaponComponentType.mk2finish
            },
            geometric: {
                name: "Geometric",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CAMO_09",
                hash: 0x7B82145C,
                type: WeaponComponentType.mk2finish
            },
            boom: {
                name: "Boom!",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CAMO_10",
                hash: 0x899CAF75,
                type: WeaponComponentType.mk2finish
            },
            patriotic: {
                name: "Patriotic",
                hash_key: "COMPONENT_SPECIALCARBINE_MK2_CAMO_IND_01",
                hash: 0x5218C819,
                type: WeaponComponentType.mk2finish
            },
        }
    },
    stickybomb: {
        hash: 0x2c3731d9,
        name: `Sticky Bomb`,
        desc: `A plastic explosive charge fitted with a remote detonator. Can be thrown and then detonated or attached to a vehicle then detonated.`,
        type: `Thrown`,
        price: 60000,
        clip: 25,
        stats: {
            damage: 95,
            rate: 10,
            accuracy: 30,
            range: 10
        },
        overall: 36.25,
    },
    stonehatchet: {
        hash: 0x3813fc08,
        name: 'Stone Hatchet',
        desc: `Stone cold killer.`,
        type: `Melee`,
        price: 25000,
        stats: {
            damage: 30,
            rate: 15,
            range: 0
        },
        overall: 15,
    },
    stungun: {
        hash: 0x3656c8c1,
        name: 'Stun Gun',
        desc: `Fires a projectile that administers a voltage capable of temporarily stunning an assailant. Takes approximately 4 seconds to recharge after firing.`,
        type: `Handgun`,
        price: 100,
        stats: {
            damage: 1,
            rate: 10,
            accuracy: 40,
            range: 5
        },
        overall: 31.2,
    },
    switchblade: {
        hash: 0xdfe37640,
        name: `Switch Blade`,
        desc: `From your pocket to hilt-deep in the other guy's ribs in under a second: folding knives will never go out of style.`,
        type: `Melee`,
        price: 1950,
        stats: {
            damage: 15,
            rate: 20,
            range: 0
        },
        overall: 11.67,
        components: {
            default: {
                name: "Default Handle",
                hash_key: "COMPONENT_SWITCHBLADE_VARMOD_BASE",
                hash: 0x9137A500,
                type: WeaponComponentType.finish
            },
            vip: {
                name: "VIP Variant",
                hash_key: "COMPONENT_SWITCHBLADE_VARMOD_VAR1",
                hash: 0x5B3E7DB6,
                type: WeaponComponentType.finish
            },
            bodyguard: {
                name: "Bodyguard Variant",
                hash_key: "COMPONENT_SWITCHBLADE_VARMOD_VAR2",
                hash: 0xE7939662,
                type: WeaponComponentType.finish
            },
        }
    },
    unarmed: {
        hash: 0xa2719263,
        name: 'unarmed',
    },
    vintagepistol: {
        hash: 0x83839c4,
        name: `Vintage Pistol`,
        desc: `What you really need is a more recognisable gun. Stand out from the crowd at an armed robbery with this engraved pistol.`,
        type: `Handgun`,
        price: 3450,
        stats: {
            damage: 35,
            rate: 40,
            accuracy: 40,
            range: 25
        },
        overall: 29.2,
        components: {
            default: {
                name: "Default Clip",
                hash_key: "COMPONENT_VINTAGEPISTOL_CLIP_01",
                hash: 0x45A3B6BB,
                type: WeaponComponentType.magazine
            },
            extended: {
                name: "Extended Clip",
                hash_key: "COMPONENT_VINTAGEPISTOL_CLIP_02",
                hash: 0x33BA12E8,
                type: WeaponComponentType.magazine
            },
            suppressor: {
                name: "Suppressor",
                hash_key: "COMPONENT_AT_PI_SUPP",
                hash: 0xC304849A,
                type: WeaponComponentType.muzzle
            },
        }
    },
};
/**
 * Get a weapon hash by its string name.
 * @export
 * @param {string} name
 * @return {*}  {(number | null)}
 */
export function getWeaponByName(name) {
    return WeaponList[name];
}
export function getWeaponName(weapon) {
    return weapon.name.replace(" ", "").toLowerCase().replace("II", "2");
}
export function getWeaponByHash(hash) {
    Object.keys(WeaponList).forEach(element => {
        console.log(JSON.stringify(element));
    });
}
export function getWeaponComponentByName(weapon, name) {
    return weapon.components[name];
}
/*
export function getWeaponComponentName(component: Object): String {
  return  component..replace(" ", "").toLowerCase().replace("II", "2");
}
*/ 
//# sourceMappingURL=weapons.js.map