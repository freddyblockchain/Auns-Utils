"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAunAccountAddress = exports.getAunNames = void 0;
var algosdk_1 = require("algosdk");
var env_1 = require("./env");
function uint8ArrayToBase64(bytes) {
    var binary = '';
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    if (typeof window !== "undefined" && window.btoa) {
        // For browsers
        return window.btoa(binary);
    }
    else {
        // For Node.js
        return Buffer.from(binary, 'binary').toString('base64');
    }
}
function decodeUint8(bytes) {
    return Buffer.from(uint8ArrayToBase64(bytes), "base64");
}
var getAunNames = function () { return __awaiter(void 0, void 0, void 0, function () {
    var boxesRequest, boxes, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                boxesRequest = env_1.algodClient.getApplicationBoxes(env_1.APP_ID);
                return [4 /*yield*/, boxesRequest.do()];
            case 1:
                boxes = (_a.sent()).boxes;
                return [2 /*return*/, boxes.map(function (element) {
                        return decodeUint8(element.name).toString();
                    })];
            case 2:
                err_1 = _a.sent();
                console.log("names not found");
                return [2 /*return*/, undefined];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAunNames = getAunNames;
var getAunAccountAddress = function (aunName) { return __awaiter(void 0, void 0, void 0, function () {
    var boxesRequest, boxes, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                boxesRequest = env_1.algodClient.getApplicationBoxByName(env_1.APP_ID, Buffer.from(aunName));
                return [4 /*yield*/, boxesRequest.do()];
            case 1:
                boxes = (_a.sent());
                return [2 /*return*/, (0, algosdk_1.encodeAddress)(boxes.value)];
            case 2:
                err_2 = _a.sent();
                console.log("No account found paired with that name");
                return [2 /*return*/, undefined];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAunAccountAddress = getAunAccountAddress;
