"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_dev_appium_1 = require("nativescript-dev-appium");
before("start server", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, nativescript_dev_appium_1.startServer()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
after("stop server", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, nativescript_dev_appium_1.stopServer()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBU0E7O0FBVEEsbUVBQWtFO0FBRWxFLE1BQU0sQ0FBQyxjQUFjLEVBQUU7OztvQkFDbkIscUJBQU0scUNBQVcsRUFBRSxFQUFBOztnQkFBbkIsU0FBbUIsQ0FBQzs7OztLQUN2QixDQUFDLENBQUM7QUFFSCxLQUFLLENBQUMsYUFBYSxFQUFFOzs7b0JBQ2pCLHFCQUFNLG9DQUFVLEVBQUUsRUFBQTs7Z0JBQWxCLFNBQWtCLENBQUM7Ozs7S0FDdEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3RhcnRTZXJ2ZXIsIHN0b3BTZXJ2ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRldi1hcHBpdW1cIjtcblxuYmVmb3JlKFwic3RhcnQgc2VydmVyXCIsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBzdGFydFNlcnZlcigpO1xufSk7XG5cbmFmdGVyKFwic3RvcCBzZXJ2ZXJcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHN0b3BTZXJ2ZXIoKTtcbn0pO1xuIl19