import * as alt from 'alt-client';
import * as native from 'natives';
let invData = {
    int: null,
    ext: null,
};
let open = false, viewmode, cam, disableControlLoop, inventoryview;
let transitiontime = 500;
export function toggleInventory(forceClose) {
    if (forceClose) {
        if (open) {
            closeInventory();
        }
    }
    else {
        if (!open) {
            openInventory();
        }
        else {
            closeInventory();
        }
    }
}
function openInventory() {
    open = true;
    viewmode = native.getFollowPedCamViewMode();
    disableControlLoop = alt.everyTick(() => {
        native.disableAllControlActions(alt.Player.local.scriptID);
    });
    if (alt.Player.local.vehicle == undefined) {
        var pt = alt.Player.local.pos;
        var rtz = alt.Player.local.rot.z;
        var rot_neu = (rtz + Math.PI) * 180 / Math.PI;
        if (rot_neu < 0) {
            rot_neu += 360;
        }
        var b = 0.75;
        var c = 2.5;
        var cam_x = pt.x + b * -Math.sin(rtz + Math.PI * 0.5) + c * Math.cos(rtz + Math.PI * 0.5);
        var cam_y = pt.y + b * Math.cos(rtz + Math.PI * 0.5) + c * Math.sin(rtz + Math.PI * 0.5);
        cam = native.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", cam_x, cam_y, pt.z + 0, 0, 0, rot_neu, 50, true, 2);
        native.setCamAffectsAiming(cam, false);
        native.clearPedAlternateWalkAnim(alt.Player.local.scriptID, 0);
        native.freezeEntityPosition(alt.Player.local.scriptID, true);
        native.renderScriptCams(true, true, transitiontime, true, true, cam);
    }
    alt.showCursor(true);
    inventoryview = new alt.WebView("http://resource/client/pages/inventory/inv.html?inv=" + encodeURIComponent(JSON.stringify(invData)), true);
    inventoryview.on("load", () => {
        inventoryview.emit("makeVisible");
        inventoryview.emit("inventorydata", invData);
    });
}
function closeInventory() {
    open = false;
    viewmode = undefined;
    alt.clearEveryTick(disableControlLoop);
    native.destroyCam(cam, true);
    native.renderScriptCams(false, true, transitiontime, true, true, 0);
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
    native.setFollowPedCamViewMode(viewmode);
    inventoryview.destroy();
    alt.showCursor(false);
}
function getClothes() {
    let holder = [];
    for (var i = 0; i <= 11; i++) {
        let c = alt.getSyncedMeta("inventory_" + i);
        if (c != undefined) {
            holder.push(c);
        }
    }
    if (holder.length == 0) {
        alt.logWarning("Inventory empty");
    }
    return holder;
}
