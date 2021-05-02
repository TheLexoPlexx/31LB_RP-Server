//Async webview laod: https://discord.com/channels/371265202378899476/583109900024938527/584744804613881856

/* Snippet um rauszufinden ob ein Spieler in einem Shop ist.
const CLOTHES_SHOPS = [
    198145,
    165633,
    235265,
    137217,
    171265,
    166145,
    179713,
    140801,
    183553,
    201473,
    202497,
    169217,
    176129,
    175361,
];

let wasInShop = false;
let oldShop = 0;

alt.setInterval(() => {
    const currInterior = game.getInteriorFromEntity(alt.Player.local.scriptID);
    if (!wasInShop) {
        if (CLOTHES_SHOPS.indexOf(currInterior) != -1) {
            alt.emit("enterShop");
            oldShop = currInterior;
            wasInShop = true;
        }
    } else {
        if (currInterior != oldShop) {
            wasInShop = false;
            oldShop = 0;
            alt.emit("leaveShop");
        }
    }
}, 2000);

alt.on('enterShop', () => {
    alt.log("In Shop");
});

alt.on('leaveShop', () => {
    alt.log("Out Shop");
});
*/

/*

Simeon IPL
alt.requestIpl('shr_int');
game.activateInteriorEntitySet(game.getInteriorAtCoordsWithType(-38.62, -1099.01, 27.31, 'v_carshowroom'), 'csr_beforeMission');
game.activateInteriorEntitySet(game.getInteriorAtCoordsWithType(-38.62, -1099.01, 27.31, 'v_carshowroom'), 'shutter_closed');

*/