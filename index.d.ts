import { IGitDiffFromRow } from 'git-diff-from';
import loadConfig from './lib/config';
import * as Promise from 'bluebird';
export declare function pathRelative(file: string): string;
export declare type IListFileRow = IGitDiffFromRow & {
    pathMain: string;
    novelID: string;
    basename: string;
    subpath: string;
};
export declare type IListNovelRow = IListFileRow[] & {
    pathMain: string;
    novelID: string;
};
export declare type IListMainRow = {
    [key: string]: IListNovelRow;
};
export declare function novelDiffFromLog(options: {
    novelRoot: string;
    baseHash?: number | string;
}): {
    novelRoot: string;
    baseHash: string | number;
    list: {
        [key: string]: IListMainRow;
    };
    range: {
        from: string;
        to: string;
    };
    count: {
        main: number;
        novel: number;
        file: number;
    };
};
export interface IConfig {
    cwd: string;
    task?: {
        main?(data: IListMainRow, name: string): any;
        novel?(data: IListNovelRow, name: string): any;
        file?(data: IListFileRow, file: string): any;
    };
}
export declare function runTask(data: ReturnType<typeof novelDiffFromLog>, setting: ReturnType<typeof loadConfig> & {
    config: IConfig;
}): Promise<void[]>;
export default novelDiffFromLog;
