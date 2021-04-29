/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as nat from 'natives';
import * as NativeUI from "./lib/nativeui/nativeui"

export function openWeaponShop() {
  nat.setPlayerSimulateAiming(alt.Player, true);
  alt.toggleGameControls(false);

  var pt = alt.Player.local.pos;
  var rtz = alt.Player.local.rot.z;

  var rot_neu = (rtz+Math.PI*0.5) * 180/Math.PI;
  if (rot_neu < 0) {
    rot_neu += 360;
  }

  var b = -1;
  var c = 0.3;

  var cam_x = pt.x + b * -Math.sin(rtz+Math.PI*0.5) + c * Math.cos(rtz+Math.PI*0.5);
  var cam_y = pt.y + b * Math.cos(rtz+Math.PI*0.5) + c * Math.sin(rtz+Math.PI*0.5);
  
  var cam = nat.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", cam_x, cam_y, pt.z + 0.5, 0, 0, rot_neu, 50, true, 2);
  nat.setCamAffectsAiming(cam, false);
  nat.renderScriptCams(true, true, 1250, true, true, cam);

  const ui = new NativeUI.Menu("NativeUI Test", "Test Subtitle", new NativeUI.Point(50, 50));
  ui.AddItem(new NativeUI.UIMenuListItem(
      "List Item",
       "Description for List Item",
       new NativeUI.ItemsCollection(["Item 1", "Item 2", "Item 3"])
  ));
  
  ui.AddItem(new NativeUI.UIMenuSliderItem(
      "Slider Item",
       ["Fugiat", "pariatur", "consectetur", "ex", "duis", "magna", "nostrud", "et", "dolor", "laboris"],
       5,
       "Fugiat pariatur consectetur ex duis magna nostrud et dolor laboris est do pariatur amet sint.",
       true
  ));
  
  ui.AddItem(new NativeUI.UIMenuCheckboxItem(
      "Checkbox Item",
       false,
       "Fugiat pariatur consectetur ex duis magna nostrud et dolor laboris est do pariatur amet sint."
  ));
  
  ui.ItemSelect.on(item => {
      if (item instanceof NativeUI.UIMenuListItem) {
        alt.log(item.SelectedItem.DisplayText, item.SelectedItem.Data);
       } else if (item instanceof NativeUI.UIMenuSliderItem) {
         alt.log(item.Text, item.Index, item.IndexToItem(item.Index));
       } else {
         alt.log(item.Text);
       }
  });

  if (ui.Visible) {
    ui.Close();
  } else {
    ui.Open();
  }
}