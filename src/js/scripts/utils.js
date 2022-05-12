"use strict";
exports.__esModule = true;
exports.extractProperty = exports.addZero = exports.convertPointToComma = void 0;
function convertPointToComma(value) {
    return value.toString().replace(".", ",");
}
exports.convertPointToComma = convertPointToComma;
function addZero(value) {
    var values = value.split(",");
    if (!values[1]) {
        return "".concat(value, ",00");
    }
    else {
        var valueInt = parseInt(values[1]);
        if (valueInt < 10) {
            return "".concat(values[0], ",").concat(values[1], "0");
        }
    }
    return value;
}
exports.addZero = addZero;
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
exports.extractProperty = extractProperty;
