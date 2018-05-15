"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("upath2");
const cosmiconfig = require("cosmiconfig");
function transform(result) {
    if (result) {
        result.filepath = path.resolve(result.filepath);
        if (result.config && result.config.default && Object.keys(result.config).length == 1) {
            result.config = result.config.default;
        }
    }
    return result;
}
exports.transform = transform;
function loadConfig(name, options) {
    options = Object.assign({
        transform,
    }, options);
    let result = cosmiconfig(name, options).searchSync(options.cwd);
    return result;
}
exports.loadConfig = loadConfig;
exports.default = loadConfig;
