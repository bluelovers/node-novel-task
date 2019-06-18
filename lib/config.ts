import * as path from 'upath2';
import * as cosmiconfig from 'cosmiconfig';
import { IConfig, MODULE_NAME } from '../index';
import * as fs from 'fs-extra';

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
	let bool = fs.existsSync(path.resolve(cwd, './.cache'));

	console.log(`loadCacheConfig`, `exists:${bool}`);

	return loadConfig<{
		last: string | number,
		last_from?: string | number,
		done?: number,

		last_push_head?: string,

	}>('cache', {
		cwd: path.resolve(cwd, './.cache'),
		stopDir: path.resolve(cwd, './.cache'),
		searchPlaces: [
			`.cache.json`,
		],
	});
}

export function transform(result)
{
	if (result)
	{
		result.filepath = path.resolve(result.filepath);

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
}
{
	options = Object.assign({
		transform,
	}, options);

	let result = cosmiconfig(name, options).searchSync(options.cwd);

	return result;
}

export default loadConfig
