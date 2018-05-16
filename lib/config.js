"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("upath2");
const cosmiconfig = require("cosmiconfig");
const index_1 = require("../index");
function loadMainConfig(cwd) {
    return loadConfig(index_1.MODULE_NAME, {
        searchPlaces: [
            `${index_1.MODULE_NAME}.config.local.js`,
            `${index_1.MODULE_NAME}.config.js`,
        ],
        cwd,
    });
}
exports.loadMainConfig = loadMainConfig;
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
