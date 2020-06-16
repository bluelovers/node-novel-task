#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const upath2_1 = __importDefault(require("upath2"));
const index_1 = require("../index");
const config_1 = require("../lib/config");
const __1 = require("..");
const fast_glob_1 = __importDefault(require("@bluelovers/fast-glob"));
const cross_spawn_extra_1 = __importDefault(require("cross-spawn-extra"));
const log_1 = __importDefault(require("../lib/log"));
(async () => {
    var _a, _b, _c;
    let CWD = process.cwd();
    log_1.default.log(`CWD`, CWD);
    const result = config_1.loadMainConfig(CWD);
    if (!result) {
        throw new Error(`無法找到 config`);
    }
    log_1.default.info(`找到 config 位於 ${result.filepath}`);
    //	console.dir(result, {
    //		depth: 4,
    //	});
    let cache = config_1.loadCacheConfig(CWD);
    let IS_INIT = false;
    log_1.default.dir(cache);
    if (!cache || ((_b = (_a = result.config) === null || _a === void 0 ? void 0 : _a.debug) === null || _b === void 0 ? void 0 : _b.init)) {
        cache = {
            config: {
                last: 10,
            },
            filepath: upath2_1.default.resolve(CWD, './.cache', '.cache.json'),
        };
        IS_INIT = true;
        log_1.default.warn(`本次為初始化任務，將分析最近 ${cache.config.last} 次紀錄`);
    }
    else if ((_c = result.config.debug) === null || _c === void 0 ? void 0 : _c.last) {
        cache.config.last = result.config.debug.last;
        log_1.default.debug('[DEBUG]', `由上次紀錄 ${cache.config.last} 之後 開始檢查`);
    }
    else {
        log_1.default.debug(`由上次紀錄 ${cache.config.last} 之後 開始檢查`);
    }
    if (cache.config.last_push_head) {
        try {
            let cp = cross_spawn_extra_1.default.sync('git', [
                'branch',
                '--remotes',
                'origin/master',
                '--contains',
                cache.config.last_push_head,
            ], {
                cwd: result.config.cwd,
            }).stdout.toString().trim();
            if (cp != 'origin/master') {
                log_1.default.warn(`上次推送的分支 ${cache.config.last_push_head} 似乎未被合併`);
                log_1.default.yellow(`本次將重新由上次起始點 ${cache.config.last_from} 開始`);
                cache.config.last = cache.config.last_from;
            }
        }
        catch (e) {
        }
    }
    let data = __1.novelDiffFromLog({
        novelRoot: result.config.cwd,
        baseHash: cache.config.last,
    });
    if (1 && IS_INIT && !result.config.disableInit) {
        log_1.default.warn(`本次為初始化任務，將執行全部任務`);
        //		console.log(result);
        await fast_glob_1.default([
            '**/*.md',
            '**/*.txt',
        ], {
            cwd: result.config.cwd,
        })
            .then(ls => {
            return index_1.globToFakeList(ls);
        })
            .then(function (ret) {
            return Object.assign(data, ret);
        });
    }
    if (!result.config.nocache && data.count.novel) {
        cache.config.last = data.range.from;
        //		cache.config.last_from = data.range.from;
        cache.config.done = -1;
        fs_extra_1.writeJSONSync(cache.filepath, cache.config, {
            spaces: 2,
        });
    }
    if (Object.keys(data.list).length) {
        log_1.default.debug(`在上次的更新 ${data.range.from} 之後 有 ${data.count.novel} 小說 ${data.count.file} 檔案產生變動`);
    }
    else {
        log_1.default.warn(`在上次的更新 ${data.range.from} 之後 沒有新的變化`);
    }
    await __1.runTask(data, result, {
        init: IS_INIT,
    });
    if (!result.config.nocache && data.count.novel) {
        log_1.default.debug(data.range);
        cache.config.last = data.range.to;
        cache.config.last_from = data.range.from;
        cache.config.done = 1;
        log_1.default.dir(cache);
        fs_extra_1.writeJSONSync(cache.filepath, cache.config, {
            spaces: 2,
        });
    }
})();
//# sourceMappingURL=_novel-task.js.map