/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

var opened = false;
var timer;

export function toggleInfoHud() {
  //TODO: Add Money and other Stats
  if (opened) {
    alt.clearEveryTick(timer);

  } else {
    timer = alt.everyTick(() => {
      native.setBigmapActive(true, true);
    });

    alt.setTimeout(() => {
      alt.clearEveryTick(timer);
    }, 4500);
  }
}