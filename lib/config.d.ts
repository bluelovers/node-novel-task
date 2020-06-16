import { IConfig } from '../index';
export declare function loadMainConfig(cwd?: string): {
    config: IConfig;
    filepath: string;
    isEmpty?: boolean;
};
export declare function loadCacheConfig(cwd?: string): {
    config: {
        last: string | number;
        last_from?: string | number;
        done?: number;
        last_push_head?: string;
    };
    filepath: string;
    isEmpty?: boolean;
};
export declare function transform(result: any): any;
export declare function loadConfig<T>(name: string, options?: any): {
    config: T;
    filepath: string;
    isEmpty?: boolean;
};
export default loadConfig;
