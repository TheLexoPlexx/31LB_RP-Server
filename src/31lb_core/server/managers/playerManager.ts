/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import {
  database
} from './../startup';
import {
  ItemHolder,
  Item
} from "./../../client/interactions/inventory";
import tables from '../database/tables';

export function getPlayer(player: alt.Player, callback) {
  getPlayerByUUID(player.getSyncedMeta("uuid"), callback);
}

export function getPlayerByUUID(playerId, callback) {
  database.fetchData("uuid", playerId, tables.players, (result) => {
    if (callback != null) {
      callback(result);
    }
  });
}

export function setValueForPlayer(result, callback) {
  database.upsertData(result, tables.players, (r) => {
    if (callback != null) {
      callback(r);
    }
  });
}

export function setCloth(player: alt.Player, comp: number, item: ItemHolder, drawable: number, texture: number, dlcHash: string) {
  player.setSyncedMeta("inventory_" + comp, item);
  let palette = 2; //0 oder 1, ka.
  alt.emitClient(player, "a_setclothes", palette)
  //Noch nicht im release, nur dev: player.setClothes(comp, drawable, texture, palette, alt.hash(dlcHash));
}

/*

addXpForSkill (x, y)
getLevelForSkill (x)
getXpForSkill (x)

 */

/* === WEAPONS
 */

/**
 * 
 * @param {String} weaponName 
 * @param {Player} player 
 * @param {boolean} inventory 
 */
export function addWeapon(player, weaponName, inventory) {
  getPlayer(player, (result) => {
    var weapons = JSON.parse(result.weapons);

    var found = false;
    weapons.forEach(element => {
      if (element.w == weaponName) {
        element.a += 1;
        found = true;
      }
    });
    if (!found) {
      weapons.push({
        w: weaponName,
        i: inventory,
        c: [],
        a: 0
      });
    }

    result.weapons = JSON.stringify(weapons);
    setValueForPlayer(result, null);
  });
}

const spawnpositions = [{
    "px": -21.05666160583496,
    "py": -638.7738647460938,
    "pz": 35.28913497924805,
    "rx": 0.001075899344868958,
    "yx": 0.00048563486780039966,
    "zx": -1.9382637739181519
  },
  {
    "px": 728.8965454101562,
    "py": -589.1779174804688,
    "pz": 26.89499855041504,
    "rx": -0.04029086232185364,
    "yx": 0.027995802462100983,
    "zx": 0.1605008989572525
  },
  {
    "px": 740.513671875,
    "py": -835.6133422851562,
    "pz": 24.84783363342285,
    "rx": 0.03764992579817772,
    "yx": -0.02982323057949543,
    "zx": -0.4407113492488861
  },
  {
    "px": -412.3011779785156,
    "py": -598.5018920898438,
    "pz": 28.65338134765625,
    "rx": -0.047998830676078796,
    "yx": 0.0468510203063488,
    "zx": -0.2965157926082611
  },
  {
    "px": -20.254650115966797,
    "py": -217.4847869873047,
    "pz": 45.38410568237305,
    "rx": 0.007413841784000397,
    "yx": -0.000029708760848734528,
    "zx": -3.1208419799804688
  },
  {
    "px": -111.2129898071289,
    "py": -324.858642578125,
    "pz": 34.39604568481445,
    "rx": 0.0863700732588768,
    "yx": 0.014384613372385502,
    "zx": 2.7225959300994873
  },
  {
    "px": -359.0177917480469,
    "py": -424.1844787597656,
    "pz": 28.139732360839844,
    "rx": 0.1506253033876419,
    "yx": 0.017607996240258217,
    "zx": -0.08068025857210159
  },
  {
    "px": 43.784305572509766,
    "py": -391.2147521972656,
    "pz": 39.128990173339844,
    "rx": 0.003921830095350742,
    "yx": -0.0005713315913453698,
    "zx": 0.16538691520690918
  },
  {
    "px": 19.48415756225586,
    "py": -457.1929931640625,
    "pz": 39.130584716796875,
    "rx": 0.0031707335729151964,
    "yx": -0.00015241112851072103,
    "zx": 1.6916378736495972
  },
  {
    "px": 56.24824905395508,
    "py": -369.1797180175781,
    "pz": 39.128746032714844,
    "rx": 0.003831049893051386,
    "yx": -0.00011607736814767122,
    "zx": -2.620272159576416
  },
  {
    "px": 149.89015197753906,
    "py": -129.4581298828125,
    "pz": 54.03328323364258,
    "rx": 0.0047920821234583855,
    "yx": -0.0010092330630868673,
    "zx": -2.823230743408203
  },
  {
    "px": 153.7134552001953,
    "py": -121.52705383300781,
    "pz": 54.03318786621094,
    "rx": 0.0037330687046051025,
    "yx": -0.00014136044774204493,
    "zx": -1.060842752456665
  },
  {
    "px": 157.85360717773438,
    "py": -256.6287536621094,
    "pz": 50.606903076171875,
    "rx": 0.004193500149995089,
    "yx": 0.00016792448877822608,
    "zx": -0.21070706844329834
  },
  {
    "px": 137.64222717285156,
    "py": -242.29183959960938,
    "pz": 50.7421760559082,
    "rx": 0.005121557507663965,
    "yx": 0.004352819640189409,
    "zx": 0.047964632511138916
  },
  {
    "px": 1.8927569389343262,
    "py": -204.0950469970703,
    "pz": 51.94955825805664,
    "rx": 0.003860792610794306,
    "yx": -0.00023331851116381586,
    "zx": -1.1576530933380127
  },
  {
    "px": 181.7964324951172,
    "py": -159.2097930908203,
    "pz": 55.5235595703125,
    "rx": 0.0035176328383386135,
    "yx": -0.00008653057011542842,
    "zx": 1.7963389158248901
  },
  {
    "px": 305.3501892089844,
    "py": -177.77523803710938,
    "pz": 56.55466842651367,
    "rx": 0.01381723489612341,
    "yx": -0.07692325115203857,
    "zx": 1.217698335647583
  },
  {
    "px": 17.745962142944336,
    "py": -654.7120971679688,
    "pz": 30.975597381591797,
    "rx": 0.00498784938827157,
    "yx": -0.00003314575951662846,
    "zx": 1.1039557456970215
  },
  {
    "px": -39.264793395996094,
    "py": -563.9881591796875,
    "pz": 36.95270538330078,
    "rx": 0.003896279726177454,
    "yx": -0.0004926499677821994,
    "zx": 1.6549516916275024
  },
  {
    "px": 118.72711181640625,
    "py": -338.750244140625,
    "pz": 42.51140594482422,
    "rx": -0.022837800905108452,
    "yx": 0.0067683118395507336,
    "zx": -2.8201074600219727
  },
  {
    "px": 243.92678833007812,
    "py": -300.64752197265625,
    "pz": 48.853546142578125,
    "rx": 0.0035509367007762194,
    "yx": -0.0004583266272675246,
    "zx": -1.8898965120315552
  },
  {
    "px": 293.8169250488281,
    "py": -282.3013916015625,
    "pz": 53.188358306884766,
    "rx": 0.003539805766195059,
    "yx": 0.00033160578459501266,
    "zx": -0.6865562200546265
  },
  {
    "px": 558.2764282226562,
    "py": -252.59133911132812,
    "pz": 50.95844650268555,
    "rx": 0.13034848868846893,
    "yx": 0.2846810817718506,
    "zx": -0.9516485929489136
  },
  {
    "px": 484.8363037109375,
    "py": -85.70677185058594,
    "pz": 67.59430694580078,
    "rx": 0.0056655192747712135,
    "yx": 0.00007314350659726188,
    "zx": 2.195108652114868
  },
  {
    "px": 426.8096618652344,
    "py": 31.801183700561523,
    "pz": 89.8711166381836,
    "rx": 0.01550749409943819,
    "yx": 0.0626760721206665,
    "zx": -0.98958820104599
  },
  {
    "px": 373.5351867675781,
    "py": -33.55855178833008,
    "pz": 90.47280883789062,
    "rx": 0.002345576649531722,
    "yx": 0.0002987812622450292,
    "zx": 2.6542022228240967
  },
  {
    "px": 390.68060302734375,
    "py": -42.27000427246094,
    "pz": 81.95707702636719,
    "rx": 0.008160216733813286,
    "yx": -0.0002582820598036051,
    "zx": 1.170798659324646
  },
]