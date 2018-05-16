/**
 * Created by user on 2018/5/17/017.
 */

import { IListFileRow } from '../index';

export function filterNotDelete(files: IListFileRow[])
{
	return files.filter(function (b)
	{
		return (!b.status || b.status.indexOf('D') == -1);
	}, []);
}
