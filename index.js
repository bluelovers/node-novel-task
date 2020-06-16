"use strict";
/**
 * Created by user on 2018/5/15/015.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTask = exports.loadConfig = exports.novelDiffFromLog = exports.globToFakeList = exports.pathRelative = exports.MODULE_NAME = void 0;
const git_diff_from_1 = __importDefault(require("git-diff-from"));
const upath2_1 = require("upath2");
const config_1 = __importDefault(require("./lib/config"));
exports.loadConfig = config_1.default;
const bluebird_1 = __importDefault(require("bluebird"));
const debug_color2_1 = __importDefault(require("debug-color2"));
exports.MODULE_NAME = 'node-novel-task';
function pathRelative(file) {
    let s = upath2_1.relative(process.cwd(), file);
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
    debug_color2_1.default.log(ret.count);
    return ret;
}
exports.globToFakeList = globToFakeList;
function novelDiffFromLog(options) {
    let ls = git_diff_from_1.default(options.baseHash, 'origin/master', {
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
            if (s.length > 2) {
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
    return bluebird_1.default.resolve(bluebird_1.default
        .mapSeries(Object.keys(data.list), async function (main) {
        await bluebird_1.default.mapSeries(Object.keys(data.list[main]), async function (novel) {
            if (setting.config.task.file) {
                await bluebird_1.default.mapSeries(data.list[main][novel], async function (file) {
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
        .then(function (ls_map) {
        return { data, ls_map };
    })
        .tap(async function ({ data, ls_map }) {
        if (setting.config.task.before_end) {
            await setting.config.task.before_end(data, ls_map, temp);
        }
    });
}
exports.runTask = runTask;
exports.default = novelDiffFromLog;
//# sourceMappingURL=index.js.map