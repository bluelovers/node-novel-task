/**
 * Created by user on 2018/5/15/015.
 */

import gitDiffFrom from 'git-diff-from';
import * as cosmiconfig from 'cosmiconfig';
import * as path from 'upath2';
import * as fs from 'fs-extra';
import loadConfig from './lib/config';

export const MODULE_NAME = 'node-novel-task';

let CWD = process.cwd();

const result = loadConfig<{
	cwd: string,
}>(MODULE_NAME, {
	searchPlaces: [
		'package.json',
		`.${MODULE_NAME}rc`,
		`.${MODULE_NAME}rc.local.json`,
		`.${MODULE_NAME}rc.local.yaml`,
		`.${MODULE_NAME}rc.local.yml`,
		`${MODULE_NAME}.config.local.js`,

		`.${MODULE_NAME}rc.json`,
		`.${MODULE_NAME}rc.yaml`,
		`.${MODULE_NAME}rc.yml`,
		`${MODULE_NAME}.config.js`,
	],
	cwd: CWD,
});

if (!result)
{
	throw new Error(`無法找到 config`)
}

console.log(`找到 config 位於 ${pathRelative(result.filepath)}`);
console.dir(result, {
	depth: 4,
});

let cache = loadConfig<{
	last: string | number,
}>('cache', {
	cwd: path.resolve(CWD, './.cache'),
	stopDir: path.resolve(CWD, './.cache'),
	searchPlaces: [
		`.cache.json`,
	],
});

console.log(cache);

if (!cache)
{
	cache = {
		config: {
			last: 10 as any as string,
		},
		filepath: path.resolve(CWD, './.cache', '.cache.json'),
	};
}

let ls = gitDiffFrom(cache.config.last, {
	cwd: result.config.cwd,
});

console.log(ls);

if (ls.length)
{
	cache.config.last = ls.to;

	fs.writeJSONSync(cache.filepath, cache.config, {
		spaces: 2,
	});
}
else
{

}

function pathRelative(file: string)
{
	let s = path.relative(process.cwd(), result.filepath);

	return s;
}
