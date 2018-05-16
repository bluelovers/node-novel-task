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
/**
 * 此處不使用 exports.default 直接使用 exports 也可以
 * 讀取時會自動判斷
 * 但注意在使用 export default 時 不要 export 其他項目
 */
export default _default;
