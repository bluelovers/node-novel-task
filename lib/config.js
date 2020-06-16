"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = exports.transform = exports.loadCacheConfig = exports.loadMainConfig = void 0;
const cosmiconfig_1 = require("cosmiconfig");
const index_1 = require("../index");
const fs_1 = require("fs");
const upath2_1 = require("upath2");
const debug_color2_1 = __importDefault(require("debug-color2"));
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
function loadCacheConfig(cwd) {
    let bool = fs_1.existsSync(upath2_1.resolve(cwd, './.cache'));
    debug_color2_1.default.log(`cwd`, cwd);
    let bool2 = fs_1.existsSync(upath2_1.resolve(cwd, './.cache/.cache.json'));
    debug_color2_1.default.log(`loadCacheConfig`, `cwd exists:${bool}`, `file exists:${bool2}`);
    return loadConfig('cache', {
        cwd: upath2_1.resolve(cwd, './.cache'),
        stopDir: upath2_1.resolve(cwd, './.cache'),
        searchPlaces: [
            `.cache.json`,
        ],
    });
}
exports.loadCacheConfig = loadCacheConfig;
function transform(result) {
    if (result) {
        result.filepath = upath2_1.resolve(result.filepath);
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
    let result = cosmiconfig_1.cosmiconfigSync(name, options).search(options.cwd);
    return result;
}
exports.loadConfig = loadConfig;
exports.default = loadConfig;
//# sourceMappingURL=config.js.map