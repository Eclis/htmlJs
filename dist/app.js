"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var sp_1 = require("@pnp/sp");
var nodejs_1 = require("@pnp/nodejs");
var fs_1 = require("fs");
var yargs = require('yargs');
var settings = require("../config/settings.js");
var usuario = yargs.argv.usuario || 'main';
console.log('Efetuando deploy para: ' + usuario);
sp_1.sp.setup({
    sp: {
        fetchClientFactory: function () {
            return new nodejs_1.SPFetchClient(settings.sp.url, settings.sp.id, settings.sp.secret);
        },
    },
});
function asyncFunction() {
    return __awaiter(this, void 0, void 0, function () {
        var deployFolderItem, folder, usuarioFolderItem, e_1, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sp_1.sp.web.getFolderByServerRelativePath('/sites/DEV_LotePiloto/SiteAssets/deploy').getItem()];
                case 1:
                    deployFolderItem = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 6]);
                    return [4 /*yield*/, deployFolderItem.folder.folders.getByName(usuario).getItem()];
                case 3:
                    usuarioFolderItem = _a.sent();
                    folder = usuarioFolderItem.folder;
                    return [3 /*break*/, 6];
                case 4:
                    e_1 = _a.sent();
                    return [4 /*yield*/, deployFolderItem.folder.folders.add(usuario)];
                case 5:
                    result = _a.sent();
                    folder = result.folder;
                    return [3 /*break*/, 6];
                case 6:
                    fs_1.readFile('dist/natura.html', function (err, contents) {
                        folder.files.add('natura.html', contents, true);
                    });
                    fs_1.readFile('dist/lotePiloto.js', function (err, contents) {
                        folder.files.add('lotePiloto.js', contents, true);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
asyncFunction();
