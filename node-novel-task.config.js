"use strict";
/**
 * Created by user on 2018/5/15/015.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
let cwd;
if (fs.existsSync(path.join(process.cwd(), 'dist_novel'))) {
    cwd = path.join(process.cwd(), 'dist_novel');
}
else if (0 && fs.existsSync(path.join(__dirname, 'dist_novel'))) {
    cwd = path.join(__dirname, 'dist_novel');
}
else {
    cwd = 'D:/Users/Documents/The Project/nodejs-test/node-novel2/dist_novel';
}
console.log(`demo config`);
/**
 * 此處不使用 exports.default 直接使用 exports 也可以
 * 讀取時會自動判斷
 * 但注意在使用 export default 時 不要 export 其他項目
 */
exports.default = {
    cwd,
    task: {
        main(data, name) {
            console.log('MAIN', name);
            //console.log(data);
        },
        novel(data, name) {
            console.log('NOVEL', data.pathMain, data.novelID, data.length);
        },
        file(data, file) {
            console.log('FILE', data.subpath);
            //console.log(data);
        },
    },
};
