"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alt = require("alt");
const natives_1 = require("natives");
const Color_1 = require("../utils/Color");
const Screen_1 = require("../utils/Screen");
class Sprite {
    constructor(textureDict, textureName, pos, size, heading = 0, color = new Color_1.default(255, 255, 255)) {
        this.TextureDict = textureDict;
        this.TextureName = textureName;
        this.Pos = pos;
        this.Size = size;
        this.Heading = heading;
        this.Color = color;
        this.Visible = true;
    }
    LoadTextureDictionary() {
        this.requestTextureDictPromise(this._textureDict).then((succ) => { });
    }
    requestTextureDictPromise(textureDict) {
        return new Promise((resolve, reject) => {
            natives_1.default.requestStreamedTextureDict(textureDict, true);
            let inter = alt.setInterval(() => {
                if (natives_1.default.hasStreamedTextureDictLoaded(textureDict)) {
                    alt.clearInterval(inter);
                    return resolve(true);
                }
            }, 10);
        });
    }
    set TextureDict(v) {
        this._textureDict = v;
        if (!this.IsTextureDictionaryLoaded)
            this.LoadTextureDictionary();
    }
    get TextureDict() {
        return this._textureDict;
    }
    get IsTextureDictionaryLoaded() {
        return natives_1.default.hasStreamedTextureDictLoaded(this._textureDict);
    }
    Draw(textureDictionary, textureName, pos, size, heading, color, loadTexture) {
        textureDictionary = textureDictionary || this.TextureDict;
        textureName = textureName || this.TextureName;
        pos = pos || this.Pos;
        size = size || this.Size;
        heading = heading || this.Heading;
        color = color || this.Color;
        loadTexture = loadTexture || true;
        if (loadTexture) {
            if (!natives_1.default.hasStreamedTextureDictLoaded(textureDictionary))
                natives_1.default.requestStreamedTextureDict(textureDictionary, true);
        }
        const screenw = Screen_1.default.Width;
        const screenh = Screen_1.default.Height;
        const height = 1080.0;
        const ratio = screenw / screenh;
        const width = height * ratio;
        const w = this.Size.Width / width;
        const h = this.Size.Height / height;
        const x = this.Pos.X / width + w * 0.5;
        const y = this.Pos.Y / height + h * 0.5;
        natives_1.default.drawSprite(textureDictionary, textureName, x, y, w, h, heading, color.R, color.G, color.B, color.A, true);
    }
}
exports.default = Sprite;
//# sourceMappingURL=Sprite.js.map