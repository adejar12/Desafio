import IBlouse from "./interfaces/blouses";
import { getAllBlouses } from "./services/blouses";

const contentColors = document.querySelector("div.content-colors");
const contentSizes = document.querySelector("div.content-sizes");
const contentItems = document.querySelector("div.content-items");

var blouses;

document.addEventListener("DOMContentLoaded", async function () {
  blouses = await getAllBlouses();
  renderColors(blouses);
  renderSizes(blouses);
  renderItems(blouses);
});

function extractProperty(blouses: IBlouse[], property: string): Array<IBlouse> {
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
  } else {
    var sizes = [];
    blouses.map((blouse) => {
      blouse.size.map((size) => {
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

function renderColors(blouses: IBlouse[]) {
  const filteredBlouses = extractProperty(blouses, "color");

  while (contentColors.firstChild) {
    contentColors.removeChild(contentColors.firstChild);
  }

  filteredBlouses.map((blouse, index) => {
    if (index > 4) {
      return;
    }

    var contentSquare = document.createElement("div");
    contentSquare.className = "content-square";

    var square = document.createElement("div");
    square.className = "square";
    square.onclick = () => {
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

function renderSizes(blouses: IBlouse[]) {
  const filteredSizes = extractProperty(blouses, "size");

  while (contentSizes.firstChild) {
    contentSizes.removeChild(contentSizes.firstChild);
  }

  filteredSizes.map((blouse) => {
    var squareSizes = document.createElement("div");
    squareSizes.className = "square-sizes";
    squareSizes.onclick = () => {
      check_enabled(squareSizes, "size");
    };

    var sizesTitle = document.createElement("span");
    sizesTitle.className = "sizes-title";
    sizesTitle.innerHTML = blouse.toString();

    squareSizes.appendChild(sizesTitle);

    contentSizes.appendChild(squareSizes);
  });
}

function renderItems(blouses: IBlouse[]) {
  while (contentItems.firstChild) {
    contentItems.removeChild(contentItems.firstChild);
  }

  blouses.map((blouse, index) => {
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
    price.innerHTML = `R$ ${addZero(convertPointToComma(blouse.price))}`;

    var inUpTo = document.createElement("span");
    inUpTo.className = "in-up-to";
    inUpTo.innerHTML = `até ${blouse.parcelamento[0]}x de R$:${addZero(
      convertPointToComma(blouse.parcelamento[1])
    )}`;

    var buttonBuy = document.createElement("div");
    buttonBuy.className = "button-buy";

    var buttonBuyText = document.createElement("span");
    buttonBuyText.innerHTML = "COMPRAR";

    buttonBuy.appendChild(buttonBuyText);

    contentItem.append(image, nameProduct, price, inUpTo, buttonBuy);

    contentItems.appendChild(contentItem);
  });
}

function convertPointToComma(value: number): string {
  return value.toString().replace(".", ",");
}

function addZero(value: string): string {
  const values = value.split(",");
  if (!values[1]) {
    return `${value},00`;
  } else {
    const valueInt = parseInt(values[1]);
    if (valueInt < 10) {
      return `${value[0]},${value[1]}0`;
    }
  }

  return value;
}

function filterColor(blouses: IBlouse[], color: string): void {
  renderItems(
    blouses.filter((blouse) => {
      return blouse.color === color;
    })
  );
}

function check_enabled(div: HTMLElement, filter: string): void {
  filterColor(blouses, filter);

  if (div.classList.value.indexOf("checked") === -1) {
    div.classList.add("checked");
  } else {
    div.classList.remove("checked");
  }
}
