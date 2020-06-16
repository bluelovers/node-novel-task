"use strict";
/**
 * Created by user on 2018/5/15/015.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const upath2_1 = require("upath2");
const debug_color2_1 = __importDefault(require("debug-color2"));
let cwd;
if (fs_extra_1.existsSync(upath2_1.join(process.cwd(), 'dist_novel'))) {
    cwd = upath2_1.join(process.cwd(), 'dist_novel');
}
else if (0 && fs_extra_1.existsSync(upath2_1.join(__dirname, 'dist_novel'))) {
    cwd = upath2_1.join(__dirname, 'dist_novel');
}
else {
    cwd = 'D:/Users/Documents/The Project/nodejs-test/node-novel2/dist_novel';
}
debug_color2_1.default.log(`demo config`);
/**
 * 此處不使用 exports.default 直接使用 exports 也可以
 * 讀取時會自動判斷
 * 但注意在使用 export default 時 不要 export 其他項目
 */
exports.default = {
    cwd,
    task: {
        main(data, name) {
            debug_color2_1.default.log('MAIN', name);
            //console.log(data);
        },
        novel(data, name) {
            debug_color2_1.default.log('NOVEL', data.pathMain, data.novelID, data.length);
        },
        file(data, file) {
            debug_color2_1.default.log('FILE', data.subpath);
            //console.log(data);
        },
    },
};
//# sourceMappingURL=node-novel-task.config.js.map