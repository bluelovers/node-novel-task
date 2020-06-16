import path from 'upath2';
import { cosmiconfig, cosmiconfigSync } from 'cosmiconfig';
import { IConfig, MODULE_NAME } from '../index';
import fs from 'fs-extra';
import { existsSync } from 'fs';
import { resolve } from 'upath2';
import console from 'debug-color2';

export function loadMainConfig(cwd?: string)
{
	return loadConfig<IConfig>(MODULE_NAME, {
		searchPlaces: [
			`${MODULE_NAME}.config.local.js`,
			`${MODULE_NAME}.config.js`,
		],
		cwd,
	});
}

export function loadCacheConfig(cwd?: string)
{
	let bool = existsSync(resolve(cwd, './.cache'));

	console.log(`cwd`, cwd);

	let bool2 = existsSync(resolve(cwd, './.cache/.cache.json'));

	console.log(`loadCacheConfig`, `cwd exists:${bool}`, `file exists:${bool2}`);

	return loadConfig<{
		last: string | number,
		last_from?: string | number,
		done?: number,

		last_push_head?: string,

	}>('cache', {
		cwd: resolve(cwd, './.cache'),
		stopDir: resolve(cwd, './.cache'),
		searchPlaces: [
			`.cache.json`,
		],
	});
}

export function transform(result)
{
	if (result)
	{
		result.filepath = resolve(result.filepath);

		if (result.config && result.config.default && Object.keys(result.config).length == 1)
		{
			result.config = result.config.default;
		}
	}

	return result;
}

export function loadConfig<T>(name: string, options?): {
	config: T,
	filepath: string,
	isEmpty?: boolean,
}
{
	options = Object.assign({
		transform,
	}, options);

	let result = cosmiconfigSync(name, options).search(options.cwd);

	return result;
}

export default loadConfig
