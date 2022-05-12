"use strict";
exports.__esModule = true;
exports.increaseFilter = exports.showOption = exports.closeContentMobile = exports.showOrderBy = exports.showFilters = exports.renderMoreColorsMobile = exports.renderMoreColors = exports.renderSizes = exports.renderColors = exports.renderItems = void 0;
var filters_1 = require("./filters");
var __1 = require("..");
var utils_1 = require("./utils");
var maxColors = 4;
var maxFilter = 8;
function renderItems(blouses) {
    var btnLoadMore = document.querySelector("div.load-more");
    var contentItems = document.querySelector("div.content-items");
    while (contentItems.firstChild) {
        contentItems.removeChild(contentItems.firstChild);
    }
    if (blouses.length === 0) {
        btnLoadMore.classList.add("hidden");
        return;
    }
    blouses.map(function (blouse, index) {
        if (index > maxFilter) {
            btnLoadMore.classList.remove("hidden");
            return;
        }
        else {
            btnLoadMore.classList.add("hidden");
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
        price.innerHTML = "R$ ".concat((0, utils_1.addZero)((0, utils_1.convertPointToComma)(blouse.price)));
        var inUpTo = document.createElement("span");
        inUpTo.className = "in-up-to";
        inUpTo.innerHTML = "at\u00E9 ".concat(blouse.parcelamento[0], "x de R$:").concat((0, utils_1.addZero)((0, utils_1.convertPointToComma)(blouse.parcelamento[1])));
        var buttonBuy = document.createElement("div");
        buttonBuy.className = "button-buy";
        buttonBuy.onclick = function () {
            purchased();
        };
        var buttonBuyText = document.createElement("span");
        buttonBuyText.innerHTML = "COMPRAR";
        buttonBuy.appendChild(buttonBuyText);
        contentItem.append(image, nameProduct, price, inUpTo, buttonBuy);
        contentItems.appendChild(contentItem);
    });
}
exports.renderItems = renderItems;
function renderColors(blouses) {
    var filteredBlouses = (0, utils_1.extractProperty)(blouses, "color");
    var contentColors = document.querySelector("div.content-colors");
    var contentColorsMobile = document.querySelector("div.content-colors-mobile");
    while (contentColors.firstChild) {
        contentColors.removeChild(contentColors.firstChild);
    }
    while (contentColorsMobile.firstChild) {
        contentColorsMobile.removeChild(contentColorsMobile.firstChild);
    }
    filteredBlouses.map(function (blouse, index) {
        if (index > maxColors) {
            return;
        }
        var contentSquare = document.createElement("div");
        contentSquare.className = "content-square";
        var square = document.createElement("div");
        square.className = "square";
        square.onclick = function () {
            (0, filters_1.checkEnabled)(square, "color", blouse.color);
        };
        var squareTitle = document.createElement("span");
        squareTitle.className = "square-title";
        squareTitle.innerHTML = blouse.color;
        contentSquare.appendChild(square);
        contentSquare.appendChild(squareTitle);
        contentColors.appendChild(contentSquare);
    });
    filteredBlouses.map(function (blouse, index) {
        if (index > maxColors) {
            return;
        }
        var contentSquare = document.createElement("div");
        contentSquare.className = "content-square";
        var square = document.createElement("div");
        square.className = "square";
        square.onclick = function () {
            (0, filters_1.checkEnabled)(square, "color", blouse.color);
        };
        var squareTitle = document.createElement("span");
        squareTitle.className = "square-title";
        squareTitle.innerHTML = blouse.color;
        contentSquare.appendChild(square);
        contentSquare.appendChild(squareTitle);
        contentColorsMobile.appendChild(contentSquare);
    });
}
exports.renderColors = renderColors;
function renderSizes(blouses) {
    var filteredSizes = (0, utils_1.extractProperty)(blouses, "size");
    var contentSizes = document.querySelector("div.content-sizes");
    var contentSizesMobile = document.querySelector("div.content-sizes-mobile");
    while (contentSizes.firstChild) {
        contentSizes.removeChild(contentSizes.firstChild);
    }
    while (contentSizesMobile.firstChild) {
        contentSizesMobile.removeChild(contentSizesMobile.firstChild);
    }
    filteredSizes.map(function (blouse) {
        var squareSizes = document.createElement("div");
        squareSizes.className = "square-sizes";
        squareSizes.onclick = function () {
            (0, filters_1.checkEnabled)(squareSizes, "size", blouse.toString());
        };
        var sizesTitle = document.createElement("span");
        sizesTitle.className = "sizes-title";
        sizesTitle.innerHTML = blouse.toString();
        squareSizes.appendChild(sizesTitle);
        contentSizes.appendChild(squareSizes);
    });
    filteredSizes.map(function (blouse) {
        var squareSizes = document.createElement("div");
        squareSizes.className = "square-sizes";
        squareSizes.onclick = function () {
            (0, filters_1.checkEnabled)(squareSizes, "size", blouse.toString());
        };
        var sizesTitle = document.createElement("span");
        sizesTitle.className = "sizes-title";
        sizesTitle.innerHTML = blouse.toString();
        squareSizes.appendChild(sizesTitle);
        contentSizesMobile.appendChild(squareSizes);
    });
}
exports.renderSizes = renderSizes;
function renderMoreColors(value) {
    var contentSizes = document.querySelector("p.more-colors-title");
    var contentItem = document.createElement("i");
    if (value.textContent.indexOf("todas") !== -1) {
        contentSizes.innerHTML = "Ver menos";
        contentItem.className = "arrow up";
        contentItem.style.marginLeft = "40px";
        contentItem.style.marginBottom = "-2px";
        contentSizes.appendChild(contentItem);
        maxColors = 8;
    }
    else {
        contentSizes.innerHTML = "Ver todas as cores ";
        contentItem.className = "arrow down";
        contentItem.style.marginLeft = "3px";
        contentItem.style.marginBottom = "2px";
        contentSizes.appendChild(contentItem);
        maxColors = 4;
    }
    renderColors(__1.blouses);
}
exports.renderMoreColors = renderMoreColors;
function renderMoreColorsMobile(value) {
    var contentSizes = document.querySelector("p.more-colors-title-mobile");
    var contentItem = document.createElement("i");
    if (value.textContent.indexOf("todas") !== -1) {
        contentSizes.innerHTML = "Ver menos";
        contentItem.className = "arrow up";
        contentItem.style.marginLeft = "40px";
        contentItem.style.marginBottom = "-2px";
        contentSizes.appendChild(contentItem);
        maxColors = 8;
    }
    else {
        contentSizes.innerHTML = "Ver todas as cores ";
        contentItem.className = "arrow down";
        contentItem.style.marginLeft = "3px";
        contentItem.style.marginBottom = "2px";
        contentSizes.appendChild(contentItem);
        maxColors = 4;
    }
    renderColors(__1.blouses);
}
exports.renderMoreColorsMobile = renderMoreColorsMobile;
function showFilters() {
    var contentSizes = document.querySelector("div.content-order-by-mobile");
    document.querySelector("body").style.overflow = "hidden";
    contentSizes.classList.toggle("show");
}
exports.showFilters = showFilters;
function showOrderBy() {
    var contentFilters = document.querySelector("div.content-filters-mobile");
    document.querySelector("body").style.overflow = "hidden";
    contentFilters.classList.toggle("show");
}
exports.showOrderBy = showOrderBy;
function closeContentMobile() {
    var contentSizes = document.querySelector("div.content-order-by-mobile");
    var contentFilters = document.querySelector("div.content-filters-mobile");
    contentSizes.classList.remove("show");
    contentFilters.classList.remove("show");
    document.querySelector("body").style.overflow = "initial";
}
exports.closeContentMobile = closeContentMobile;
function showOption(option, html) {
    var contentColor = document.querySelector("div.content-option-showing-mobile-color");
    var contentSize = document.querySelector("div.content-option-showing-mobile-sizes");
    var contentPrice = document.querySelector("div.content-option-showing-mobile-prices");
    html.lastElementChild.classList.toggle("up");
    if (option === "COLOR") {
        contentColor.classList.toggle("expose");
    }
    else if (option === "SIZES") {
        contentSize.classList.toggle("expose");
    }
    else {
        contentPrice.classList.toggle("expose");
    }
}
exports.showOption = showOption;
function purchased() {
    var qtd_purchased = document.querySelector("div.number");
    var circle = document.querySelector("div.circle");
    if (qtd_purchased.textContent == " ") {
        circle.classList.remove("hidden");
        qtd_purchased.innerHTML = "1";
    }
    else {
        var qtd = parseInt(qtd_purchased.textContent) + 1;
        qtd_purchased.innerHTML = qtd.toString();
        if (qtd > 9) {
            qtd_purchased.innerHTML = "9+";
            circle.style.justifyContent = "flex-start";
        }
    }
}
function increaseFilter() {
    maxFilter += 8;
    renderItems(__1.blouses);
}
exports.increaseFilter = increaseFilter;
