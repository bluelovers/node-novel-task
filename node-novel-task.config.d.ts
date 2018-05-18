/**
 * Created by user on 2018/5/15/015.
 */
import { IListFileRow, IListMainRow, IListNovelRow } from './';
declare const _default: {
    cwd: string;
    task: {
        main(data: IListMainRow, name: string): void;
        novel(data: IListNovelRow, name: string): void;
        file(data: IListFileRow, file: string): void;
    };
};
export default _default;
