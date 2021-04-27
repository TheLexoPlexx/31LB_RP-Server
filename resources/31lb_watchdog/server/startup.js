/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

alt.on("anyResourceStop", (resourceName) => {
  if (resourceName == "31lb_testbench") {
    const playerList = alt.Player.all;
    playerList.forEach((player) => {
      player.kick("Server startet neu");
    });
  }
});