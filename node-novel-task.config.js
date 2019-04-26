"use strict";
/**
 * Created by user on 2018/5/15/015.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
let cwd;
if (fs.existsSync(path.join(process.cwd(), 'dist_novel'))) {
    cwd = path.join(process.cwd(), 'dist_novel');
}
else if (0 && fs.existsSync(path.join(__dirname, 'dist_novel'))) {
    cwd = path.join(__dirname, 'dist_novel');
}
else {
    cwd = 'D:/Users/Documents/The Project/nodejs-test/node-novel2/dist_novel';
}
console.log(`demo config`);
/**
 * 此處不使用 exports.default 直接使用 exports 也可以
 * 讀取時會自動判斷
 * 但注意在使用 export default 時 不要 export 其他項目
 */
exports.default = {
    cwd,
    task: {
        main(data, name) {
            console.log('MAIN', name);
            //console.log(data);
        },
        novel(data, name) {
            console.log('NOVEL', data.pathMain, data.novelID, data.length);
        },
        file(data, file) {
            console.log('FILE', data.subpath);
            //console.log(data);
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1ub3ZlbC10YXNrLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vZGUtbm92ZWwtdGFzay5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUdILCtCQUFnQztBQUNoQyw2QkFBOEI7QUFFOUIsSUFBSSxHQUFXLENBQUM7QUFFaEIsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDLEVBQ3pEO0lBQ0MsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO0NBQzdDO0tBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUMvRDtJQUNDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztDQUN6QztLQUVEO0lBQ0MsR0FBRyxHQUFHLG1FQUFtRSxDQUFDO0NBQzFFO0FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUUzQjs7OztHQUlHO0FBQ0gsa0JBQWU7SUFDZCxHQUFHO0lBRUgsSUFBSSxFQUFFO1FBQ0wsSUFBSSxDQUFDLElBQWtCLEVBQUUsSUFBWTtZQUVwQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxQixvQkFBb0I7UUFDckIsQ0FBQztRQUNELEtBQUssQ0FBQyxJQUFtQixFQUFFLElBQVk7WUFFdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQWtCLEVBQUUsSUFBWTtZQUVwQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsb0JBQW9CO1FBQ3JCLENBQUM7S0FDRDtDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzUvMTUvMDE1LlxuICovXG5cbmltcG9ydCB7IElMaXN0RmlsZVJvdywgSUxpc3RNYWluUm93LCBJTGlzdE5vdmVsUm93IH0gZnJvbSAnLi8nO1xuaW1wb3J0IGZzID0gcmVxdWlyZSgnZnMtZXh0cmEnKTtcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5sZXQgY3dkOiBzdHJpbmc7XG5cbmlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZGlzdF9ub3ZlbCcpKSlcbntcblx0Y3dkID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkaXN0X25vdmVsJyk7XG59XG5lbHNlIGlmICgwICYmIGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJ2Rpc3Rfbm92ZWwnKSkpXG57XG5cdGN3ZCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICdkaXN0X25vdmVsJyk7XG59XG5lbHNlXG57XG5cdGN3ZCA9ICdEOi9Vc2Vycy9Eb2N1bWVudHMvVGhlIFByb2plY3Qvbm9kZWpzLXRlc3Qvbm9kZS1ub3ZlbDIvZGlzdF9ub3ZlbCc7XG59XG5cbmNvbnNvbGUubG9nKGBkZW1vIGNvbmZpZ2ApO1xuXG4vKipcbiAqIOatpOiZleS4jeS9v+eUqCBleHBvcnRzLmRlZmF1bHQg55u05o6l5L2/55SoIGV4cG9ydHMg5Lmf5Y+v5LulXG4gKiDoroDlj5bmmYLmnIPoh6rli5XliKTmlrdcbiAqIOS9huazqOaEj+WcqOS9v+eUqCBleHBvcnQgZGVmYXVsdCDmmYIg5LiN6KaBIGV4cG9ydCDlhbbku5bpoIXnm65cbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXHRjd2QsXG5cblx0dGFzazoge1xuXHRcdG1haW4oZGF0YTogSUxpc3RNYWluUm93LCBuYW1lOiBzdHJpbmcpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ01BSU4nLCBuYW1lKTtcblx0XHRcdC8vY29uc29sZS5sb2coZGF0YSk7XG5cdFx0fSxcblx0XHRub3ZlbChkYXRhOiBJTGlzdE5vdmVsUm93LCBuYW1lOiBzdHJpbmcpXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5sb2coJ05PVkVMJywgZGF0YS5wYXRoTWFpbiwgZGF0YS5ub3ZlbElELCBkYXRhLmxlbmd0aCk7XG5cdFx0fSxcblx0XHRmaWxlKGRhdGE6IElMaXN0RmlsZVJvdywgZmlsZTogc3RyaW5nKVxuXHRcdHtcblx0XHRcdGNvbnNvbGUubG9nKCdGSUxFJywgZGF0YS5zdWJwYXRoKTtcblx0XHRcdC8vY29uc29sZS5sb2coZGF0YSk7XG5cdFx0fSxcblx0fSxcbn1cbiJdfQ==