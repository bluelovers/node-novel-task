"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const git_diff_from_1 = require("git-diff-from");
const path = require("upath2");
const fs = require("fs-extra");
const config_1 = require("./lib/config");
exports.MODULE_NAME = 'node-novel-task';
let CWD = process.cwd();
const result = config_1.default(exports.MODULE_NAME, {
    searchPlaces: [
        'package.json',
        `.${exports.MODULE_NAME}rc`,
        `.${exports.MODULE_NAME}rc.local.json`,
        `.${exports.MODULE_NAME}rc.local.yaml`,
        `.${exports.MODULE_NAME}rc.local.yml`,
        `${exports.MODULE_NAME}.config.local.js`,
        `.${exports.MODULE_NAME}rc.json`,
        `.${exports.MODULE_NAME}rc.yaml`,
        `.${exports.MODULE_NAME}rc.yml`,
        `${exports.MODULE_NAME}.config.js`,
    ],
    cwd: CWD,
});
if (!result) {
    throw new Error(`無法找到 config`);
}
console.log(`找到 config 位於 ${pathRelative(result.filepath)}`);
console.dir(result, {
    depth: 4,
});
let cache = config_1.default('cache', {
    cwd: path.resolve(CWD, './.cache'),
    stopDir: path.resolve(CWD, './.cache'),
    searchPlaces: [
        `.cache.json`,
    ],
});
console.log(cache);
if (!cache) {
    cache = {
        config: {
            last: 10,
        },
        filepath: path.resolve(CWD, './.cache', '.cache.json'),
    };
}
let ls = git_diff_from_1.default(cache.config.last, {
    cwd: result.config.cwd,
});
console.log(ls);
if (ls.length) {
    cache.config.last = ls.to;
    fs.writeJSONSync(cache.filepath, cache.config, {
        spaces: 2,
    });
}
else {
}
function pathRelative(file) {
    let s = path.relative(process.cwd(), result.filepath);
    return s;
}
