/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import game from 'natives';

var dead = false;
var gettingdamage;
var wasted;
var url = "http://resource/client/pages/wasted.html";

//Keine Ahnung wofür das gut ist, ist aus Freeroam-Resource geklaut
game.setPedDefaultComponentVariation(game.playerPedId());

alt.onServer("a_connect", () => {
});

alt.onServer('a_death', () => {
  if (gettingdamage != null) {
    alt.clearTimeout(gettingdamage);
  }
  wasted = new alt.WebView(url);
  native.setTimecycleModifier("MP_DEATH_GRADE_BLEND01");
  dead = true;
  wasted.focus();
});

alt.onServer('a_damage', (attacker, damage, weaponHash) => {
  native.setTimecycleModifier("DAMAGE");
  native.setTimecycleModifierStrength(0.6);

  if (gettingdamage != null || dead) {
    alt.clearTimeout(gettingdamage);
  }
  gettingdamage = alt.setTimeout(() => {
    native.setTimecycleModifier("DEFAULT");
    native.setTimecycleModifierStrength(1);
  }, 550);
});

alt.onServer('a_alive', () => {
  native.setTimecycleModifier("DEFAULT");
  dead = false;
  if (wasted != null) {
    wasted.destroy();
  }
});

alt.on("keyup", (key) => {
  if (key == 115) {
    alt.emitServer("a_teleport", alt.player);

    /*
    game.requestIpl("apa_v_mp_h_01_b");
    alt.player.rot = new alt.Vector3(0, 3.1415, 0);
    */
  }
});

alt.on("disconnect", () => {
  console.log("[Event]: a_disconnect");
  alt.emitServer("a_disconnect", alt.player);
});

alt.on("consoleCommand", (name, ...args) => {
  if (name == "login") {
    if (args.length < 1) {
      alt.logError("Password missing");
    } else if (args.length == 1) {
      alt.emitServer("a_login", alt.player, args[0]);
    } else {
      alt.logError("Too many Args");
    }
  } else {
    alt.logError("Not a valid command");
  }
});