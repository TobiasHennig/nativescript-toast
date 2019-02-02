"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_dev_appium_1 = require("nativescript-dev-appium");
var chai_1 = require("chai");
describe("sample scenario", function () {
    var defaultWaitTime = 5000;
    var driver;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, nativescript_dev_appium_1.createDriver()];
                case 1:
                    driver = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    after(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.quit()];
                case 1:
                    _a.sent();
                    console.log("Quit driver!");
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.currentTest.state === "failed")) return [3 /*break*/, 2];
                        return [4 /*yield*/, driver.logTestArtifacts(this.currentTest.title)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    });
    it("should find an element by text", function () { return __awaiter(_this, void 0, void 0, function () {
        var btnTap, message, lblMessage, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, driver.findElementByText("TAP", nativescript_dev_appium_1.SearchOptions.exact)];
                case 1:
                    btnTap = _c.sent();
                    return [4 /*yield*/, btnTap.click()];
                case 2:
                    _c.sent();
                    message = " taps left";
                    return [4 /*yield*/, driver.findElementByText(message, nativescript_dev_appium_1.SearchOptions.contains)];
                case 3:
                    lblMessage = _c.sent();
                    _b = (_a = chai_1.assert).equal;
                    return [4 /*yield*/, lblMessage.text()];
                case 4:
                    _b.apply(_a, [_c.sent(), "41" + message]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should find an element by type", function () { return __awaiter(_this, void 0, void 0, function () {
        var btnTap, message, lblMessage, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, driver.findElementByClassName(driver.locators.button)];
                case 1:
                    btnTap = _c.sent();
                    return [4 /*yield*/, btnTap.click()];
                case 2:
                    _c.sent();
                    message = " taps left";
                    return [4 /*yield*/, driver.findElementByText(message, nativescript_dev_appium_1.SearchOptions.contains)];
                case 3:
                    lblMessage = _c.sent();
                    _b = (_a = chai_1.assert).equal;
                    return [4 /*yield*/, lblMessage.text()];
                case 4:
                    _b.apply(_a, [_c.sent(), "40" + message]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlLmUyZS1zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FtcGxlLmUyZS1zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkEyQ0c7O0FBM0NILG1FQUFvRjtBQUNwRiw2QkFBOEI7QUFFOUIsUUFBUSxDQUFDLGlCQUFpQixFQUFFO0lBQ3hCLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQztJQUM3QixJQUFJLE1BQW9CLENBQUM7SUFFekIsTUFBTSxDQUFDOzs7d0JBQ00scUJBQU0sc0NBQVksRUFBRSxFQUFBOztvQkFBN0IsTUFBTSxHQUFHLFNBQW9CLENBQUM7Ozs7U0FDakMsQ0FBQyxDQUFDO0lBRUgsS0FBSyxDQUFDOzs7d0JBQ0YscUJBQU0sTUFBTSxDQUFDLElBQUksRUFBRSxFQUFBOztvQkFBbkIsU0FBbUIsQ0FBQztvQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7OztTQUMvQixDQUFDLENBQUM7SUFFSCxTQUFTLENBQUM7Ozs7OzZCQUNGLENBQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFBLEVBQW5DLHdCQUFtQzt3QkFDbkMscUJBQU0sTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUE7O3dCQUFyRCxTQUFxRCxDQUFDOzs7Ozs7S0FFN0QsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFOzs7O3dCQUNsQixxQkFBTSxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLHVDQUFhLENBQUMsS0FBSyxDQUFDLEVBQUE7O29CQUFuRSxNQUFNLEdBQUcsU0FBMEQ7b0JBQ3pFLHFCQUFNLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBQTs7b0JBQXBCLFNBQW9CLENBQUM7b0JBRWYsT0FBTyxHQUFHLFlBQVksQ0FBQztvQkFDVixxQkFBTSxNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLHVDQUFhLENBQUMsUUFBUSxDQUFDLEVBQUE7O29CQUE1RSxVQUFVLEdBQUcsU0FBK0Q7b0JBQ2xGLEtBQUEsQ0FBQSxLQUFBLGFBQU0sQ0FBQSxDQUFDLEtBQUssQ0FBQTtvQkFBQyxxQkFBTSxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUE7O29CQUFwQyxjQUFhLFNBQXVCLEVBQUUsSUFBSSxHQUFHLE9BQU8sRUFBQyxDQUFDOzs7O1NBS3pELENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTs7Ozt3QkFDbEIscUJBQU0sTUFBTSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUE7O29CQUFwRSxNQUFNLEdBQUcsU0FBMkQ7b0JBQzFFLHFCQUFNLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBQTs7b0JBQXBCLFNBQW9CLENBQUM7b0JBRWYsT0FBTyxHQUFHLFlBQVksQ0FBQztvQkFDVixxQkFBTSxNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLHVDQUFhLENBQUMsUUFBUSxDQUFDLEVBQUE7O29CQUE1RSxVQUFVLEdBQUcsU0FBK0Q7b0JBQ2xGLEtBQUEsQ0FBQSxLQUFBLGFBQU0sQ0FBQSxDQUFDLEtBQUssQ0FBQTtvQkFBQyxxQkFBTSxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUE7O29CQUFwQyxjQUFhLFNBQXVCLEVBQUUsSUFBSSxHQUFHLE9BQU8sRUFBQyxDQUFDOzs7O1NBQ3pELENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwaXVtRHJpdmVyLCBjcmVhdGVEcml2ZXIsIFNlYXJjaE9wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRldi1hcHBpdW1cIjtcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gXCJjaGFpXCI7XG5cbmRlc2NyaWJlKFwic2FtcGxlIHNjZW5hcmlvXCIsICgpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0V2FpdFRpbWUgPSA1MDAwO1xuICAgIGxldCBkcml2ZXI6IEFwcGl1bURyaXZlcjtcblxuICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICAgIGRyaXZlciA9IGF3YWl0IGNyZWF0ZURyaXZlcigpO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkcml2ZXIucXVpdCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlF1aXQgZHJpdmVyIVwiKTtcbiAgICB9KTtcblxuICAgIGFmdGVyRWFjaChhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUZXN0LnN0YXRlID09PSBcImZhaWxlZFwiKSB7XG4gICAgICAgICAgICBhd2FpdCBkcml2ZXIubG9nVGVzdEFydGlmYWN0cyh0aGlzLmN1cnJlbnRUZXN0LnRpdGxlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoXCJzaG91bGQgZmluZCBhbiBlbGVtZW50IGJ5IHRleHRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBidG5UYXAgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnRCeVRleHQoXCJUQVBcIiwgU2VhcmNoT3B0aW9ucy5leGFjdCk7XG4gICAgICAgIGF3YWl0IGJ0blRhcC5jbGljaygpO1xuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBcIiB0YXBzIGxlZnRcIjtcbiAgICAgICAgY29uc3QgbGJsTWVzc2FnZSA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudEJ5VGV4dChtZXNzYWdlLCBTZWFyY2hPcHRpb25zLmNvbnRhaW5zKTtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKGF3YWl0IGxibE1lc3NhZ2UudGV4dCgpLCBcIjQxXCIgKyBtZXNzYWdlKTtcblxuICAgICAgICAvLyBJbWFnZSB2ZXJpZmljYXRpb25cbiAgICAgICAgLy8gY29uc3Qgc2NyZWVuID0gYXdhaXQgZHJpdmVyLmNvbXBhcmVTY3JlZW4oXCJoZWxsby13b3JsZC00MVwiKTtcbiAgICAgICAgLy8gYXNzZXJ0LmlzVHJ1ZShzY3JlZW4pO1xuICAgIH0pO1xuXG4gICAgaXQoXCJzaG91bGQgZmluZCBhbiBlbGVtZW50IGJ5IHR5cGVcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBidG5UYXAgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnRCeUNsYXNzTmFtZShkcml2ZXIubG9jYXRvcnMuYnV0dG9uKTtcbiAgICAgICAgYXdhaXQgYnRuVGFwLmNsaWNrKCk7XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IFwiIHRhcHMgbGVmdFwiO1xuICAgICAgICBjb25zdCBsYmxNZXNzYWdlID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50QnlUZXh0KG1lc3NhZ2UsIFNlYXJjaE9wdGlvbnMuY29udGFpbnMpO1xuICAgICAgICBhc3NlcnQuZXF1YWwoYXdhaXQgbGJsTWVzc2FnZS50ZXh0KCksIFwiNDBcIiArIG1lc3NhZ2UpO1xuICAgIH0pO1xufSk7Il19