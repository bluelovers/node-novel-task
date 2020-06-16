"use strict";
/**
 * Created by user on 2018/9/3/003.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.console = void 0;
if (process && process.env) {
    process.env.FORCE_COLOR = process.env.FORCE_COLOR || '1';
}
const debug_color2_1 = __importDefault(require("debug-color2"));
exports.console = debug_color2_1.default;
debug_color2_1.default.enabled = true;
debug_color2_1.default.chalkOptions = {
    ...debug_color2_1.default.chalkOptions,
    enabled: true,
};
debug_color2_1.default.inspectOptions = {
    ...debug_color2_1.default.inspectOptions,
    colors: true,
};
//export const console = new Console(null, {
//	enabled: true,
//	inspectOptions: {
//		colors: true,
//	},
//	chalkOptions: {
//		enabled: true,
//	},
//});
debug_color2_1.default.enabledColor = true;
exports.default = debug_color2_1.default;
//# sourceMappingURL=log.js.map