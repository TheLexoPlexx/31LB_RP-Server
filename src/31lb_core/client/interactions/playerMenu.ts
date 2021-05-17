/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
/// <reference types="@types/sortablejs" />
import * as alt from 'alt-client';
import * as native from 'natives';
import { drawSubtitle } from '../util/messenger';
import * as NativeUI from "../util/nativeui/NativeUi"

export function togglePlayerMenu() {
  //Oder alt.Player.local.getSyncedMeta("name") als title
  let menu = new NativeUI.Menu("Spieler-Menü", "", new NativeUI.Point(50, 50));
  //menu.GetSpriteBanner().Color(new NativeUI.Color()) //TODO: Add Rank Colors
  menu.GetTitle().DropShadow = true;
  menu.DisableInstructionalButtons(true);

  let onduty = alt.Player.local.getSyncedMeta("team_onduty");

  let supportitem = new NativeUI.UIMenuItem("", "");
  if (onduty) {
    supportitem.Text = "Support-Anfragen bearbeiten";
  } else {
    supportitem.Text = "Support-Anfrage stellen";
  }
  menu.AddItem(supportitem);

  let teamloginitem = new NativeUI.UIMenuItem("", "");
  if (alt.Player.local.getSyncedMeta("permissions") >= 30) {
    if (onduty) {
      teamloginitem.Description = "Team-Logoff";
      teamloginitem.Description = "Als Team-Mitglied ausloggen";
      teamloginitem.SetRightBadge(NativeUI.BadgeStyle.Lock);
    } else {
      teamloginitem.Description = "Team-Login";
      teamloginitem.Description = "Als Team-Mitglied einloggen";
    }
    menu.AddItem(teamloginitem);
  }

  let logoffitem = new NativeUI.UIMenuItem("Notfall-Ausloggen", "Falls du dich ausloggen musst in einer RP-Situation.");
  logoffitem.SetLeftBadge(NativeUI.BadgeStyle.Alert);
  menu.AddItem(logoffitem);

  menu.ItemSelect.on((selectedItem, selectedItemIndex) => {
    if (selectedItem.Text == teamloginitem.Text) {
      if (onduty) {
        alt.emitServer("a_teamlogoff");
      } else {
        alt.emitServer("a_teamlogin");
      }
      menu.Close();
    } else if (selectedItem.Text == supportitem.Text) {
      if (onduty) {
        drawSubtitle("//TODO: Hier muss noch eine Webseite geöffnet werden", 2500);
      } else {
        drawSubtitle("//TODO: Hier muss noch eine Webseite geöffnet werden", 2500);
      }
    }
  });

  if (menu.Visible) {
    alt.logError("Close");
    menu.Close();
  } else {
    menu.Open();
  }
}