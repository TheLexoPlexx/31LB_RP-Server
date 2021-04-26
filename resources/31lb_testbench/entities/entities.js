import orm from 'typeorm';
import sha256 from 'js-sha256';

export const PlayerEntity = new orm.EntitySchema({
    name: 'player',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar'
        },
        socialclub: {
            type: 'varchar'
        },
        mail: {
            type: 'varchar'
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
        posX: {
            type: "int"
        },
        posY: {
            type: "int"
        },
        posZ: {
            type: "int"
        },
        rotX: {
            type: "int"
        },
        rotY: {
            type: "int"
        },
        rotZ: {
            type: "int"
        },
        discord: {
            type: "varchar"
        },
        firstjoin: {
            type: "varchar"
        },
        permissionsgroup: {
            type: "int"
        },
        character: {
            type: "varchar"
        }
    }
});

//inventaar
//fahrzeuge
//lizenzen
//perso
//gunz
//player.seat