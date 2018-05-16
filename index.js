"use strict";
/**
 * Created by user on 2018/5/15/015.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const git_diff_from_1 = require("git-diff-from");
const path = require("upath2");
const config_1 = require("./lib/config");
exports.loadConfig = config_1.default;
const Promise = require("bluebird");
exports.MODULE_NAME = 'node-novel-task';
function pathRelative(file) {
    let s = path.relative(process.cwd(), file);
    return s;
}
exports.pathRelative = pathRelative;
function globToFakeList(list) {
    let ret = {
        list: {},
        count: {
            main: 0,
            novel: 0,
            file: 0,
        },
    };
    ret.list = list.reduce(function (a, value) {
        let s = value.split(/[\\\/]/);
        if (s.length > 3) {
            let pathMain = s[0];
            let novelID = s[1];
            let basename = s[s.length - 1];
            let subpath = s.slice(2).join('/');
            if (!a[pathMain]) {
                ret.count.main++;
            }
            a[pathMain] = a[pathMain] || {};
            if (!a[pathMain][novelID]) {
                ret.count.novel++;
            }
            a[pathMain][novelID] = a[pathMain][novelID] || [];
            Object.assign(a[pathMain][novelID], {
                pathMain,
                novelID,
            });
            a[pathMain][novelID].push(Object.assign({
                path: value,
                pathMain,
                novelID,
                basename,
                subpath,
            }));
            ret.count.file++;
        }
        return a;
    }, {});
    console.log(ret.count);
    return ret;
}
exports.globToFakeList = globToFakeList;
function novelDiffFromLog(options) {
    let ls = git_diff_from_1.default(options.baseHash, {
        cwd: options.novelRoot,
    });
    let ret = {
        novelRoot: options.novelRoot,
        baseHash: options.baseHash,
        list: {},
        range: {
            from: ls.from,
            to: ls.to,
        },
        count: {
            main: 0,
            novel: 0,
            file: 0,
        },
    };
    if (ls.length) {
        ret.list = ls.reduce(function (a, value) {
            let s = value.path.split(/[\\\/]/);
            if (s.length > 3) {
                let pathMain = s[0];
                let novelID = s[1];
                let basename = s[s.length - 1];
                let subpath = s.slice(2).join('/');
                if (!a[pathMain]) {
                    ret.count.main++;
                }
                a[pathMain] = a[pathMain] || {};
                if (!a[pathMain][novelID]) {
                    ret.count.novel++;
                }
                a[pathMain][novelID] = a[pathMain][novelID] || [];
                Object.assign(a[pathMain][novelID], {
                    pathMain,
                    novelID,
                });
                a[pathMain][novelID].push(Object.assign(value, {
                    pathMain,
                    novelID,
                    basename,
                    subpath,
                }));
                ret.count.file++;
            }
            return a;
        }, {});
    }
    return ret;
}
exports.novelDiffFromLog = novelDiffFromLog;
function runTask(data, setting, temp = {}) {
    return Promise.resolve(Promise.mapSeries(Object.keys(data.list), async function (main) {
        await Promise.mapSeries(Object.keys(data.list[main]), async function (novel) {
            if (setting.config.task.file) {
                await Promise.mapSeries(data.list[main][novel], async function (file) {
                    return setting.config.task.file(file, file.fullpath, temp);
                });
            }
            if (setting.config.task.novel) {
                await setting.config.task.novel(data.list[main][novel], novel, temp);
            }
        });
        if (setting.config.task.main) {
            await setting.config.task.main(data.list[main], main, temp);
        }
    }))
        .tap(async function () {
        if (setting.config.task.before_end) {
            await setting.config.task.before_end(temp);
        }
    });
}
exports.runTask = runTask;
exports.default = novelDiffFromLog;
