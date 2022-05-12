"use strict";
exports.__esModule = true;
exports.orderBy = exports.checkEnabled = exports.blousesFiltered = void 0;
var render_1 = require("./render");
var __1 = require("..");
var filtersColors = new Array();
var filtersSizes = new Array();
var filtersPrices = new Array();
var orderFilters = "";
exports.blousesFiltered = new Array();
function checkEnabled(div, typeFilter, filter) {
    if (div.classList.value.indexOf("checked") === -1) {
        div.classList.add("checked");
        if (typeFilter === "size") {
            filtersSizes.push(filter);
        }
        else if (typeFilter === "color") {
            filtersColors.push(filter);
        }
        else {
            filtersPrices.push(filter);
        }
    }
    else {
        div.classList.remove("checked");
        if (typeFilter === "size") {
            filtersSizes.splice(filtersSizes.indexOf(filter), 1);
        }
        else if (typeFilter === "color") {
            filtersColors = filtersColors.filter(function (item) {
                return item !== filter;
            });
        }
        else {
            filtersPrices = filtersPrices.filter(function (item) {
                return item !== filter;
            });
        }
    }
    filterItems();
}
exports.checkEnabled = checkEnabled;
function filterItems() {
    exports.blousesFiltered = __1.blouses;
    orderBy(orderFilters);
    if (filtersSizes.length > 0) {
        filterSizes();
    }
    if (filtersPrices.length > 0) {
        filterPrices();
    }
    if (filtersColors.length > 0) {
        filterColors();
    }
    (0, render_1.renderItems)(exports.blousesFiltered);
}
function filterColors() {
    var colors = __1.blouses.filter(function (blouse) {
        if (filtersColors.filter(function (color) {
            if (blouse.color === color) {
                return color;
            }
        }).length > 0) {
            return blouse;
        }
    });
    exports.blousesFiltered = exports.blousesFiltered.filter(function (blouse) {
        if (colors.filter(function (color) {
            if (blouse.color === color.color) {
                return color;
            }
        }).length > 0) {
            return blouse;
        }
    });
}
function filterSizes() {
    var sizes = __1.blouses.filter(function (blouse) {
        if (filtersSizes.filter(function (size) {
            if (blouse.size.filter(function (blouseSize) {
                if (blouseSize === size) {
                    return blouseSize;
                }
            }).length > 0) {
                return size;
            }
        }).length > 0) {
            return blouse;
        }
    });
    exports.blousesFiltered = exports.blousesFiltered.filter(function (blouse) {
        if (blouse.size.filter(function (blouseSize) {
            if (sizes.filter(function (size) {
                if (size.size.filter(function (sizeSize) {
                    if (sizeSize === blouseSize) {
                        return sizeSize;
                    }
                }).length > 0) {
                    return size;
                }
            }).length > 0) {
                return blouseSize;
            }
        }).length > 0) {
            return blouse;
        }
    });
}
function filterPrices() {
    var prices = __1.blouses.filter(function (blouse) {
        if (filtersPrices.filter(function (oneValue) {
            var value = oneValue.split("<");
            if (parseInt(value[0]) === 0) {
                return blouse.price <= parseInt(value[1]);
            }
            if (parseInt(value[1]) === 0) {
                return blouse.price >= parseInt(value[0]);
            }
            if (blouse.price > parseInt(value[0]) &&
                blouse.price < parseInt(value[1])) {
                return oneValue;
            }
        }).length > 0) {
            return blouse;
        }
    });
    exports.blousesFiltered = exports.blousesFiltered.filter(function (blouse) {
        if (prices.filter(function (blousePrice) {
            if (blouse.price === blousePrice.price) {
                return blousePrice;
            }
        }).length > 0) {
            return blouse;
        }
    });
}
function orderBy(select) {
    orderFilters = select;
    if (exports.blousesFiltered.length === 0) {
        exports.blousesFiltered = __1.blouses;
    }
    if (select === "mais_recente") {
        (0, render_1.renderItems)(exports.blousesFiltered.sort(function (a, b) {
            if (new Date(a.date) < new Date(b.date)) {
                return -1;
            }
            if (new Date(a.date) > new Date(b.date)) {
                return 1;
            }
            return 0;
        }));
    }
    else if (select === "maior_preco" || select === "menor_preco") {
        (0, render_1.renderItems)(exports.blousesFiltered.sort(function (a, b) {
            if (a.price > b.price) {
                if (select === "maior_preco") {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            if (a.price < b.price) {
                if (select === "maior_preco") {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            return 0;
        }));
    }
    else {
        (0, render_1.renderItems)(exports.blousesFiltered);
    }
}
exports.orderBy = orderBy;
