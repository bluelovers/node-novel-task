"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("upath2");
const cosmiconfig = require("cosmiconfig");
const index_1 = require("../index");
const fs = require("fs-extra");
function loadMainConfig(cwd) {
    return loadConfig(index_1.MODULE_NAME, {
        searchPlaces: [
            `${index_1.MODULE_NAME}.config.local.js`,
            `${index_1.MODULE_NAME}.config.js`,
        ],
        cwd,
    });
}
exports.loadMainConfig = loadMainConfig;
function loadCacheConfig(cwd) {
    let bool = fs.existsSync(path.resolve(cwd, './.cache'));
    console.log(`cwd`, cwd);
    console.log(`loadCacheConfig`, `exists:${bool}`);
    return loadConfig('cache', {
        cwd: path.resolve(cwd, './.cache'),
        stopDir: path.resolve(cwd, './.cache'),
        searchPlaces: [
            `.cache.json`,
        ],
    });
}
exports.loadCacheConfig = loadCacheConfig;
function transform(result) {
    if (result) {
        result.filepath = path.resolve(result.filepath);
        if (result.config && result.config.default && Object.keys(result.config).length == 1) {
            result.config = result.config.default;
        }
    }
    return result;
}
exports.transform = transform;
function loadConfig(name, options) {
    options = Object.assign({
        transform,
    }, options);
    let result = cosmiconfig(name, options).searchSync(options.cwd);
    return result;
}
exports.loadConfig = loadConfig;
exports.default = loadConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQStCO0FBQy9CLDJDQUEyQztBQUMzQyxvQ0FBZ0Q7QUFDaEQsK0JBQStCO0FBRS9CLFNBQWdCLGNBQWMsQ0FBQyxHQUFZO0lBRTFDLE9BQU8sVUFBVSxDQUFVLG1CQUFXLEVBQUU7UUFDdkMsWUFBWSxFQUFFO1lBQ2IsR0FBRyxtQkFBVyxrQkFBa0I7WUFDaEMsR0FBRyxtQkFBVyxZQUFZO1NBQzFCO1FBQ0QsR0FBRztLQUNILENBQUMsQ0FBQztBQUNKLENBQUM7QUFURCx3Q0FTQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxHQUFZO0lBRTNDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUV4RCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVqRCxPQUFPLFVBQVUsQ0FPZCxPQUFPLEVBQUU7UUFDWCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDO1FBQ2xDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUM7UUFDdEMsWUFBWSxFQUFFO1lBQ2IsYUFBYTtTQUNiO0tBQ0QsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQXJCRCwwQ0FxQkM7QUFFRCxTQUFnQixTQUFTLENBQUMsTUFBTTtJQUUvQixJQUFJLE1BQU0sRUFDVjtRQUNDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEQsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQ3BGO1lBQ0MsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUN0QztLQUNEO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDO0FBYkQsOEJBYUM7QUFFRCxTQUFnQixVQUFVLENBQUksSUFBWSxFQUFFLE9BQVE7SUFLbkQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDdkIsU0FBUztLQUNULEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFWixJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFaEUsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDO0FBWkQsZ0NBWUM7QUFFRCxrQkFBZSxVQUFVLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3VwYXRoMic7XG5pbXBvcnQgKiBhcyBjb3NtaWNvbmZpZyBmcm9tICdjb3NtaWNvbmZpZyc7XG5pbXBvcnQgeyBJQ29uZmlnLCBNT0RVTEVfTkFNRSB9IGZyb20gJy4uL2luZGV4JztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzLWV4dHJhJztcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRNYWluQ29uZmlnKGN3ZD86IHN0cmluZylcbntcblx0cmV0dXJuIGxvYWRDb25maWc8SUNvbmZpZz4oTU9EVUxFX05BTUUsIHtcblx0XHRzZWFyY2hQbGFjZXM6IFtcblx0XHRcdGAke01PRFVMRV9OQU1FfS5jb25maWcubG9jYWwuanNgLFxuXHRcdFx0YCR7TU9EVUxFX05BTUV9LmNvbmZpZy5qc2AsXG5cdFx0XSxcblx0XHRjd2QsXG5cdH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENhY2hlQ29uZmlnKGN3ZD86IHN0cmluZylcbntcblx0bGV0IGJvb2wgPSBmcy5leGlzdHNTeW5jKHBhdGgucmVzb2x2ZShjd2QsICcuLy5jYWNoZScpKTtcblxuXHRjb25zb2xlLmxvZyhgY3dkYCwgY3dkKTtcblx0Y29uc29sZS5sb2coYGxvYWRDYWNoZUNvbmZpZ2AsIGBleGlzdHM6JHtib29sfWApO1xuXG5cdHJldHVybiBsb2FkQ29uZmlnPHtcblx0XHRsYXN0OiBzdHJpbmcgfCBudW1iZXIsXG5cdFx0bGFzdF9mcm9tPzogc3RyaW5nIHwgbnVtYmVyLFxuXHRcdGRvbmU/OiBudW1iZXIsXG5cblx0XHRsYXN0X3B1c2hfaGVhZD86IHN0cmluZyxcblxuXHR9PignY2FjaGUnLCB7XG5cdFx0Y3dkOiBwYXRoLnJlc29sdmUoY3dkLCAnLi8uY2FjaGUnKSxcblx0XHRzdG9wRGlyOiBwYXRoLnJlc29sdmUoY3dkLCAnLi8uY2FjaGUnKSxcblx0XHRzZWFyY2hQbGFjZXM6IFtcblx0XHRcdGAuY2FjaGUuanNvbmAsXG5cdFx0XSxcblx0fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm0ocmVzdWx0KVxue1xuXHRpZiAocmVzdWx0KVxuXHR7XG5cdFx0cmVzdWx0LmZpbGVwYXRoID0gcGF0aC5yZXNvbHZlKHJlc3VsdC5maWxlcGF0aCk7XG5cblx0XHRpZiAocmVzdWx0LmNvbmZpZyAmJiByZXN1bHQuY29uZmlnLmRlZmF1bHQgJiYgT2JqZWN0LmtleXMocmVzdWx0LmNvbmZpZykubGVuZ3RoID09IDEpXG5cdFx0e1xuXHRcdFx0cmVzdWx0LmNvbmZpZyA9IHJlc3VsdC5jb25maWcuZGVmYXVsdDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvbmZpZzxUPihuYW1lOiBzdHJpbmcsIG9wdGlvbnM/KToge1xuXHRjb25maWc6IFQsXG5cdGZpbGVwYXRoOiBzdHJpbmcsXG59XG57XG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHR0cmFuc2Zvcm0sXG5cdH0sIG9wdGlvbnMpO1xuXG5cdGxldCByZXN1bHQgPSBjb3NtaWNvbmZpZyhuYW1lLCBvcHRpb25zKS5zZWFyY2hTeW5jKG9wdGlvbnMuY3dkKTtcblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBsb2FkQ29uZmlnXG4iXX0=