"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alt = require("alt");
const Message_1 = require("./Message");
class MidsizedMessage extends Message_1.default {
    static Initialize(scaleForm, transitionOutAnimName) {
        super.Initialize(scaleForm, transitionOutAnimName);
        alt.everyTick(() => this.Render());
    }
    static ShowMidsizedMessage(title, message = "", time = 5000) {
        this.ShowCustomShard("SHOW_MIDSIZED_MESSAGE", time, title, message);
    }
    static ShowBridgesKnivesProgress(title, totalToDo, message, info, completed, time = 5000) {
        this.ShowCustomShard("SHOW_BRIDGES_KNIVES_PROGRESS", time, title, totalToDo, message, info, completed);
    }
    static ShowCondensedShardMessage(title, message, bgColor, useDarkerShard, time = 5000) {
        this.ShowCustomShard("SHOW_COND_SHARD_MESSAGE", time, title, message, bgColor, useDarkerShard);
    }
    static ShowMidsizedShardMessage(title, message, bgColor, useDarkerShard, useCondensedShard, time = 5000) {
        this.ShowCustomShard("SHOW_SHARD_MIDSIZED_MESSAGE", time, title, message, bgColor, useDarkerShard, useCondensedShard);
    }
}
exports.default = MidsizedMessage;
MidsizedMessage.Initialize("MIDSIZED_MESSAGE", "SHARD_ANIM_OUT");
//# sourceMappingURL=MidsizedMessage.js.map