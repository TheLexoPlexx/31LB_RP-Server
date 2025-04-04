/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

let rName = "31lb_core";

alt.on("resourceStart", (boolean) => {
  alt.setSyncedMeta("restarted", false);
})

alt.on("a_restart_rp", () => {
  alt.restartResource(rName);
  alt.setSyncedMeta("restarted", true);
});

alt.on("a_stop_rp", () => {
  alt.stopResource(rName);
});