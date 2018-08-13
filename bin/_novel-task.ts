#!/usr/bin/env node

import * as fs from 'fs-extra';
import gitlog from 'gitlog2';
import * as path from 'upath2';
import { globToFakeList } from '../index';
import loadConfig, { loadCacheConfig, loadMainConfig } from '../lib/config';
import { pathRelative, novelDiffFromLog, IConfig, runTask, MODULE_NAME } from '..';
import * as Promise from 'bluebird';
import * as FastGlob from 'fast-glob';
import * as crossSpawn from 'cross-spawn';

(async () =>
{
	let CWD = process.cwd();

	console.log(CWD);

	const result = loadMainConfig(CWD);

	if (!result)
	{
		throw new Error(`無法找到 config`)
	}

	console.log(`找到 config 位於 ${result.filepath}`);
//	console.dir(result, {
//		depth: 4,
//	});

	let cache = loadCacheConfig(CWD);

	let IS_INIT = false;

	if (!cache || result.config.debug && result.config.debug.init)
	{
		cache = {
			config: {
				last: 10 as any as string,
			},
			filepath: path.resolve(CWD, './.cache', '.cache.json'),
		};

		IS_INIT = true;
	}
	else if (result.config.debug && result.config.debug.last)
	{
		cache.config.last = result.config.debug.last;

		console.log('[DEBUG]', `由上次紀錄 ${cache.config.last} 之後 開始檢查`);
	}
	else
	{
		console.log(`由上次紀錄 ${cache.config.last} 之後 開始檢查`);
	}

	if (cache.config.last_push_head)
	{
		try
		{
			let cp = crossSpawn.sync('git', [
				'branch',
				'--remotes',
				'origin/master',
				'--contains',
				cache.config.last_push_head,
			], {
				cwd: result.config.cwd,
			}).stdout.toString().trim();

			if (cp != 'origin/master')
			{
				console.warn(`上次推送的分支 ${cache.config.last_push_head} 似乎未被合併`);
				console.log(`本次將重新由上次起始點 ${cache.config.last_from} 開始`);

				cache.config.last = cache.config.last_from;
			}
		}
		catch (e)
		{

		}
	}

	let data = novelDiffFromLog({
		novelRoot: result.config.cwd,
		baseHash: cache.config.last,
	});

	if (1 && IS_INIT)
	{
		console.warn(`本次為初始化任務，將執行全部檢查`);

//		console.log(result);

		await FastGlob<string>([
			'**/*.md',
			'**/*.txt',
		], {
			cwd: result.config.cwd,
		})
			.then(ls =>
			{
				return globToFakeList(ls);
			})
			.then(function (ret)
			{
				return Object.assign(data, ret);
			})
		;
	}

	if (!result.config.nocache && data.count.novel)
	{
		cache.config.last = data.range.from;
//		cache.config.last_from = data.range.from;

		cache.config.done = -1;

		fs.writeJSONSync(cache.filepath, cache.config, {
			spaces: 2,
		});
	}

	if (Object.keys(data.list).length)
	{
		console.log(`在上次的更新 ${data.range.from} 之後 有 ${data.count.novel} 小說 ${data.count.file} 檔案產生變動`);
	}
	else
	{
		console.log(`在上次的更新 ${data.range.from} 之後 沒有新的變化`);
	}

	await runTask(data, result, {
		init: IS_INIT,
	});

	if (!result.config.nocache && data.count.novel)
	{
		console.log(data.range);

		cache.config.last = data.range.to;
		cache.config.last_from = data.range.from;

		cache.config.done = 1;

		console.dir(cache);

		fs.writeJSONSync(cache.filepath, cache.config, {
			spaces: 2,
		});
	}

})();

