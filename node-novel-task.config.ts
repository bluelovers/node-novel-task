/**
 * Created by user on 2018/5/15/015.
 */

import { IListFileRow, IListMainRow, IListNovelRow } from './';
import * as fs from 'fs-extra';
import * as path from 'path';

let cwd: string;

if (fs.existsSync(path.join(process.cwd(), 'dist_novel')))
{
	cwd = path.join(process.cwd(), 'dist_novel');
}
else if (0 && fs.existsSync(path.join(__dirname, 'dist_novel')))
{
	cwd = path.join(__dirname, 'dist_novel');
}
else
{
	cwd = 'D:/Users/Documents/The Project/nodejs-test/node-novel2/dist_novel';
}

console.log(`demo config`);

/**
 * 此處不使用 exports.default 直接使用 exports 也可以
 * 讀取時會自動判斷
 * 但注意在使用 export default 時 不要 export 其他項目
 */
export default {
	cwd,

	task: {
		main(data: IListMainRow, name: string)
		{
			console.log('MAIN', name);
			//console.log(data);
		},
		novel(data: IListNovelRow, name: string)
		{
			console.log('NOVEL', data.pathMain, data.novelID, data.length);
		},
		file(data: IListFileRow, file: string)
		{
			console.log('FILE', data.subpath);
			//console.log(data);
		},
	},
}
