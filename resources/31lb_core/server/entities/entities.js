import orm from "typeorm";
export const PlayerEntity = new orm.EntitySchema({
    name: 'players',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        password: {
            type: 'varchar'
        },
        money_hand: {
            type: "numeric",
            precision: 12,
            scale: 2
        },
        money_bank: {
            type: "numeric",
            precision: 12,
            scale: 2
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
        firstjoin: {
            type: "varchar"
        },
        permissions: {
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
        incar: {
            type: "varchar",
            nullable: true
        },
        inventar: {
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
        },
        faction: {
            type: "varchar",
            nullable: true
        },
        unlockedplaces: {
            type: 'varchar',
            nullable: true,
            default: "[]"
        }
    }
});
export const PlaceEntity = new orm.EntitySchema({
    name: 'places',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        displayname: {
            type: 'varchar',
            nullable: true
        },
        description: {
            type: "varchar",
            nullable: true
        },
        blip_pos: {
            type: "varchar",
            nullable: true
        },
        blip_icon: {
            type: 'int',
            nullable: true
        },
        blip_color: {
            type: 'int',
            nullable: true
        },
        unlock_pos: {
            type: "varchar",
            nullable: true
        },
        unlock_radius: {
            type: "int",
            nullable: true
        },
        interact_pos: {
            type: "varchar",
            nullable: true
        },
        interact_radius: {
            type: "int",
            nullable: true
        },
        interact_function: {
            type: "varchar",
            nullable: true
        },
        creator: {
            type: "varchar",
            nullable: true
        },
        banner: {
            type: "varchar",
            nullable: true
        },
        carstatus: {
            type: "int",
            nullable: true
        },
        shop: {
            type: "varchar",
            nullable: true
        },
    }
});
export const WeaponEntity = new orm.EntitySchema({
    name: 'weapons',
    columns: {
        serial: {
            primary: true,
            type: 'varchar'
        },
        weaponname: {
            type: 'varchar'
        },
        owner: {
            type: 'varchar',
            nullable: true
        },
    }
});
export const VehicleEntity = new orm.EntitySchema({
    name: 'vehicles',
    columns: {
        vin: {
            primary: true,
            type: 'varchar',
        },
        model: {
            type: 'varchar',
            nullable: true,
        },
        a: {
            type: 'varchar',
            nullable: true,
        },
        d: {
            type: 'varchar',
            nullable: true,
        },
        g: {
            type: 'varchar',
            nullable: true,
        },
        h: {
            type: 'varchar',
            nullable: true,
        },
        s: {
            type: 'varchar',
            nullable: true,
        },
        pos: {
            type: 'varchar',
            nullable: true,
        },
        rot: {
            type: 'varchar',
            nullable: true,
        },
        spawned: {
            type: 'boolean',
            nullable: true,
        },
    }
});
