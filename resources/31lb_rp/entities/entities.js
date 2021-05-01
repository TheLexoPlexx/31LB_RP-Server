import orm from 'typeorm';

export const PlayerEntity = new orm.EntitySchema({
  name: 'player',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar',
      nullable: true
    },
    socialclub: {
      type: 'varchar'
    },
    mail: {
      type: 'varchar',
      nullable: true
    },
    password: { //TODO: Encryption
      type: 'varchar'
    },
    money_hand: {
      type: "money"
    },
    money_bank: {
      type: "money"
    },
    healthpoints: {
      type: "int"
    },
    armour: {
      type: "int"
    },
    pos: {
      type: "varchar",
      nullable: true
    },
    rot: {
      type: "varchar",
      nullable: true
    },
    discord: {
      type: "varchar",
      nullable: true
    },
    firstjoin: {
      type: "varchar"
    },
    permissionsgroup: {
      type: "int"
    },
    character: {
      type: "varchar",
      nullable: true
    },
    sessionid: {
      type: "int",
      nullable: true
    },
    incar: { //player.seat
      type: "varchar",
      nullable: true
    },
    inventaar: {
      type: "varchar",
      nullable: true
    },
    fahrzeuge: {
      type: "varchar",
      nullable: true
    },
    lizenzen: {
      type: "varchar",
      nullable: true
    },
    personalausweis: {
      type: "varchar",
      nullable: true
    },
    weapons: {
      type: "varchar",
      nullable: true
    },
    job: {
      type: "varchar",
      nullable: true
    }
  }
});

export const PlaceEntity = new orm.EntitySchema({
  /*
    var cc = new alt.ColshapeCircle(-971, -2991, 20);
    cc.playersOnly = true;

    alt.on("entityEnterColshape", (colshape, player) => {
    alt.log(JSON.stringify(colshape.pos));
    alt.log(JSON.stringify(player.id));
    });

    pos2 kann null sein, alpha ist von 0-255
    nat.createCheckpoint(46, -650, -1370, 9.9, -650, 1370, 9.9, 20, 255, 0, 0, 255, null);
    */
  name: 'place',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    displayname: {
      type: 'varchar',
      nullable: true //Sollte er aber nicht
    },
    description: {
      type: "varchar",
      nullable: true
    },
    unlockable: {
      type: "boolean",
      default: true,
      nullable: true //Sollte er aber nicht
    },
    pos_marker: {
      type: "varchar",
      nullable: true //Sollte er aber nicht
    },
    dir_marker: {
      type: "varchar",
      nullable: true //Sollte er aber nicht
    },
    marker_icon: {
      type: 'varchar',
      nullable: true
    },
    pos_unlockcircle: {
      type: "varchar",
      nullable: true
    },
  }
});