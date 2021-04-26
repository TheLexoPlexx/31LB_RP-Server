import alt from 'alt';
import game from 'natives';

let buffer = [];

let loaded = false;
let opened = false;
let hidden = false;

let view = new alt.WebView("http://resources/chat/html/index.html");

alt.log('Hello from server');
alt.on('playerConnect', handleConnect);

/**
 * @param {alt.Player} player
 */
function handleConnect(player) {
    player.spawn(-1291.71, 83.43, 54.89, 1000); // Spawns after 1 second.
    player.model = `mp_m_freemode_01`;
}

function addMessage(name, text) {
  if (name) {
    view.emit('addMessage', name, text);
  } else {
    view.emit('addString', text);
  }
}

view.on('chatloaded', () => {
  for (const msg of buffer) {
    addMessage(msg.name, msg.text);
  }

  loaded = true;
})

view.on('chatmessage', (text) => {
  alt.emitServer('chatmessage', text);

  opened = false;
  alt.toggleGameControls(true);
})

export function pushMessage(name, text) {
  if (!loaded) {
    buffer.push({ name, text });
  } else {
    addMessage(name, text);
  }
}

export function pushLine(text) {
  pushMessage(null, text);
}

alt.onServer('chatmessage', pushMessage);

alt.on('keyup', (key) => {
  if (!loaded)
    return;

  if (!opened && key === 0x54 && alt.gameControlsEnabled()) {
    opened = true;
    view.emit('openChat', false);
    alt.toggleGameControls(false);
  }
  else if (!opened && key === 0xBF && alt.gameControlsEnabled()) {
    opened = true;
    view.emit('openChat', true);
    alt.toggleGameControls(false);
  }
  else if (opened && key == 0x1B) {
    opened = false;
    view.emit('closeChat');
    alt.toggleGameControls(true);
  }

  if (key == 0x76) {
    hidden = !hidden;
    game.displayHud(!hidden);
    game.displayRadar(!hidden);
    view.emit('hideChat', hidden);
  }
})

export default { pushMessage, pushLine };
