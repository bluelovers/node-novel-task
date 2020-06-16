"use strict";
/**
 * Created by user on 2018/5/17/017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterNotDelete = void 0;
function filterNotDelete(files) {
    return files.filter(function (b) {
        return (!b.status || b.status.indexOf('D') == -1);
    }, []);
}
exports.filterNotDelete = filterNotDelete;
//# sourceMappingURL=index.js.map