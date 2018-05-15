"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
let cwd;
if (fs.existsSync(path.join(process.cwd(), 'dist_novel'))) {
    cwd = path.join(process.cwd(), 'dist_novel');
}
else if (fs.existsSync(path.join(__dirname, 'dist_novel'))) {
    cwd = path.join(__dirname, 'dist_novel');
}
else {
    cwd = 'D:/Users/Documents/The Project/nodejs-test/node-novel2/dist_novel';
}
console.log(`demo config`);
exports.default = {
    cwd,
    task: {
        main(data, name) {
            console.log('MAIN', name);
        },
        novel(data, name) {
            console.log('NOVEL', data.pathMain, data.novelID, data.length);
        },
        file(data, file) {
            console.log('FILE', data.subpath);
        },
    },
};
