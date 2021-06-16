import * as alt from 'alt-server';
import tables from '../database/tables';
import { database } from '../startup';
export function getPlayer(player, callback) {
    new LB_Player(player.getSyncedMeta("uuid"), player, callback);
}
export function getOfflinePlayer(uuid, callback) {
    alt.logWarning("GetOfflinePlayer");
    new LB_Player(uuid, null, callback);
}
;
class LB_Player {
    constructor(uuid, player, callback) {
        if (player != null) {
            this.isOnline = true;
            this.onlinePlayer = player;
            this.healthpoints = player.health;
            this.armour = player.armour;
            this.pos = player.pos;
            this.rot = player.rot;
            if (player.vehicle != null) {
                this.lastvehicle = player.vehicle.getSyncedMeta("vin");
                this.lastseat = player.seat;
            }
            else {
                this.lastvehicle = null;
                this.lastseat = null;
            }
        }
        let playerPromise = database.fetchDataAsync("uuid", uuid, tables.players);
        playerPromise.then(playerResult => {
            if (playerResult == undefined) {
                randomFirstSpawnPosition((spawn) => {
                    this.uuid = player.getSyncedMeta("uuid");
                    this.money_hand = 0,
                        this.money_bank = 400,
                        this.healthpoints = player.maxHealth,
                        this.armour = player.maxArmour,
                        this.pos = new alt.Vector3(spawn.px, spawn.py, spawn.pz);
                    this.rot = new alt.Vector3(spawn.rx, spawn.ry, spawn.rz);
                    this.firstjoin = new Date();
                    this.permissions = 1;
                    this.fahrzeuge = [];
                    this.lizenzen = [];
                    this.personalausweis = false;
                    this.weapons = { a: null, b: null, h: null },
                        this.unlockedplaces = [],
                        this.telefonnummer = Math.round(Math.random() * 100000000),
                        this.checkpoints = [];
                    callback(this);
                });
            }
            else {
                this.uuid = playerResult.uuid;
                this.money_hand = playerResult.money_hand;
                this.money_bank = playerResult.money_bank;
                if (!this.isOnline) {
                    this.healthpoints = playerResult.healthpoints;
                    this.armour = playerResult.armour;
                    let tempPos = JSON.parse(playerResult.pos);
                    this.pos = new alt.Vector3(tempPos.x, tempPos.y, tempPos.z);
                    let tempRot = JSON.parse(playerResult.rot);
                    this.rot = new alt.Vector3(tempRot.x, tempRot.y, tempRot.z);
                    this.lastvehicle = playerResult.lastvehicle;
                    this.lastseat = playerResult.lastseat;
                }
                this.firstjoin = new Date(playerResult.firstjoin);
                this.permissions = playerResult.permissions;
                this.character = JSON.parse(playerResult.character);
                this.inventar = JSON.parse(playerResult.inventar);
                this.fahrzeuge = JSON.parse(playerResult.fahrzeuge);
                this.lizenzen = JSON.parse(playerResult.lizenzen);
                this.personalausweis = playerResult.personalausweis;
                this.weapons = JSON.parse(playerResult.weapons);
                this.job = playerResult.job;
                this.faction = playerResult.faction;
                this.unlockedplaces = JSON.parse(playerResult.unlockedplaces);
                this.telefonnummer = playerResult.telefonnummer;
                this.checkpoints = JSON.parse(playerResult.checkpoints);
                callback(this);
            }
        });
    }
    save() {
        let uploadObject = {
            uuid: this._uuid,
            money_hand: this._money_hand,
            money_bank: this._money_bank,
            healthpoints: this._healthpoints,
            armour: this._armour,
            pos: JSON.stringify(this._pos),
            rot: JSON.stringify(this._rot),
            firstjoin: this._firstjoin,
            permissions: this._permissions,
            character: JSON.stringify(this._character),
            lastvehicle: this._lastvehicle,
            lastseat: this._lastseat,
            inventar: JSON.stringify(this._inventar),
            fahrzeuge: JSON.stringify(this._fahrzeuge),
            lizenzen: JSON.stringify(this._lizenzen),
            personalausweis: this._personalausweis,
            weapons: JSON.stringify(this._weapons),
            job: this._job,
            faction: this._faction,
            unlockedplaces: JSON.stringify(this._unlockedplaces),
            telefonnummer: this._telefonnummer,
            checkpoints: JSON.stringify(this._checkpoints),
        };
        database.upsertData(uploadObject, tables.players, (result) => {
            alt.log("Player saved: " + JSON.stringify(result));
        });
    }
    get uuid() {
        return this._uuid;
    }
    set uuid(uuid) {
        this._uuid = uuid;
    }
    get money_hand() {
        return this._money_hand;
    }
    set money_hand(money_hand) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("money_hand", money_hand);
        }
        this._money_hand = money_hand;
    }
    get money_bank() {
        return this._money_bank;
    }
    set money_bank(money_bank) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("money_bank", money_bank);
        }
        this._money_bank = money_bank;
    }
    get healthpoints() {
        return this._healthpoints;
    }
    set healthpoints(healthpoints) {
        if (this.isOnline) {
            this.onlinePlayer.health = healthpoints;
        }
        this._healthpoints = healthpoints;
    }
    get armour() {
        return this._armour;
    }
    set armour(armour) {
        if (this.isOnline) {
            this.onlinePlayer.armour = armour;
        }
        this._armour = armour;
    }
    get pos() {
        return this._pos;
    }
    set pos(pos) {
        this._pos = pos;
    }
    get rot() {
        return this._rot;
    }
    set rot(rot) {
        this._rot = rot;
    }
    get firstjoin() {
        return this._firstjoin;
    }
    set firstjoin(firstjoin) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("firstjoin", firstjoin);
        }
        this._firstjoin = firstjoin;
    }
    get permissions() {
        return this._permissions;
    }
    set permissions(permissions) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("permissions", permissions);
        }
        this._permissions = permissions;
    }
    get character() {
        return this._character;
    }
    set character(character) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("character", character);
        }
        this._character = character;
    }
    get lastvehicle() {
        return this._lastvehicle;
    }
    set lastvehicle(lastvehicle) {
        this._lastvehicle = lastvehicle;
    }
    get lastseat() {
        return this._lastseat;
    }
    set lastseat(lastseat) {
        this._lastseat = lastseat;
    }
    get inventar() {
        return this._inventar;
    }
    set inventar(inventar) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("inventar", inventar);
        }
        this._inventar = inventar;
    }
    get fahrzeuge() {
        return this._fahrzeuge;
    }
    set fahrzeuge(fahrzeuge) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("fahrzeuge", fahrzeuge);
        }
        this._fahrzeuge = fahrzeuge;
    }
    get lizenzen() {
        return this._lizenzen;
    }
    set lizenzen(lizenzen) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("lizenzen", lizenzen);
        }
        this._lizenzen = lizenzen;
    }
    get personalausweis() {
        return this._personalausweis;
    }
    set personalausweis(personalausweis) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("personalausweis", personalausweis);
        }
        this._personalausweis = personalausweis;
    }
    get weapons() {
        return this._weapons;
    }
    set weapons(weapons) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("weapons", weapons);
        }
        this._weapons = weapons;
    }
    get job() {
        return this._job;
    }
    set job(job) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("job", job);
        }
        this._job = job;
    }
    get faction() {
        return this._faction;
    }
    set faction(faction) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("faction", faction);
        }
        this._faction = faction;
    }
    get unlockedplaces() {
        return this._unlockedplaces;
    }
    set unlockedplaces(unlockedplaces) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("unlockedplaces", unlockedplaces);
        }
        this._unlockedplaces = unlockedplaces;
    }
    get telefonnummer() {
        return this._telefonnummer;
    }
    set telefonnummer(telefonnummer) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("telefonnummer", telefonnummer);
        }
        this._telefonnummer = telefonnummer;
    }
    get checkpoints() {
        return this._checkpoints;
    }
    set checkpoints(checkpoints) {
        if (this.isOnline) {
            this.onlinePlayer.setSyncedMeta("checkpoints", checkpoints);
        }
        this._checkpoints = checkpoints;
    }
    addCheckpoint(checkpoint) {
        this._checkpoints.push(checkpoint);
    }
    removeCheckpoint(checkpoint) {
        if (this._checkpoints.includes(checkpoint)) {
            this._checkpoints.splice(this._checkpoints.indexOf(checkpoint), 1);
        }
    }
    hasCheckpoint(checkpoint) {
        return this._checkpoints.includes(checkpoint);
    }
}
export function fixPlayer(player) {
    if (player.seat == undefined) {
        let pos = player.pos;
        let rot = player.rot;
        player.pos = pos;
        player.rot = new alt.Vector3(0, 90, rot.z);
    }
}
export function toggleKeypress(player) {
    if (player.getSyncedMeta("allowKeyPress")) {
        player.setSyncedMeta("allowKeyPress", false);
    }
    else {
        player.setSyncedMeta("allowKeyPress", true);
    }
}
function randomFirstSpawnPosition(callback) {
    let occupiedList = [];
    let occupiedCounter = 0;
    let findInterv = alt.setInterval(() => {
        let spawnPointList = spawnpositions.filter(el => !(occupiedList.includes(el)));
        if (spawnPointList.length == 0) {
            alt.logError("[31LB] Alle Spawnpunkte sind belegt.");
            occupiedCounter++;
            if (occupiedCounter == 20) {
                occupiedList = [];
                occupiedCounter = 0;
            }
        }
        else {
            let spawnPoint = spawnPointList[Math.floor(Math.random() * spawnPointList.length)];
            let csCyl = new alt.ColshapeCylinder(spawnPoint.px, spawnPoint.py, spawnPoint.pz, 10, 10);
            let entList = JSON.stringify(alt.Entity.all.filter(ent => csCyl.isEntityIn(ent)));
            if (entList.length <= 2) {
                alt.log("Spawning...");
                callback(spawnPoint);
                alt.clearInterval(findInterv);
            }
            else {
                occupiedList.push(spawnPoint);
            }
            csCyl.destroy();
        }
    }, 250);
}
const spawnpositions = [{
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
];
