/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from "../util/nativeui/NativeUi"



export function isObjectEmpty(object: Record<string, unknown>): boolean {
  for (const property in object) {
    return false;
  }
  return true;
}

/*

//TODO: Rework clothSelector for new Cloth-System
export function clothSelector(pedComponentVariations: any[]) {
  let model: string;
  if (native.getEntityModel(alt.Player.local.scriptID) == 1885233650) {
    model = "mp_m_freemode_01";
  } else if (native.getEntityModel(alt.Player.local.scriptID) == 2627665880) {
    model = "mp_f_freemode_01";
  } else {
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
        } else if (i == 2) {
          dataArray = element.Props;
          target = propIds;
          propbool = true;
        }

        dataArray.forEach(element => {
          if (element.TranslatedLabel != null) {
            if (element.TextureId == 0) {
              getComp(propbool, element.ComponentId).array.push(element);
            }
          }
        });
      }
    } else {
      return;
    }
  });

  let propbool;
  let short;
  let sourceList: {
    [key: number]: comp;
  };
  for (let i = 1; i <= 2; i++) {
    if (i == 1) {
      short = "C";
      propbool = false;
      sourceList = compIds;
    } else if (i == 2) {
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
          if (el.TextureId == 0) {
            let subItem = new NativeUI.UIMenuCheckboxItem(el.TranslatedLabel.German, whitelist.includes(el.NameHash), el.NameHash);
            subMenu.AddItem(subItem);
          }

          //let item = new NativeUI.UIMenuItem(el.NameHash + " / " + el.TranslatedLabel.German);

        });
        subMenu.DisableInstructionalButtons(true);

        subMenu.MenuOpen.on(() => { indexed(0); });
        subMenu.IndexChange.on((index) => { indexed(index); });

        function indexed(index: number) {
          //TODO: Store all important Information in "Text" and retrieve here
          let id = parseInt(subMenu.Title.split("/")[0].replaceAll("[", ""));
          let category = subMenu.Title.split("/")[1].substr(0, 1);
          if (category == "P") {
            let el = propIds[id].array[index];
            //alt.log(JSON.stringify(el));
            native.setPedPropIndex(alt.Player.local.scriptID, id, el.DrawableId, el.TextureId, true);
          } else if (category == "C") {
            let el = compIds[id].array[index];
            //alt.log(JSON.stringify(el));
            native.setPedComponentVariation(alt.Player.local.scriptID, id, el.DrawableId, el.TextureId, 0); //Letztes arg ist 0-3 aber noch unerforscht wofür das gut ist.
          } else {
            alt.logError("wat");
          }
        }

        subMenu.CheckboxChange.on((item, checked) => {
          if (checked) {
            whitelist.push(item.Description);
            alt.log("checked: " + item.Text);
          } else {
            const index = whitelist.indexOf(5);
            if (index > -1) {
              whitelist.splice(index, 1);
            }
            alt.log("unchecked: " + item.Text);
          }
        });
      } else {
        alt.logWarning("Empty Array: " + element.name);
      }
    });

  }
  menu.Open();

  menu.MenuClose.on(() => {
    alt.emitServer("a_saveclothwhitelist", whitelist);
  });
}

*/