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
            type: "float"
        },
        posY: {
            type: "float"
        },
        posZ: {
            type: "float"
        },
        rotX: {
            type: "float"
        },
        rotY: {
            type: "float"
        },
        rotZ: {
            type: "float"
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
        /*,
        dead: {
            type: "boolean"
        },
        incar: {
            type: "varchar"
        }*/
    }
});

//inventaar
//fahrzeuge
//lizenzen
//perso
//gunz
//player.seat