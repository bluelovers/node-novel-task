/**
 * Created by user on 2018/5/15/015.
 */

import gitDiffFrom, { IGitDiffFromRow } from 'git-diff-from';
import * as cosmiconfig from 'cosmiconfig';
import * as path from 'upath2';
import * as fs from 'fs-extra';
import loadConfig from './lib/config';
import * as Promise from 'bluebird';

export const MODULE_NAME = 'node-novel-task';

export function pathRelative(file: string)
{
	let s = path.relative(process.cwd(), file);

	return s;
}

export type IListFileRow = IGitDiffFromRow & {
	pathMain: string,
	novelID: string,
	basename: string,
	subpath: string,
}

export type IListNovelRow = IListFileRow[] & {
	pathMain: string,
	novelID: string,
}

export type IListMainRow = {
	[key: string]: IListNovelRow,
}

export function globToFakeList(list: string[])
{
	let ret = {
		list: {} as {
			[key: string]: IListMainRow,
		},
		count: {
			main: 0,
			novel: 0,
			file: 0,
		},
	};

	ret.list = list.reduce(function (a, value)
	{
		let s = value.split(/[\\\/]/);

		if (s.length > 3)
		{
			let pathMain = s[0];
			let novelID = s[1];

			let basename = s[s.length - 1];

			let subpath = s.slice(2).join('/');

			if (!a[pathMain])
			{
				ret.count.main++;
			}

			a[pathMain] = a[pathMain] || {};

			if (!a[pathMain][novelID])
			{
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

export function novelDiffFromLog(options: {
	novelRoot: string,
	baseHash?: number | string,
})
{
	let ls = gitDiffFrom(options.baseHash, 'origin/master', {
		cwd: options.novelRoot,
	});

	let ret = {
		novelRoot: options.novelRoot,
		baseHash: options.baseHash,
		list: {} as {
			[key: string]: IListMainRow,
		},

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

	if (ls.length)
	{
		ret.list = ls.reduce(function (a, value)
		{
			let s = value.path.split(/[\\\/]/);

			if (s.length > 2)
			{
				let pathMain = s[0];
				let novelID = s[1];

				let basename = s[s.length - 1];

				let subpath = s.slice(2).join('/');

				if (!a[pathMain])
				{
					ret.count.main++;
				}

				a[pathMain] = a[pathMain] || {};

				if (!a[pathMain][novelID])
				{
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

export interface ITemp
{
	init?: boolean,
}

export interface IConfig
{
	cwd: string,
	task?: {
		main?(data: IListMainRow, name: string, temp?: ITemp);
		novel?(data: IListNovelRow, name: string, temp?: ITemp);
		file?(data: IListFileRow, file: string, temp?: ITemp);
		before_end?(data: ReturnType<typeof novelDiffFromLog>, ls_map: any[], temp?: ITemp);
	},
	debug?: {
		no_push?: boolean,
		init?: boolean,
		last?: string | number,
	},
	nocache?: boolean,
	disableInit?: boolean,
}

export { loadConfig }

export function runTask(data: ReturnType<typeof novelDiffFromLog>, setting: ReturnType<typeof loadConfig> & {
	config: IConfig,
}, temp: ITemp = {})
{
	return Promise.resolve(Promise
		.mapSeries(Object.keys(data.list), async function (main)
		{
			await Promise.mapSeries(Object.keys(data.list[main]), async function (novel)
			{
				if (setting.config.task.file)
				{
					await Promise.mapSeries(data.list[main][novel], async function (file)
					{
						return setting.config.task.file(file, file.fullpath, temp);
					});
				}

				if (setting.config.task.novel)
				{
					await setting.config.task.novel(data.list[main][novel], novel, temp);
				}
			});

			if (setting.config.task.main)
			{
				await setting.config.task.main(data.list[main] as IListMainRow, main, temp);
			}
		}))
		.then(function (ls_map)
		{
			return { data, ls_map };
		})
		.tap(async function ({ data, ls_map })
		{
			if (setting.config.task.before_end)
			{
				await setting.config.task.before_end(data, ls_map, temp);
			}
		})
		;
}

export default novelDiffFromLog
