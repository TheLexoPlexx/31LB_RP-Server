import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from "./util/nativeui/NativeUi";
const compIds = {
    0: {
        id: 0,
        name: "Head",
        array: []
    },
    1: {
        id: 1,
        name: "Masks",
        array: []
    },
    2: {
        id: 2,
        name: "Hair Styles",
        array: []
    },
    3: {
        id: 3,
        name: "Torsos",
        array: []
    },
    4: {
        id: 4,
        name: "Legs",
        array: []
    },
    5: {
        id: 5,
        name: "Bags and Parachutes",
        array: []
    },
    6: {
        id: 6,
        name: "Shoes",
        array: []
    },
    7: {
        id: 7,
        name: "Accessories",
        array: []
    },
    8: {
        id: 8,
        name: "Undershirts",
        array: []
    },
    9: {
        id: 9,
        name: "Body Armors",
        array: []
    },
    10: {
        id: 10,
        name: "Decals",
        array: []
    },
    11: {
        id: 11,
        name: "Tops",
        array: []
    }
};
const propIds = {
    0: {
        id: 0,
        name: "Hats",
        array: []
    },
    1: {
        id: 1,
        name: "Glasses",
        array: []
    },
    2: {
        id: 2,
        name: "Ears",
        array: []
    },
    6: {
        id: 6,
        name: "Watches",
        array: []
    },
    7: {
        id: 7,
        name: "Bracelets",
        array: []
    },
};
function getComp(props, index) {
    if (props) {
        return propIds[index];
    }
    else {
        return compIds[index];
    }
}
export function clothSelector(pedComponentVariations, whitelist) {
    let model;
    if (native.getEntityModel(alt.Player.local.scriptID) == 1885233650) {
        model = "mp_m_freemode_01";
    }
    else if (native.getEntityModel(alt.Player.local.scriptID) == 2627665880) {
        model = "mp_f_freemode_01";
    }
    else {
        alt.logError("Wrong Model");
    }
    let menu = new NativeUI.Menu("Kleidung", model.toString(), new NativeUI.Point(50, 50));
    menu.GetTitle().DropShadow = true;
    let backToDefaultButton = new NativeUI.InstructionalButton("Zurück zu Standard", 0, "F");
    menu.AddInstructionalButton(backToDefaultButton);
    alt.on('keyup', (key) => {
        if (key === 70 && menu.Visible) {
            for (var i = 0; i < 12; i++) {
                native.clearAllPedProps(alt.Player.local.scriptID);
                native.setPedDefaultComponentVariation(alt.Player.local.scriptID);
            }
        }
    });
    pedComponentVariations.forEach(element => {
        if (element.PedName == model) {
            let dataArray;
            let target;
            let propbool;
            for (let i = 1; i <= 2; i++) {
                if (i == 1) {
                    dataArray = element.ComponentVariations;
                    target = compIds;
                    propbool = false;
                }
                else if (i == 2) {
                    dataArray = element.Props;
                    target = propIds;
                    propbool = true;
                }
                dataArray.forEach(element => {
                    if (element.TranslatedLabel != null) {
                        if (element.TranslatedLabel.English != "soon") {
                            getComp(propbool, element.ComponentId).array.push(element);
                        }
                    }
                });
            }
        }
        else {
            return;
        }
    });
    let propbool;
    let short;
    let sourceList;
    for (let i = 1; i <= 2; i++) {
        if (i == 1) {
            short = "C";
            propbool = false;
            sourceList = compIds;
        }
        else if (i == 2) {
            short = "P";
            propbool = true;
            sourceList = propIds;
        }
        Object.values(sourceList).forEach(element => {
            if (element.array.length != 0) {
                var title = "[" + element.id + "/" + short + "] " + element.name;
                let item = new NativeUI.UIMenuItem(title);
                item.SetRightBadge(NativeUI.BadgeStyle.ArrowRight);
                menu.AddItem(item);
                const subMenu = new NativeUI.Menu(title, "", new NativeUI.Point(50, 50));
                subMenu.GetTitle().DropShadow = true;
                menu.AddSubMenu(subMenu, item);
                element.array.forEach((el) => {
                    let item = new NativeUI.UIMenuCheckboxItem(el.TranslatedLabel.German, false, el.NameHash);
                    subMenu.AddItem(item);
                });
                subMenu.DisableInstructionalButtons(true);
                subMenu.MenuOpen.on(() => { indexed(0); });
                subMenu.IndexChange.on((index) => { indexed(index); });
                function indexed(index) {
                    let id = parseInt(subMenu.Title.split("/")[0].replace("[", ""));
                    let category = subMenu.Title.split("/")[1].substr(0, 1);
                    if (category == "P") {
                        let el = propIds[id].array[index];
                        native.setPedPropIndex(alt.Player.local.scriptID, id, el.DrawableId, el.TextureId, true);
                    }
                    else if (category == "C") {
                        let el = compIds[id].array[index];
                        native.setPedComponentVariation(alt.Player.local.scriptID, id, el.DrawableId, el.TextureId, 0);
                    }
                    else {
                        alt.logError("wat");
                    }
                }
                subMenu.CheckboxChange.on((item, checked) => {
                    alt.log("checked: " + item.Text);
                    0;
                });
            }
            else {
                alt.logWarning("Empty Array: " + element.name);
            }
        });
    }
    menu.Open();
}
