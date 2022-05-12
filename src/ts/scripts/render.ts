import IBlouse from "../interfaces/blouses";
import { checkEnabled } from "./filters";
import { blouses } from "..";
import { extractProperty, convertPointToComma, addZero } from "./utils";

var maxColors = 4;
var maxFilter = 8;

export function renderItems(blouses: IBlouse[]) {
  const btnLoadMore = document.querySelector("div.load-more");
  const contentItems = document.querySelector("div.content-items");

  while (contentItems.firstChild) {
    contentItems.removeChild(contentItems.firstChild);
  }

  if (blouses.length === 0) {
    btnLoadMore.classList.add("hidden");
    return;
  }

  blouses.map((blouse, index) => {
    if (index > maxFilter) {
      btnLoadMore.classList.remove("hidden");
      return;
    } else {
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
    price.innerHTML = `R$ ${addZero(convertPointToComma(blouse.price))}`;

    var inUpTo = document.createElement("span");
    inUpTo.className = "in-up-to";
    inUpTo.innerHTML = `até ${blouse.parcelamento[0]}x de R$:${addZero(
      convertPointToComma(blouse.parcelamento[1])
    )}`;

    var buttonBuy = document.createElement("div");
    buttonBuy.className = "button-buy";
    buttonBuy.onclick = () => {
      purchased();
    };

    var buttonBuyText = document.createElement("span");
    buttonBuyText.innerHTML = "COMPRAR";

    buttonBuy.appendChild(buttonBuyText);

    contentItem.append(image, nameProduct, price, inUpTo, buttonBuy);

    contentItems.appendChild(contentItem);
  });
}

export function renderColors(blouses: IBlouse[]) {
  const filteredBlouses = extractProperty(blouses, "color");
  const contentColors = document.querySelector("div.content-colors");
  const contentColorsMobile = document.querySelector(
    "div.content-colors-mobile"
  );

  while (contentColors.firstChild) {
    contentColors.removeChild(contentColors.firstChild);
  }

  while (contentColorsMobile.firstChild) {
    contentColorsMobile.removeChild(contentColorsMobile.firstChild);
  }

  filteredBlouses.map((blouse, index) => {
    if (index > maxColors) {
      return;
    }

    var contentSquare = document.createElement("div");
    contentSquare.className = "content-square";

    var square = document.createElement("div");
    square.className = "square";
    square.onclick = () => {
      checkEnabled(square, "color", blouse.color);
    };

    var squareTitle = document.createElement("span");
    squareTitle.className = "square-title";
    squareTitle.innerHTML = blouse.color;

    contentSquare.appendChild(square);
    contentSquare.appendChild(squareTitle);

    contentColors.appendChild(contentSquare);
  });

  filteredBlouses.map((blouse, index) => {
    if (index > maxColors) {
      return;
    }

    var contentSquare = document.createElement("div");
    contentSquare.className = "content-square";

    var square = document.createElement("div");
    square.className = "square";
    square.onclick = () => {
      checkEnabled(square, "color", blouse.color);
    };

    var squareTitle = document.createElement("span");
    squareTitle.className = "square-title";
    squareTitle.innerHTML = blouse.color;

    contentSquare.appendChild(square);
    contentSquare.appendChild(squareTitle);

    contentColorsMobile.appendChild(contentSquare);
  });
}

export function renderSizes(blouses: IBlouse[]) {
  const filteredSizes = extractProperty(blouses, "size");
  const contentSizes = document.querySelector("div.content-sizes");
  const contentSizesMobile = document.querySelector("div.content-sizes-mobile");

  while (contentSizes.firstChild) {
    contentSizes.removeChild(contentSizes.firstChild);
  }

  while (contentSizesMobile.firstChild) {
    contentSizesMobile.removeChild(contentSizesMobile.firstChild);
  }

  filteredSizes.map((blouse) => {
    var squareSizes = document.createElement("div");
    squareSizes.className = "square-sizes";
    squareSizes.onclick = () => {
      checkEnabled(squareSizes, "size", blouse.toString());
    };

    var sizesTitle = document.createElement("span");
    sizesTitle.className = "sizes-title";
    sizesTitle.innerHTML = blouse.toString();

    squareSizes.appendChild(sizesTitle);

    contentSizes.appendChild(squareSizes);
  });

  filteredSizes.map((blouse) => {
    var squareSizes = document.createElement("div");
    squareSizes.className = "square-sizes";
    squareSizes.onclick = () => {
      checkEnabled(squareSizes, "size", blouse.toString());
    };

    var sizesTitle = document.createElement("span");
    sizesTitle.className = "sizes-title";
    sizesTitle.innerHTML = blouse.toString();

    squareSizes.appendChild(sizesTitle);

    contentSizesMobile.appendChild(squareSizes);
  });
}

export function renderMoreColors(value: HTMLElement): void {
  const contentSizes = document.querySelector("p.more-colors-title");

  let contentItem = document.createElement("i");

  if (value.textContent.indexOf("todas") !== -1) {
    contentSizes.innerHTML = "Ver menos";

    contentItem.className = "arrow up";
    contentItem.style.marginLeft = "40px";
    contentItem.style.marginBottom = "-2px";

    contentSizes.appendChild(contentItem);
    maxColors = 8;
  } else {
    contentSizes.innerHTML = "Ver todas as cores ";

    contentItem.className = "arrow down";
    contentItem.style.marginLeft = "3px";
    contentItem.style.marginBottom = "2px";

    contentSizes.appendChild(contentItem);
    maxColors = 4;
  }

  renderColors(blouses);
}

export function renderMoreColorsMobile(value: HTMLElement): void {
  const contentSizes = document.querySelector("p.more-colors-title-mobile");

  let contentItem = document.createElement("i");

  if (value.textContent.indexOf("todas") !== -1) {
    contentSizes.innerHTML = "Ver menos";

    contentItem.className = "arrow up";
    contentItem.style.marginLeft = "40px";
    contentItem.style.marginBottom = "-2px";

    contentSizes.appendChild(contentItem);
    maxColors = 8;
  } else {
    contentSizes.innerHTML = "Ver todas as cores ";

    contentItem.className = "arrow down";
    contentItem.style.marginLeft = "3px";
    contentItem.style.marginBottom = "2px";

    contentSizes.appendChild(contentItem);
    maxColors = 4;
  }

  renderColors(blouses);
}

export function showFilters(): void {
  const contentSizes = document.querySelector("div.content-order-by-mobile");
  document.querySelector("body").style.overflow = "hidden";
  contentSizes.classList.toggle("show");
}

export function showOrderBy(): void {
  const contentFilters = document.querySelector("div.content-filters-mobile");
  document.querySelector("body").style.overflow = "hidden";
  contentFilters.classList.toggle("show");
}

export function closeContentMobile(): void {
  const contentSizes = document.querySelector("div.content-order-by-mobile");
  const contentFilters = document.querySelector("div.content-filters-mobile");
  contentSizes.classList.remove("show");
  contentFilters.classList.remove("show");
  document.querySelector("body").style.overflow = "initial";
}

export function showOption(option: string, html: HTMLElement): void {
  const contentColor = document.querySelector(
    "div.content-option-showing-mobile-color"
  );
  const contentSize = document.querySelector(
    "div.content-option-showing-mobile-sizes"
  );
  const contentPrice = document.querySelector(
    "div.content-option-showing-mobile-prices"
  );

  html.lastElementChild.classList.toggle("up");

  if (option === "COLOR") {
    contentColor.classList.toggle("expose");
  } else if (option === "SIZES") {
    contentSize.classList.toggle("expose");
  } else {
    contentPrice.classList.toggle("expose");
  }
}

function purchased() {
  const qtd_purchased = document.querySelector("div.number");
  const circle: HTMLElement = document.querySelector("div.circle");

  if (qtd_purchased.textContent == " ") {
    circle.classList.remove("hidden");
    qtd_purchased.innerHTML = "1";
  } else {
    const qtd = parseInt(qtd_purchased.textContent) + 1;

    qtd_purchased.innerHTML = qtd.toString();

    if (qtd > 9) {
      qtd_purchased.innerHTML = "9+";
      circle.style.justifyContent = "flex-start";
    }
  }
}

export function increaseFilter(): void {
  maxFilter += 8;
  renderItems(blouses);
}
