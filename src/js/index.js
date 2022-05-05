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
exports.__esModule = true;
var blouses_1 = require("./services/blouses");
var contentColors = document.querySelector("div.content-colors");
var contentSizes = document.querySelector("div.content-sizes");
var contentItems = document.querySelector("div.content-items");
var blouses;
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, blouses_1.getAllBlouses)()];
                case 1:
                    blouses = _a.sent();
                    renderColors(blouses);
                    renderSizes(blouses);
                    renderItems(blouses);
                    return [2 /*return*/];
            }
        });
    });
});
function extractProperty(blouses, property) {
    if (property !== "size") {
        return blouses
            .sort(function (a, b) {
            if (a[property] < b[property]) {
                return -1;
            }
            if (a[property] > b[property]) {
                return 1;
            }
            return 0;
        })
            .filter(function (item, pos, ary) {
            return !pos || item[property] != ary[pos - 1][property];
        });
    }
    else {
        var sizes = [];
        blouses.map(function (blouse) {
            blouse.size.map(function (size) {
                sizes.push(size);
            });
        });
        return sizes
            .sort(function (a, b) {
            if (a > b) {
                return -1;
            }
            if (a < b) {
                return 1;
            }
            return 0;
        })
            .filter(function (item, pos, ary) {
            return !pos || item != ary[pos - 1];
        });
    }
}
function renderColors(blouses) {
    var filteredBlouses = extractProperty(blouses, "color");
    while (contentColors.firstChild) {
        contentColors.removeChild(contentColors.firstChild);
    }
    filteredBlouses.map(function (blouse, index) {
        if (index > 4) {
            return;
        }
        var contentSquare = document.createElement("div");
        contentSquare.className = "content-square";
        var square = document.createElement("div");
        square.className = "square";
        square.onclick = function () {
            check_enabled(square, blouse.color);
        };
        var squareTitle = document.createElement("span");
        squareTitle.className = "square-title";
        squareTitle.innerHTML = blouse.color;
        contentSquare.appendChild(square);
        contentSquare.appendChild(squareTitle);
        contentColors.appendChild(contentSquare);
    });
}
function renderSizes(blouses) {
    var filteredSizes = extractProperty(blouses, "size");
    while (contentSizes.firstChild) {
        contentSizes.removeChild(contentSizes.firstChild);
    }
    filteredSizes.map(function (blouse) {
        var squareSizes = document.createElement("div");
        squareSizes.className = "square-sizes";
        squareSizes.onclick = function () {
            check_enabled(squareSizes, "size");
        };
        var sizesTitle = document.createElement("span");
        sizesTitle.className = "sizes-title";
        sizesTitle.innerHTML = blouse.toString();
        squareSizes.appendChild(sizesTitle);
        contentSizes.appendChild(squareSizes);
    });
}
function renderItems(blouses) {
    while (contentItems.firstChild) {
        contentItems.removeChild(contentItems.firstChild);
    }
    blouses.map(function (blouse, index) {
        if (index > 8) {
            return;
        }
        var contentItem = document.createElement("div");
        contentItem.className = "content-item";
        var image = document.createElement("img");
        image.src = blouse.image;
        image.alt = blouse.name;
        image.className = "item-image";
        var nameProduct = document.createElement("span");
        nameProduct.className = "name-product";
        nameProduct.innerHTML = blouse.name;
        var price = document.createElement("span");
        price.className = "price";
        price.innerHTML = "R$ ".concat(addZero(convertPointToComma(blouse.price)));
        var inUpTo = document.createElement("span");
        inUpTo.className = "in-up-to";
        inUpTo.innerHTML = "at\u00E9 ".concat(blouse.parcelamento[0], "x de R$:").concat(addZero(convertPointToComma(blouse.parcelamento[1])));
        var buttonBuy = document.createElement("div");
        buttonBuy.className = "button-buy";
        var buttonBuyText = document.createElement("span");
        buttonBuyText.innerHTML = "COMPRAR";
        buttonBuy.appendChild(buttonBuyText);
        contentItem.append(image, nameProduct, price, inUpTo, buttonBuy);
        contentItems.appendChild(contentItem);
    });
}
function convertPointToComma(value) {
    return value.toString().replace(".", ",");
}
function addZero(value) {
    var values = value.split(",");
    if (!values[1]) {
        return "".concat(value, ",00");
    }
    else {
        var valueInt = parseInt(values[1]);
        if (valueInt < 10) {
            return "".concat(value[0], ",").concat(value[1], "0");
        }
    }
    return value;
}
function filterColor(blouses, color) {
    renderItems(blouses.filter(function (blouse) {
        return blouse.color === color;
    }));
}
function check_enabled(div, filter) {
    filterColor(blouses, filter);
    if (div.classList.value.indexOf("checked") === -1) {
        div.classList.add("checked");
    }
    else {
        div.classList.remove("checked");
    }
}
