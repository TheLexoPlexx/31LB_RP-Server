/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from "./util/nativeui/NativeUi"
import * as msg from "./util/messenger";

//TODO: Refactor, removeCheckpoint... etc. sind alle doppelt, auch updateCoords

let menu;

export function startPlaceGen() {
  let new_place = {
    displayname: null,
    description: null,
    blip_pos: null,
    blip_icon: null,
    blip_color: null,
    unlock_pos: null, //xyz
    unlock_radius: 4,
    interact_pos: null,
    interact_radius: 2,
    function: null,
  };

  let title = "Standort erstellen";
  // ==== HAUPTMENÜ
  //TODO: Für Titel und Beschreibung den aktuellen in das Textfeld schreiben
  menu = new NativeUI.Menu(title, "Hauptmenü", new NativeUI.Point(50, 50));
  menu.GetTitle().DropShadow = true;
  menu.DisableInstructionalButtons(true);

  let titleitem = new NativeUI.UIMenuItem("Titel", "Titel festlegen");
  titleitem.SetRightBadge(NativeUI.BadgeStyle.ArrowRight);
  menu.AddItem(titleitem);

  let subtitleitem = new NativeUI.UIMenuItem("Beschreibung", "Beschreibung festlegen");
  subtitleitem.SetRightBadge(NativeUI.BadgeStyle.ArrowRight);
  menu.AddItem(subtitleitem);

  let menu_blip_item = new NativeUI.UIMenuItem("Blip", "Einen Blip festlegen");
  menu_blip_item.SetRightBadge(NativeUI.BadgeStyle.ArrowRight);
  menu.AddItem(menu_blip_item);

  let menu_unlock_item = new NativeUI.UIMenuItem("Entsperren", "Festlegen wie der Ort entsperrt werden soll");
  menu_unlock_item.SetRightBadge(NativeUI.BadgeStyle.ArrowRight);
  menu.AddItem(menu_unlock_item);

  let menu_interaction_item = new NativeUI.UIMenuItem("Interaktion", "Festlegen welche Interaktion hier stattfindet.");
  menu_interaction_item.SetRightBadge(NativeUI.BadgeStyle.ArrowRight);
  menu.AddItem(menu_interaction_item);

  let saveNewPlace_item = new NativeUI.UIMenuItem("Speichern", "Ort speichern.");
  saveNewPlace_item.Enabled = false;
  menu.AddItem(saveNewPlace_item);

  // ==== ENTSPERREN
  const menu_unlock = new NativeUI.Menu(title, "Entsperr-Optionen", new NativeUI.Point(50, 50));
  menu_unlock.GetTitle().DropShadow = true;
  menu_unlock.DisableInstructionalButtons(true);

  let unlockable = new NativeUI.UIMenuCheckboxItem("Entsperrbar", false, "Haken setzen wenn dieser Marker entsperrt werden muss. Wenn der Haken nicht gesetzt wird, ist der Marker immer für alle sichtbar.");
  menu_unlock.AddItem(unlockable);

  let unlockradius = new NativeUI.UIMenuAutoListItem("Radius des Entsperrkreises", "Radius des Entsperrkreises.", 2, 40, new_place.unlock_radius);
  unlockradius.Enabled = false;
  menu_unlock.AddItem(unlockradius);

  let unlockPosSameAsMarker = new NativeUI.UIMenuCheckboxItem("Position des Entsperrkreises",
    true, "Haken setzen wenn die Position der Entsperrung gleich ist, wie der Marker.");
  unlockPosSameAsMarker.Enabled = false;
  menu_unlock.AddItem(unlockPosSameAsMarker);

  let unlockx = new NativeUI.UIMenuItem("Entsperr-X", "Position für die Entsperrung");
  unlockx.Enabled = false;
  menu_unlock.AddItem(unlockx);
  let unlocky = new NativeUI.UIMenuItem("Entsperr-Y", "Position für die Entsperrung");
  unlocky.Enabled = false;
  menu_unlock.AddItem(unlocky);
  let unlockz = new NativeUI.UIMenuItem("Entsperr-Z", "Position für die Entsperrung");
  unlockz.Enabled = false;
  menu_unlock.AddItem(unlockz);

  let fixunlockpos = new NativeUI.UIMenuCheckboxItem("Entsperrkreises festsetzen", false, "");
  fixunlockpos.Enabled = false;
  menu_unlock.AddItem(fixunlockpos);

  let u;
  function updateCoordsUnlocker() {
    u = alt.everyTick(() => {
      unlockx.SetRightLabel(round(alt.Player.local.pos.x));
      unlocky.SetRightLabel(round(alt.Player.local.pos.y));
      unlockz.SetRightLabel(round(alt.Player.local.pos.z));
    }); 
  }
  //updateCoordsUnlocker();

  let color = {
    unlock: { //flat colour template, light green 800
      r: 85,
      g: 138,
      b: 46
    },
    interaction: { //flat colour template, light blue 800
      r: 2,
      g: 119,
      b: 189
    },
  }

  let c, fix_c;

  function drawCheckpointUnlock(x, y, z) {
    if (c != undefined) {
      native.deleteCheckpoint(c);
    }
    c = native.createCheckpoint(47, x, y, z-1.1, null, null, null, new_place.unlock_radius, color.unlock.r, color.unlock.g, color.unlock.b, 255, 181);
    native.setCheckpointCylinderHeight(c, 3, 3, new_place.unlock_radius);
  }

  function removeCheckpointUnlock() {
    native.deleteCheckpoint(c);
    c = undefined;
  }

  function fixCheckpointToPlayerUnlock() {
    if (fix_c == undefined) {
      fix_c = alt.everyTick(() => {
        drawCheckpointUnlock(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z);
      });
    } else {
      alt.logError("HALT STOPP!");
    }
  }

  function stopfixCheckpointToPlayerUnlock() {
    alt.clearEveryTick(fix_c);
    fix_c = undefined;
    alt.setTimeout(() => {
      removeCheckpointUnlock();
    }, 10);
  }

  menu_unlock.CheckboxChange.on((selectedItem) => {
    if (selectedItem.Text == unlockable.Text) {
      if (unlockable.Checked) {
        unlockradius.Enabled = true;
        unlockPosSameAsMarker.Enabled = true;
        if (new_place.blip_pos == null) {
          fixCheckpointToPlayerUnlock();
        } else {
          drawCheckpointUnlock(new_place.blip_pos.x, new_place.blip_pos.y, new_place.blip_pos.z);
          new_place.unlock_pos = {
            x: new_place.blip_pos.x,
            y: new_place.blip_pos.y,
            z: new_place.blip_pos.z
          };
        }
      } else {
        unlockradius.Enabled = false;
        unlockPosSameAsMarker.Enabled = false;
        removeCheckpointUnlock();

        if (fix_c != undefined) {
          stopfixCheckpointToPlayerUnlock();
        }
        if (unlockPosSameAsMarker.Checked) {
          unlockPosSameAsMarker.Enabled = false;
          unlockx.Enabled = false;
          unlocky.Enabled = false;
          unlockz.Enabled = false;
          fixunlockpos.Enabled = false;
        }
      }
    } else if (selectedItem.Text == unlockPosSameAsMarker.Text) {
      if (!unlockPosSameAsMarker.Checked) {
        unlockx.Enabled = true;
        unlocky.Enabled = true;
        unlockz.Enabled = true;
        fixunlockpos.Enabled = true;

        updateCoordsUnlocker();
        if (new_place.blip_pos != null) {
          fixCheckpointToPlayerUnlock();
        }
      } else {
        unlockx.Enabled = false;
        unlocky.Enabled = false;
        unlockz.Enabled = false;
        fixunlockpos.Enabled = false;
        fixunlockpos.Checked = false;

        alt.clearEveryTick(u);
        stopfixCheckpointToPlayerUnlock();

        if (new_place.blip_pos != null) {
          alt.setTimeout(() => {
            drawCheckpointUnlock(new_place.blip_pos.x, new_place.blip_pos.y, new_place.blip_pos.z);
            unlockx.SetRightLabel(new_place.blip_pos.x)
            unlocky.SetRightLabel(new_place.blip_pos.y);
            unlockz.SetRightLabel(new_place.blip_pos.z);
          }, 20);
        }
      }
    } else if (selectedItem.Text = fixunlockpos.Text) {
      if (fixunlockpos.Checked) {
        new_place.unlock_pos = {
          x: alt.Player.local.pos.x,
          y: alt.Player.local.pos.y,
          z: alt.Player.local.pos.z
        };
        alt.clearEveryTick(u);
        unlockx.SetRightLabel(round(new_place.unlock_pos.x));
        unlocky.SetRightLabel(round(new_place.unlock_pos.y));
        unlockz.SetRightLabel(round(new_place.unlock_pos.z));
        stopfixCheckpointToPlayerUnlock();

        alt.setTimeout(() => {
          drawCheckpointUnlock(new_place.unlock_pos.x, new_place.unlock_pos.y, new_place.unlock_pos.z);
        }, 20);
      } else {
        new_place.unlock_pos = null;

        fixCheckpointToPlayerUnlock();
      }
    }
  });

  menu_unlock.AutoListChange.on((item, newListItemIndex, changeDirection) => {
    if (item.Text == unlockradius.Text) {
      new_place.unlock_radius = newListItemIndex;
      
      if (fix_c == undefined) {
        if (new_place.unlock_pos == null) {
          if (new_place.blip_pos != null) {
            drawCheckpointUnlock(new_place.unlock_pos.x, new_place.unlock_pos.y, new_place.unlock_pos.z);
          } else {
            stopfixCheckpointToPlayerUnlock();
            alt.setTimeout(() => {
              drawCheckpointUnlock(new_place.blip_pos.x, new_place.blip_pos.y, new_place.blip_pos.z);
            }, 20);
          }
        } else {
          removeCheckpointUnlock();
          drawCheckpointUnlock(new_place.unlock_pos.x, new_place.unlock_pos.y, new_place.unlock_pos.z);
        }
      } else {
        if (new_place.unlock_pos == null) {
          stopfixCheckpointToPlayerUnlock();
          alt.setTimeout(() => {
            fixCheckpointToPlayerUnlock();
          }, 20);
        } else {
          removeCheckpointUnlock();
          drawCheckpointUnlock(new_place.unlock_pos.x, new_place.unlock_pos.y, new_place.unlock_pos.z);
        }
      }
    }
  });

  // ==== BLIP
  const menu_blip = new NativeUI.Menu(title, "Blip-Optionen", new NativeUI.Point(50, 50));
  menu_blip.GetTitle().DropShadow = true;
  menu_blip.DisableInstructionalButtons(true);

  let blip_x = new NativeUI.UIMenuItem("Marker X", "Position für den Marker");
  menu_blip.AddItem(blip_x);

  let blip_y = new NativeUI.UIMenuItem("Marker Y", "Position für den Marker");
  menu_blip.AddItem(blip_y);

  let blip_z = new NativeUI.UIMenuItem("Marker Z", "Position für den Marker");
  menu_blip.AddItem(blip_z);

  let savemarkerpos = new NativeUI.UIMenuCheckboxItem("Markerposition festsetzen", false, "");
  menu_blip.AddItem(savemarkerpos);

  let blipiconitem = new NativeUI.UIMenuItem("Blip Icon", "Der Blip auf der Karte");
  blipiconitem.SetRightBadge(NativeUI.BadgeStyle.ArrowRight);
  menu_blip.AddItem(blipiconitem);

  let blipcoloritem = new NativeUI.UIMenuItem("Blip Farbe", "Die Farbe des Blips");
  blipcoloritem.SetRightBadge(NativeUI.BadgeStyle.ArrowRight);
  menu_blip.AddItem(blipcoloritem);

  let t;
  let temporary_blip;
  function updateCoords() {
    t = alt.everyTick(() => {
      blip_x.SetRightLabel(round(alt.Player.local.pos.x));
      blip_y.SetRightLabel(round(alt.Player.local.pos.y));
      blip_z.SetRightLabel(round(alt.Player.local.pos.z));
      if (temporary_blip != null) {
        native.setBlipCoords(temporary_blip, alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z);
      }
    }); 
  }
  updateCoords();

  menu_blip.CheckboxChange.on((selectedItem) => {
    if (selectedItem.Text == savemarkerpos.Text) {
      if (selectedItem.Checked) {
        new_place.blip_pos = {
          x: alt.Player.local.pos.x,
          y: alt.Player.local.pos.y,
          z: alt.Player.local.pos.z
        };
        alt.clearEveryTick(t);
        t = undefined;
        if (new_place.unlock_pos == null) {
          if (c != undefined) {
            drawCheckpointUnlock(new_place.blip_pos.x, new_place.blip_pos.y, new_place.blip_pos.z);
          }
        }
      } else {
        new_place.blip_pos = null;
        updateCoords();
        if (new_place.unlock_pos == null) {
          if (c != undefined) {
            fixCheckpointToPlayerUnlock();
          }
        }
      }
    }
  });

  menu_blip.ItemSelect.on((selectedItem, selectedItemIndex) => {
    if (selectedItem.Text == blipiconitem.Text) {
      callBlipSelect((arg) => {
        new_place.blip_icon = arg;
        let p = new_place.blip_pos == null ? alt.Player.local.pos : new_place.blip_pos;
        if (temporary_blip == undefined) {
          temporary_blip = native.addBlipForCoord(p.x, p.y, p.z);
        } else {
          native.setBlipCoords(temporary_blip, p.x, p.y, p.z);
        }
        native.setBlipSprite(temporary_blip, new_place.blip_icon);
        if (new_place.blip_color != undefined) {
          native.setBlipColour(temporary_blip, new_place.blip_color);
        }
      });
    } else if (selectedItem.Text == blipcoloritem.Text) {
      callBlipColorSelect((arg) => {
        new_place.blip_color = arg;
        let p = new_place.blip_pos == null ? alt.Player.local.pos : new_place.blip_pos;
        if (temporary_blip == undefined) {
          temporary_blip = native.addBlipForCoord(p.x, p.y, p.z);
        } else {
          native.setBlipCoords(temporary_blip, p.x, p.y, p.z);
        }
        native.setBlipColour(temporary_blip, new_place.blip_color);
      });
    }
  });

  // ==== INTERAKTION
  let interact_checkpoint, fix_interact;

  function drawCheckpointInteract(x, y, z) {
    if (interact_checkpoint != undefined) {
      native.deleteCheckpoint(interact_checkpoint);
    }
    interact_checkpoint = native.createCheckpoint(47, x, y, z-1.1, null, null, null, new_place.interact_radius, color.interaction.r, color.interaction.g, color.interaction.b, 255, 181);
    native.setCheckpointCylinderHeight(interact_checkpoint, 3, 3, new_place.unlock_radius);
  }

  function removeCheckpointInteract() {
    native.deleteCheckpoint(interact_checkpoint);
    interact_checkpoint = undefined;
  }

  function fixCheckpointToPlayerInteract() {
    if (fix_interact == undefined) {
      fix_interact = alt.everyTick(() => {
        drawCheckpointInteract(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z);
      });
    } else {
      alt.logError("HALT STOPP!");
    }
  }

  function stopfixCheckpointToPlayerInteract() {
    alt.clearEveryTick(fix_interact);
    fix_interact = undefined;
    alt.setTimeout(() => {
      removeCheckpointInteract();
    }, 10);
  }

  const menu_interaction = new NativeUI.Menu(title, "Interaktions-Optionen", new NativeUI.Point(50, 50));
  menu_interaction.GetTitle().DropShadow = true;
  menu_interaction.DisableInstructionalButtons(true);

  let interactradius = new NativeUI.UIMenuAutoListItem("Radius der Interaktion", "Radius der Interaktion.", 2, 10, new_place.interact_radius);
  menu_interaction.AddItem(interactradius);

  let interact_x = new NativeUI.UIMenuItem("Interaktions-X", "Position für die Interaktion");
  menu_interaction.AddItem(interact_x);

  let interact_y = new NativeUI.UIMenuItem("Interaktions-Y", "Position für die Interaktion");
  menu_interaction.AddItem(interact_y);

  let interact_z = new NativeUI.UIMenuItem("Interaktions-Z", "Position für die Interaktion");
  menu_interaction.AddItem(interact_z);

  let interact_save = new NativeUI.UIMenuCheckboxItem("Interaktionsposition festsetzen", false, "");
  menu_interaction.AddItem(interact_save);

  let interact_fn = new NativeUI.UIMenuItem("Funktion", "Funktion benennen, die gespeichert werden soll. Kann leer bleiben, dann wird ein zufälliger Name vergeben.");
  interact_fn.SetRightBadge(NativeUI.BadgeStyle.ArrowRight);
  menu_interaction.AddItem(interact_fn);

  let interact_xyz;
  function updateCoordsInteraction() {
    interact_xyz = alt.everyTick(() => {
      interact_x.SetRightLabel(round(alt.Player.local.pos.x));
      interact_y.SetRightLabel(round(alt.Player.local.pos.y));
      interact_z.SetRightLabel(round(alt.Player.local.pos.z));
    }); 
  }
  updateCoordsInteraction();

  menu_interaction.ItemSelect.on((selectedItem, selectedItemIndex) => {
    if (selectedItem.Text == interact_fn.Text) {
      callInput("Funktion", (arg) => {
        new_place.function = arg;
        interact_fn.Description = arg;
      });
    }
  });

  menu_interaction.MenuOpen.on(() => {
    if (new_place.interact_pos == null) {
      fixCheckpointToPlayerInteract();
      updateCoordsInteraction();
    } else {
      drawCheckpointInteract(new_place.interact_pos.x, new_place.interact_pos.y, new_place.interact_pos.z);
    }
  });

  menu_interaction.CheckboxChange.on((selectedItem) => {
    if (selectedItem.Text == interact_save.Text) {
      if (selectedItem.Checked) {
        new_place.interact_pos = {
          x: alt.Player.local.pos.x,
          y: alt.Player.local.pos.y,
          z: alt.Player.local.pos.z
        };
        alt.clearEveryTick(interact_xyz);
        interact_xyz = undefined;
        stopfixCheckpointToPlayerInteract();
        alt.setTimeout(() => {
          drawCheckpointInteract(new_place.interact_pos.x, new_place.interact_pos.y, new_place.interact_pos.z);
        }, 20);
      } else {
        new_place.interact_pos = null;
        updateCoordsInteraction();
        fixCheckpointToPlayerInteract();
      }
    }
  });

  menu_interaction.AutoListChange.on((item, newListItemIndex, changeDirection) => {
    if (item.Text == interactradius.Text) {
      new_place.interact_radius = newListItemIndex;
      if (new_place.interact_pos != null) {
        removeCheckpointInteract();
        drawCheckpointInteract(new_place.interact_pos.x, new_place.interact_pos.y, new_place.interact_pos.z);
      }
    }
  });

  function verifyContinue() {
    if (new_place.displayname != null &&
      new_place.blip_pos != null &&
      new_place.blip_icon != null &&
      new_place.interact_pos != null) {
        saveNewPlace_item.Enabled = true;
    }
  }

  menu.ItemSelect.on((selectedItem, selectedItemIndex) => {
    if (selectedItem.Text == titleitem.Text) {
      callInput("Titel", (arg) => {
        new_place.displayname = arg;
        titleitem.Description = arg;
        verifyContinue();
      });
    } else if (selectedItem.Text == subtitleitem.Text) {
      callInput("Beschreibung", (arg) => {
        new_place.description = arg;
        subtitleitem.Description = arg;
        verifyContinue();
      });
    } else if (selectedItem.Text == saveNewPlace_item.Text) {
      if (new_place.function == null) {
        new_place.function = randomFunction();
      }
      alt.emitServer("a_saveNewPlace", new_place);
    }
  });
  
  menu.AddSubMenu(menu_blip, menu_blip_item);
  menu.AddSubMenu(menu_unlock, menu_unlock_item);
  menu.AddSubMenu(menu_interaction, menu_interaction_item);

  menu.MenuClose.on(() => {
    menu.CloseableByUser = false;
    
    if (c != undefined) removeCheckpointUnlock();
    if (interact_checkpoint != undefined) removeCheckpointInteract();

    //Stehen lassen wenn gespeichert
    native.removeBlip(temporary_blip);
    temporary_blip == undefined;
  });
  menu.MenuOpen.on(() => {
    verifyContinue();
    alt.setTimeout(() => {
      menu.CloseableByUser = true;
    }, 500);
  });

  menu.Open();

/*
  if (menu.Visible) {
    menu.Close();
  } else {
  }
  */
}

function callInput(title, callbackReturn) {
  let v = new alt.WebView("http://resource/client/pages/input.html", true);
  alt.toggleGameControls(false);
  v.focus();
  v.on("load", () => {
    v.emit("a_input_settitle", title);
  });
  v.on("a_input_return", (arg) => {
    callbackReturn(arg);
    v.destroy();
    alt.setTimeout(() => {
      alt.toggleGameControls(true);
    }, 250);
  });
}

function callBlipSelect(callback) {
  openWebView("blipselector/blipselect.html", "a_selectedblip", callback);
}

function callBlipColorSelect(callback) {
  openWebView("blipselector/colorselect.html", "a_selectedcolor", callback);
}

function openWebView(url, event, callback) {
  let v = new alt.WebView("http://resource/client/pages/" + url, true);
  alt.toggleGameControls(false);
  alt.showCursor(true);
  v.focus();
  v.on(event, (arg) => {
    callback(arg);
    v.destroy();
    alt.setTimeout(() => {
      alt.toggleGameControls(true);
      alt.showCursor(false);
    }, 250);
  });
}


/*

command
-> colshapecircle mit checkpoint für entsperrung (grün)
-> colshapecircle mit checkpoint für interaktionen (blau)

-> speichern

*/

function round(arg0) {
  let j = JSON.stringify(arg0);
  let a = j.split(".");
  return a[1] == undefined ? a[0] : a[0] + "." + a[1].substr(0, 2);
}

function randomFunction() {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz',
    serialLengthAlphabet = 12,
    randomSerialAlphabet = "",
    i,
    randomNumber;

  for (i = 0; i < serialLengthAlphabet; i++) {
    randomNumber = Math.floor(Math.random() * alphabet.length);
    randomSerialAlphabet += alphabet.substring(randomNumber, randomNumber + 1);
  }

  return randomSerialAlphabet;
}

export function saveSuccess(result) {
  NativeUI.BigMessage.ShowMpMessageLarge("Gespeichert", JSON.stringify(result), 5000);
  menu.Close();
}

export function enteredColshape(colshapeMeta) {
  if (colshapeMeta != null) {

    if (colshapeMeta.type == "interaction") {
      NativeUI.BigMessage.ShowMissionPassedMessage("INTERAKTION", "Drück E blyat");

      //TODO: Add Button Message


    } else if (colshapeMeta.type = "unlock") {
      let unlocked_places;
      if (alt.getMeta("unlocked_places") === "[]") {
        unlocked_places = [];
      } else {
        unlocked_places = JSON.parse(alt.getMeta("unlocked_places"));
      }
      //alt.log("unlocked_places" + alt.getMeta("unlocked_places"));
      if (unlocked_places.includes(colshapeMeta.id)) {
        alt.logWarning("Contains");
      } else {
        unlocked_places.push(colshapeMeta.id);
        alt.setMeta("unlocked_places", JSON.stringify(unlocked_places));
        alt.log("places: " + alt.getMeta("unlocked_places"));
        alt.log("placesJSON: " + JSON.stringify(alt.getMeta("unlocked_places")));
  
        let bpos = JSON.parse(colshapeMeta.blip_pos);
  
        var b = native.addBlipForCoord(bpos.x, bpos.y, bpos.z);
        native.setBlipSprite(b, colshapeMeta.blip_icon);
        if (colshapeMeta.blip_color != null) {
          native.setBlipColour(b, colshapeMeta.blip_color);
          native.setBlipRouteColour(b, colshapeMeta.blip_color); //FIXME: Does not work on Player-Set-Waypoints
        }
        native.setBlipFlashes(b, true);
        alt.setTimeout(() => {
          native.setBlipFlashes(b, false);
        }, 5000);
  
        msg.displayAdvancedNotification(colshapeMeta.description, colshapeMeta.displayname, "Neuen Ort gefunden."); //FIXME: Nicht advanced
  
        alt.emitServer("a_updatePlacesForPlayer", unlocked_places);
        alt.log(unlocked_places);
      }
      //alt.log("entered colshape: " + JSON.stringify(colshapeMeta));
    } else {
      alt.logError("[31LB] Type not found");
    }
  } else {
    alt.logError("Entered null-colshape");
  }
}

export function createGlobalBlip(element) {
  let bpos = JSON.parse(element.blip_pos);
  var b = native.addBlipForCoord(bpos.x, bpos.y, bpos.z);
  native.setBlipSprite(b, element.blip_icon);
  if (element.blip_color != null) {
    native.setBlipColour(b, element.blip_color);
    native.setBlipRouteColour(b, element.blip_color);
  }
}