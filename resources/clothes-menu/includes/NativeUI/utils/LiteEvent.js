"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LiteEvent {
    constructor() {
        this.handlers = [];
    }
    on(handler) {
        this.handlers.push(handler);
    }
    off(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    emit(...args) {
        this.handlers.slice(0).forEach(h => h(...args));
    }
    expose() {
        return this;
    }
    count() {
        return this.handlers.length;
    }
}
exports.default = LiteEvent;
//# sourceMappingURL=LiteEvent.js.map