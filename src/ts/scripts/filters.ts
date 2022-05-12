import IBlouse from "../interfaces/blouses";
import { renderItems } from "./render";
import { blouses } from "..";

var filtersColors = new Array<String>();
var filtersSizes = new Array<String>();
var filtersPrices = new Array<String>();
var orderFilters = "";

export var blousesFiltered = new Array<IBlouse>();

export function checkEnabled(
  div: HTMLElement,
  typeFilter: string,
  filter: string
): void {
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

  filterItems();
}

function filterItems(): void {
  blousesFiltered = blouses;

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

  renderItems(blousesFiltered);
}

function filterColors(): void {
  const colors = blouses.filter((blouse) => {
    if (
      filtersColors.filter((color) => {
        if (blouse.color === color) {
          return color;
        }
      }).length > 0
    ) {
      return blouse;
    }
  });

  blousesFiltered = blousesFiltered.filter((blouse) => {
    if (
      colors.filter((color) => {
        if (blouse.color === color.color) {
          return color;
        }
      }).length > 0
    ) {
      return blouse;
    }
  });
}

function filterSizes(): void {
  const sizes = blouses.filter((blouse) => {
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

  blousesFiltered = blousesFiltered.filter((blouse) => {
    if (
      blouse.size.filter((blouseSize) => {
        if (
          sizes.filter((size) => {
            if (
              size.size.filter((sizeSize) => {
                if (sizeSize === blouseSize) {
                  return sizeSize;
                }
              }).length > 0
            ) {
              return size;
            }
          }).length > 0
        ) {
          return blouseSize;
        }
      }).length > 0
    ) {
      return blouse;
    }
  });
}

function filterPrices(): void {
  const prices = blouses.filter((blouse) => {
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

  blousesFiltered = blousesFiltered.filter((blouse) => {
    if (
      prices.filter((blousePrice) => {
        if (blouse.price === blousePrice.price) {
          return blousePrice;
        }
      }).length > 0
    ) {
      return blouse;
    }
  });
}

export function orderBy(select: string): void {
  orderFilters = select;
  if (blousesFiltered.length === 0) {
    blousesFiltered = blouses;
  }
  if (select === "mais_recente") {
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
