/// <reference types="bluebird" />
/**
 * Created by user on 2018/5/15/015.
 */
import { IGitDiffFromRow } from 'git-diff-from';
import loadConfig from './lib/config';
import * as Promise from 'bluebird';
export declare const MODULE_NAME = "node-novel-task";
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
export declare function globToFakeList(list: string[]): {
    list: {
        [key: string]: IListMainRow;
    };
    count: {
        main: number;
        novel: number;
        file: number;
    };
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
export interface ITemp {
    init?: boolean;
}
export interface IConfig {
    cwd: string;
    task?: {
        main?(data: IListMainRow, name: string, temp?: ITemp);
        novel?(data: IListNovelRow, name: string, temp?: ITemp);
        file?(data: IListFileRow, file: string, temp?: ITemp);
        before_end?(data: ReturnType<typeof novelDiffFromLog>, ls_map: any[], temp?: ITemp);
    };
    debug?: {
        no_push?: boolean;
    };
    nocache?: boolean;
}
export { loadConfig };
export declare function runTask(data: ReturnType<typeof novelDiffFromLog>, setting: ReturnType<typeof loadConfig> & {
    config: IConfig;
}, temp?: ITemp): Promise<{
    data: {
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
    ls_map: void[];
}>;
export default novelDiffFromLog;
