import { IConfig } from '../index';
export declare function loadMainConfig(cwd?: string): {
    config: IConfig;
    filepath: string;
};
export declare function transform(result: any): any;
export declare function loadConfig<T>(name: string, options?: any): {
    config: T;
    filepath: string;
};
export default loadConfig;
