import * as path from 'upath2';
import * as cosmiconfig from 'cosmiconfig';

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
