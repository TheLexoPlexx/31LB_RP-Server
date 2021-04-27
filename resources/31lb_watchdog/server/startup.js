/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

alt.on("resourceStop", () => {
  alt.emitAllClients("playerDisconnect", "Server Shutdown");
});