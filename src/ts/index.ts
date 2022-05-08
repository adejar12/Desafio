import IBlouse from "./interfaces/blouses";
import { getAllBlouses } from "./services/blouses";

var blouses: IBlouse[];
var filtersColors = new Array<String>();
var filtersSizes = new Array<String>();
var filtersPrices = new Array<String>();
var orderFilters = "";
var maxFilter = 8;
var maxColors = 4;
var blousesFiltered = new Array<IBlouse>();

document.addEventListener("DOMContentLoaded", async function () {
  blouses = await getAllBlouses();
  blousesFiltered = blouses;
  renderColors(blousesFiltered);
  renderSizes(blousesFiltered);
  renderItems(blousesFiltered);
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
  const contentColors = document.querySelector("div.content-colors");

  while (contentColors.firstChild) {
    contentColors.removeChild(contentColors.firstChild);
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
      check_enabled(square, "color", blouse.color);
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
  const contentSizes = document.querySelector("div.content-sizes");

  while (contentSizes.firstChild) {
    contentSizes.removeChild(contentSizes.firstChild);
  }

  filteredSizes.map((blouse) => {
    var squareSizes = document.createElement("div");
    squareSizes.className = "square-sizes";
    squareSizes.onclick = () => {
      check_enabled(squareSizes, "size", blouse.toString());
    };

    var sizesTitle = document.createElement("span");
    sizesTitle.className = "sizes-title";
    sizesTitle.innerHTML = blouse.toString();

    squareSizes.appendChild(sizesTitle);

    contentSizes.appendChild(squareSizes);
  });
}

function renderItems(blouses: IBlouse[]) {
  const btnLoadMore = document.querySelector("div.load-more");
  const contentItems = document.querySelector("div.content-items");

  while (contentItems.firstChild) {
    contentItems.removeChild(contentItems.firstChild);
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
      return `${values[0]},${values[1]}0`;
    }
  }

  return value;
}

function filterColor(): void {
  if (filtersColors.length === 0) {
    blousesFiltered = blouses;
    if (filtersSizes.length > 0) {
      filterSizes();
    }
    if (filtersPrices.length > 0) {
      filterPrices();
    }

    orderBy(orderFilters);
  } else {
    blousesFiltered = blousesFiltered.filter((blouse) => {
      if (
        filtersColors.filter((color) => {
          return blouse.color === color;
        }).length > 0
      ) {
        return blouse;
      }
    });

    renderItems(blousesFiltered);
  }
}

function filterSizes(): void {
  if (filtersSizes.length === 0) {
    blousesFiltered = blouses;
    if (filtersColors.length > 0) {
      filterColor();
    }
    if (filtersPrices.length > 0) {
      filterPrices();
    }

    orderBy(orderFilters);
  } else {
    blousesFiltered = blouses.filter((blouse) => {
      if (
        filtersSizes.filter((size) => {
          if (
            blouse.size.filter((blouseSize) => {
              if (blouseSize === size) {
                return blouseSize;
              }
            }).length > 0
          ) {
            return size;
          }
        }).length > 0
      ) {
        return blouse;
      }
    });

    if (filtersColors.length === 0 && filtersPrices.length === 0) {
      renderItems(blousesFiltered);
      return;
    }
    if (filtersColors.length > 0) {
      filterColor();
    }
    if (filtersPrices.length > 0) {
      filterPrices();
    }
  }
}

function filterPrices(): void {
  if (filtersPrices.length === 0) {
    blousesFiltered = blouses;
    if (filtersColors.length > 0) {
      filterColor();
    }
    if (filtersSizes.length > 0) {
      filterSizes();
    }

    orderBy(orderFilters);
  } else {
    blousesFiltered = blousesFiltered.filter((blouse) => {
      if (
        filtersPrices.filter((oneValue) => {
          const value = oneValue.split("<");
          if (parseInt(value[0]) === 0) {
            return blouse.price <= parseInt(value[1]);
          }
          if (parseInt(value[1]) === 0) {
            return blouse.price >= parseInt(value[0]);
          }
          if (
            blouse.price > parseInt(value[0]) &&
            blouse.price < parseInt(value[1])
          ) {
            return oneValue;
          }
        }).length > 0
      ) {
        return blouse;
      }
    });
    renderItems(blousesFiltered);
  }
}

export function orderBy(select: string): void {
  orderFilters = select;
  if (select === "mas_recente") {
    renderItems(
      blousesFiltered.sort((a, b) => {
        if (new Date(a.date) < new Date(b.date)) {
          return -1;
        }
        if (new Date(a.date) > new Date(b.date)) {
          return 1;
        }

        return 0;
      })
    );
  } else if (select === "maior_preco" || select === "menor_preco") {
    renderItems(
      blousesFiltered.sort((a, b) => {
        if (a.price > b.price) {
          if (select === "maior_preco") {
            return -1;
          } else {
            return 1;
          }
        }
        if (a.price < b.price) {
          if (select === "maior_preco") {
            return 1;
          } else {
            return -1;
          }
        }

        return 0;
      })
    );
  } else {
    renderItems(blousesFiltered);
  }
}

export function check_enabled(
  div: HTMLElement,
  typeFilter: string,
  filter: string
): void {
  //Experimente usar o toggle, ta no minuto 1:00:40
  if (div.classList.value.indexOf("checked") === -1) {
    div.classList.add("checked");
    if (typeFilter === "size") {
      filtersSizes.push(filter);
    } else if (typeFilter === "color") {
      filtersColors.push(filter);
    } else {
      filtersPrices.push(filter);
    }
  } else {
    div.classList.remove("checked");
    if (typeFilter === "size") {
      filtersSizes.splice(filtersSizes.indexOf(filter), 1);
    } else if (typeFilter === "color") {
      filtersColors = filtersColors.filter((item) => {
        return item !== filter;
      });
    } else {
      filtersPrices = filtersPrices.filter((item) => {
        return item !== filter;
      });
    }
  }

  if (typeFilter === "size") {
    filterSizes();
  } else if (typeFilter === "color") {
    filterColor();
  } else {
    filterPrices();
  }
}

export function increaseFilter(): void {
  maxFilter += 8;
  renderItems(blouses);
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

export function showFilters(): void {
  console.log("aqui");
}

export function showOrderBy(): void {
  console.log("aqui");
}
