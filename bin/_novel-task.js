#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("upath2");
const config_1 = require("../lib/config");
const __1 = require("..");
exports.MODULE_NAME = 'node-novel-task';
(async () => {
    let CWD = process.cwd();
    const result = config_1.default(exports.MODULE_NAME, {
        searchPlaces: [
            `${exports.MODULE_NAME}.config.local.js`,
            `${exports.MODULE_NAME}.config.js`,
        ],
        cwd: CWD,
    });
    if (!result) {
        throw new Error(`無法找到 config`);
    }
    console.log(`找到 config 位於 ${result.filepath}`);
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
    if (!cache) {
        cache = {
            config: {
                last: 10,
            },
            filepath: path.resolve(CWD, './.cache', '.cache.json'),
        };
    }
    else {
        console.log(`由上次紀錄 ${cache.config.last} 之後 開始檢查`);
    }
    let data = __1.novelDiffFromLog({
        novelRoot: result.config.cwd,
        baseHash: cache.config.last,
    });
    if (Object.keys(data.list).length) {
        console.log(`在上次的更新 ${data.range.from} 之後 有 ${data.count.novel} 小說 ${data.count.file} 檔案產生變動`);
        await __1.runTask(data, result);
    }
    else {
        console.log(`在上次的更新 ${data.range.from} 之後 沒有新的變化`);
    }
    if (0 && data.count.novel) {
        cache.config.last = data.range.to;
        fs.writeJSONSync(cache.filepath, cache.config, {
            spaces: 2,
        });
    }
})();