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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQStCO0FBQy9CLDJDQUEyQztBQUMzQyxvQ0FBZ0Q7QUFDaEQsK0JBQStCO0FBRS9CLFNBQWdCLGNBQWMsQ0FBQyxHQUFZO0lBRTFDLE9BQU8sVUFBVSxDQUFVLG1CQUFXLEVBQUU7UUFDdkMsWUFBWSxFQUFFO1lBQ2IsR0FBRyxtQkFBVyxrQkFBa0I7WUFDaEMsR0FBRyxtQkFBVyxZQUFZO1NBQzFCO1FBQ0QsR0FBRztLQUNILENBQUMsQ0FBQztBQUNKLENBQUM7QUFURCx3Q0FTQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxHQUFZO0lBRTNDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUV4RCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVqRCxPQUFPLFVBQVUsQ0FPZCxPQUFPLEVBQUU7UUFDWCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDO1FBQ2xDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUM7UUFDdEMsWUFBWSxFQUFFO1lBQ2IsYUFBYTtTQUNiO0tBQ0QsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQXBCRCwwQ0FvQkM7QUFFRCxTQUFnQixTQUFTLENBQUMsTUFBTTtJQUUvQixJQUFJLE1BQU0sRUFDVjtRQUNDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEQsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQ3BGO1lBQ0MsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUN0QztLQUNEO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDO0FBYkQsOEJBYUM7QUFFRCxTQUFnQixVQUFVLENBQUksSUFBWSxFQUFFLE9BQVE7SUFLbkQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDdkIsU0FBUztLQUNULEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFWixJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFaEUsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDO0FBWkQsZ0NBWUM7QUFFRCxrQkFBZSxVQUFVLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3VwYXRoMic7XG5pbXBvcnQgKiBhcyBjb3NtaWNvbmZpZyBmcm9tICdjb3NtaWNvbmZpZyc7XG5pbXBvcnQgeyBJQ29uZmlnLCBNT0RVTEVfTkFNRSB9IGZyb20gJy4uL2luZGV4JztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzLWV4dHJhJztcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRNYWluQ29uZmlnKGN3ZD86IHN0cmluZylcbntcblx0cmV0dXJuIGxvYWRDb25maWc8SUNvbmZpZz4oTU9EVUxFX05BTUUsIHtcblx0XHRzZWFyY2hQbGFjZXM6IFtcblx0XHRcdGAke01PRFVMRV9OQU1FfS5jb25maWcubG9jYWwuanNgLFxuXHRcdFx0YCR7TU9EVUxFX05BTUV9LmNvbmZpZy5qc2AsXG5cdFx0XSxcblx0XHRjd2QsXG5cdH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENhY2hlQ29uZmlnKGN3ZD86IHN0cmluZylcbntcblx0bGV0IGJvb2wgPSBmcy5leGlzdHNTeW5jKHBhdGgucmVzb2x2ZShjd2QsICcuLy5jYWNoZScpKTtcblxuXHRjb25zb2xlLmxvZyhgbG9hZENhY2hlQ29uZmlnYCwgYGV4aXN0czoke2Jvb2x9YCk7XG5cblx0cmV0dXJuIGxvYWRDb25maWc8e1xuXHRcdGxhc3Q6IHN0cmluZyB8IG51bWJlcixcblx0XHRsYXN0X2Zyb20/OiBzdHJpbmcgfCBudW1iZXIsXG5cdFx0ZG9uZT86IG51bWJlcixcblxuXHRcdGxhc3RfcHVzaF9oZWFkPzogc3RyaW5nLFxuXG5cdH0+KCdjYWNoZScsIHtcblx0XHRjd2Q6IHBhdGgucmVzb2x2ZShjd2QsICcuLy5jYWNoZScpLFxuXHRcdHN0b3BEaXI6IHBhdGgucmVzb2x2ZShjd2QsICcuLy5jYWNoZScpLFxuXHRcdHNlYXJjaFBsYWNlczogW1xuXHRcdFx0YC5jYWNoZS5qc29uYCxcblx0XHRdLFxuXHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybShyZXN1bHQpXG57XG5cdGlmIChyZXN1bHQpXG5cdHtcblx0XHRyZXN1bHQuZmlsZXBhdGggPSBwYXRoLnJlc29sdmUocmVzdWx0LmZpbGVwYXRoKTtcblxuXHRcdGlmIChyZXN1bHQuY29uZmlnICYmIHJlc3VsdC5jb25maWcuZGVmYXVsdCAmJiBPYmplY3Qua2V5cyhyZXN1bHQuY29uZmlnKS5sZW5ndGggPT0gMSlcblx0XHR7XG5cdFx0XHRyZXN1bHQuY29uZmlnID0gcmVzdWx0LmNvbmZpZy5kZWZhdWx0O1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29uZmlnPFQ+KG5hbWU6IHN0cmluZywgb3B0aW9ucz8pOiB7XG5cdGNvbmZpZzogVCxcblx0ZmlsZXBhdGg6IHN0cmluZyxcbn1cbntcblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdHRyYW5zZm9ybSxcblx0fSwgb3B0aW9ucyk7XG5cblx0bGV0IHJlc3VsdCA9IGNvc21pY29uZmlnKG5hbWUsIG9wdGlvbnMpLnNlYXJjaFN5bmMob3B0aW9ucy5jd2QpO1xuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRDb25maWdcbiJdfQ==