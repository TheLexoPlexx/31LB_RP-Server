import * as NativeUI from '../util/nativeui/NativeUi';
let mainmenu;
export function openShopInteraction(cm) {
    mainmenu = new NativeUI.Menu("", cm.description, new NativeUI.Point(50, 50));
    mainmenu.GetTitle().DropShadow = true;
}
