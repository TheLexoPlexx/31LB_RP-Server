/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { database } from './../startup';
import tables from '../database/tables';
import { ItemHolder } from '../../lib/items/items';

export interface PlayerType {
  uuid: string,
  money_hand: number,
  money_bank: number,
  healthpoints: number,
  armour: number,
  pos: {
    x: number,
    y: number,
    z: number,
  },
  rot: {
    x: number,
    y: number,
    z: number,
  },
  firstjoin: Date,
  permissions: number, //Später, Rank zurückgeben
  character?: string, //Später, Charakter-Objekt oder ähnliches
  lastvehicle?: string //Vin um die Datenbankabfragen zu reduzieren
  lastseat?: number,
  inventar?: string //Später, Inventar-Objekt daraus machen,
  fahrzeuge: string[]
  lizenzen: [],
  personalausweis: boolean,
  weapons: { //Auch hier, später eine Lesbare Liste.
    a: string,
    b: string,
    h: string,
  },
  job?: string, //Später, Direkt Job zurückgeben
  faction?: string, //Später, direkt Fraktion zurückgeben
  unlockedplaces: number[],
  telefonnummer: number,
  checkpoints?: number[]
}

export function getPlayer(player: alt.Player, callback) {
  getPlayerByUUID(player.getSyncedMeta("uuid"), (r) => {
    if (r == null) {
      randomFirstSpawnPosition((spawn: FirstSpawn) => {
        callback({
          uuid: player.getSyncedMeta("uuid"),
          money_hand: 0,
          money_bank: 400,
          healthpoints: player.maxHealth,
          armour: player.maxArmour,
          pos: {
            x: spawn.px,
            y: spawn.py,
            z: spawn.pz
          },
          rot: {
            x: spawn.rx,
            y: spawn.ry,
            z: spawn.rz
          },
          firstjoin: new Date(),
          permissions: 1,
          fahrzeuge: [],
          lizenzen: [],
          personalausweis: false,
          weapons: { a: null, b: null, h: null },
          unlockedplaces: [],
          telefonnummer: Math.round(Math.random() * 100000000),
          checkpoints: [],
        })
      });
    } else {
      let cr = {
        uuid: r.uuid,
        money_hand: r.money_hand,
        money_bank: r.money_bank,
        healthpoints: r.healthpoints,
        armour: r.armour,
        pos: JSON.parse(r.pos),
        rot: JSON.parse(r.rot),
        firstjoin: new Date(r.firstjoin),
        permissions: r.permissions,
        lastvehicle: r.lastvehicle,
        lastseat: r.lastseat,
        inventar: JSON.parse(r.inventar),
        fahrzeuge: JSON.parse(r.fahrzeuge),
        lizenzen: JSON.parse(r.lizenzen),
        personalausweis: r.personalausweis,
        weapons: JSON.parse(r.weapons),
        job: r.job,
        faction: r.faction,
        unlockedplaces: JSON.parse(r.unlockedplaces),
        telefonnummer: r.telefonnummer,
        checkpoints: JSON.parse(r.checkpoints),
      };
      callback(cr);
    }
  });
}

export function updatePlayer(playerInfo: PlayerType, callback) {
  let upload = {
    uuid: playerInfo.uuid,
    money_hand: playerInfo.money_hand,
    money_bank: playerInfo.money_bank,
    healthpoints: playerInfo.healthpoints,
    armour: playerInfo.armour,
    pos: JSON.stringify(playerInfo.pos),
    rot: JSON.stringify(playerInfo.rot),
    firstjoin: new Date(playerInfo.firstjoin),
    permissions: playerInfo.permissions,
    lastvehicle: playerInfo.lastvehicle,
    lastseat: playerInfo.lastseat,
    inventar: JSON.stringify(playerInfo.inventar),
    fahrzeuge: JSON.stringify(playerInfo.fahrzeuge),
    lizenzen: JSON.stringify(playerInfo.lizenzen),
    personalausweis: playerInfo.personalausweis,
    weapons: JSON.stringify(playerInfo.weapons),
    job: playerInfo.job,
    faction: playerInfo.faction,
    unlockedplaces: JSON.stringify(playerInfo.unlockedplaces),
    telefonnummer: playerInfo.telefonnummer,
    checkpoints: JSON.stringify(playerInfo.checkpoints),
  };

  database.upsertData(upload, tables.players, (r) => {
    if (callback != null) {
      callback(r);
    }
  });
}

export function getPlayerByUUID(playerId, callback) {
  database.fetchData("uuid", playerId, tables.players, (result) => {
    if (callback != null) {
      callback(result);
    }
  });
}

export function setCloth(player: alt.Player, comp: number, item: ItemHolder, drawable: number, texture: number, dlcHash: string) {
  player.setSyncedMeta("inventory_" + comp, item);
  let palette = 2; //0 oder 1, ka.
  alt.emitClient(player, "a_setclothes", palette)
  //Noch nicht im release, nur dev: player.setClothes(comp, drawable, texture, palette, alt.hash(dlcHash));
}

export function fixPlayer(player: alt.Player) {
  if (player.seat == undefined) {
    let pos = player.pos;
    let rot = player.rot;

    player.pos = pos;
    player.rot = new alt.Vector3(0, 90, rot.z);
  }
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
    updatePlayer(result, null);
  });
}

export function toggleKeypress(player: alt.Player) {
  if (player.getSyncedMeta("allowKeyPress")) {
    player.setSyncedMeta("allowKeyPress", false);
  } else {
    player.setSyncedMeta("allowKeyPress", true);
  }
}

//--------------------------------------------------------------------------------------//
//                                    Misceallonous                                     //
//--------------------------------------------------------------------------------------//
function randomFirstSpawnPosition(callback: CallableFunction) {
  let occupiedList = [];
  let occupiedCounter = 0;
  let findInterv = alt.setInterval(() => {
    let spawnPointList = spawnpositions.filter(el => !(occupiedList.includes(el)));
    if (spawnPointList.length == 0) {
      alt.logError("[31LB] Alle Spawnpunkte sind belegt.");
       /**
       * TODO: Elegante Lösung falls kein Spawnpunkt frei ist 
       * 
       * Prüfen ob einer oder mehrere der Entities im Kreis ein Fahrzeug ist 
       * und despawnen wenn der Besitzer nicht online ist und respawnen wenn der
       * neue Spieler den Spawnkreis verlassen hat.
       */
      occupiedCounter++;
      if (occupiedCounter == 20) {
        occupiedList = []; //Empty occupiedList and run again
        occupiedCounter = 0;
      }
      //Will go on forever if no spawn point can be found
    } else {
      let spawnPoint = spawnPointList[Math.floor(Math.random() * spawnPointList.length)];
      let csCyl = new alt.ColshapeCylinder(spawnPoint.px, spawnPoint.py, spawnPoint.pz, 10, 10);
      let entList = JSON.stringify(alt.Entity.all.filter(ent => csCyl.isEntityIn(ent)));

      if (entList.length <= 2) {
        alt.log("Spawning...");
        callback(spawnPoint);
        alt.clearInterval(findInterv);
      } else {
        //rerunning
        occupiedList.push(spawnPoint);
      }
      csCyl.destroy();
    }
  }, 250);
}

interface FirstSpawn {
  px: number,
  py: number,
  pz: number,
  rx: number,
  ry: number,
  rz: number,
}

const spawnpositions: FirstSpawn[] = [{
  px: -21.05666160583496,
  py: -638.7738647460938,
  pz: 35.28913497924805,
  rx: 0.001075899344868958,
  ry: 0.00048563486780039966,
  rz: -1.9382637739181519
},
{
  px: 728.8965454101562,
  py: -589.1779174804688,
  pz: 26.89499855041504,
  rx: -0.04029086232185364,
  ry: 0.027995802462100983,
  rz: 0.1605008989572525
},
{
  px: 740.513671875,
  py: -835.6133422851562,
  pz: 24.84783363342285,
  rx: 0.03764992579817772,
  ry: -0.02982323057949543,
  rz: -0.4407113492488861
},
{
  px: -412.3011779785156,
  py: -598.5018920898438,
  pz: 28.65338134765625,
  rx: -0.047998830676078796,
  ry: 0.0468510203063488,
  rz: -0.2965157926082611
},
{
  px: -20.254650115966797,
  py: -217.4847869873047,
  pz: 45.38410568237305,
  rx: 0.007413841784000397,
  ry: -0.000029708760848734528,
  rz: -3.1208419799804688
},
{
  px: -111.2129898071289,
  py: -324.858642578125,
  pz: 34.39604568481445,
  rx: 0.0863700732588768,
  ry: 0.014384613372385502,
  rz: 2.7225959300994873
},
{
  px: -359.0177917480469,
  py: -424.1844787597656,
  pz: 28.139732360839844,
  rx: 0.1506253033876419,
  ry: 0.017607996240258217,
  rz: -0.08068025857210159
},
{
  px: 43.784305572509766,
  py: -391.2147521972656,
  pz: 39.128990173339844,
  rx: 0.003921830095350742,
  ry: -0.0005713315913453698,
  rz: 0.16538691520690918
},
{
  px: 19.48415756225586,
  py: -457.1929931640625,
  pz: 39.130584716796875,
  rx: 0.0031707335729151964,
  ry: -0.00015241112851072103,
  rz: 1.6916378736495972
},
{
  px: 56.24824905395508,
  py: -369.1797180175781,
  pz: 39.128746032714844,
  rx: 0.003831049893051386,
  ry: -0.00011607736814767122,
  rz: -2.620272159576416
},
{
  px: 149.89015197753906,
  py: -129.4581298828125,
  pz: 54.03328323364258,
  rx: 0.0047920821234583855,
  ry: -0.0010092330630868673,
  rz: -2.823230743408203
},
{
  px: 153.7134552001953,
  py: -121.52705383300781,
  pz: 54.03318786621094,
  rx: 0.0037330687046051025,
  ry: -0.00014136044774204493,
  rz: -1.060842752456665
},
{
  px: 157.85360717773438,
  py: -256.6287536621094,
  pz: 50.606903076171875,
  rx: 0.004193500149995089,
  ry: 0.00016792448877822608,
  rz: -0.21070706844329834
},
{
  px: 137.64222717285156,
  py: -242.29183959960938,
  pz: 50.7421760559082,
  rx: 0.005121557507663965,
  ry: 0.004352819640189409,
  rz: 0.047964632511138916
},
{
  px: 1.8927569389343262,
  py: -204.0950469970703,
  pz: 51.94955825805664,
  rx: 0.003860792610794306,
  ry: -0.00023331851116381586,
  rz: -1.1576530933380127
},
{
  px: 181.7964324951172,
  py: -159.2097930908203,
  pz: 55.5235595703125,
  rx: 0.0035176328383386135,
  ry: -0.00008653057011542842,
  rz: 1.7963389158248901
},
{
  px: 305.3501892089844,
  py: -177.77523803710938,
  pz: 56.55466842651367,
  rx: 0.01381723489612341,
  ry: -0.07692325115203857,
  rz: 1.217698335647583
},
{
  px: 17.745962142944336,
  py: -654.7120971679688,
  pz: 30.975597381591797,
  rx: 0.00498784938827157,
  ry: -0.00003314575951662846,
  rz: 1.1039557456970215
},
{
  px: -39.264793395996094,
  py: -563.9881591796875,
  pz: 36.95270538330078,
  rx: 0.003896279726177454,
  ry: -0.0004926499677821994,
  rz: 1.6549516916275024
},
{
  px: 118.72711181640625,
  py: -338.750244140625,
  pz: 42.51140594482422,
  rx: -0.022837800905108452,
  ry: 0.0067683118395507336,
  rz: -2.8201074600219727
},
{
  px: 243.92678833007812,
  py: -300.64752197265625,
  pz: 48.853546142578125,
  rx: 0.0035509367007762194,
  ry: -0.0004583266272675246,
  rz: -1.8898965120315552
},
{
  px: 293.8169250488281,
  py: -282.3013916015625,
  pz: 53.188358306884766,
  rx: 0.003539805766195059,
  ry: 0.00033160578459501266,
  rz: -0.6865562200546265
},
{
  px: 558.2764282226562,
  py: -252.59133911132812,
  pz: 50.95844650268555,
  rx: 0.13034848868846893,
  ry: 0.2846810817718506,
  rz: -0.9516485929489136
},
{
  px: 484.8363037109375,
  py: -85.70677185058594,
  pz: 67.59430694580078,
  rx: 0.0056655192747712135,
  ry: 0.00007314350659726188,
  rz: 2.195108652114868
},
{
  px: 426.8096618652344,
  py: 31.801183700561523,
  pz: 89.8711166381836,
  rx: 0.01550749409943819,
  ry: 0.0626760721206665,
  rz: -0.98958820104599
},
{
  px: 373.5351867675781,
  py: -33.55855178833008,
  pz: 90.47280883789062,
  rx: 0.002345576649531722,
  ry: 0.0002987812622450292,
  rz: 2.6542022228240967
},
{
  px: 390.68060302734375,
  py: -42.27000427246094,
  pz: 81.95707702636719,
  rx: 0.008160216733813286,
  ry: -0.0002582820598036051,
  rz: 1.170798659324646
},
]