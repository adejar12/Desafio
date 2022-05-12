import IBlouse from "./interfaces/blouses";
import { getAllBlouses } from "./services/blouses";
import {
  renderColors,
  renderSizes,
  renderItems,
  showOrderBy,
  showFilters,
  closeContentMobile,
  showOption,
  renderMoreColorsMobile,
  increaseFilter,
  renderMoreColors,
} from "./scripts/render";
import { checkEnabled, orderBy } from "./scripts/filters";

export var blouses: IBlouse[];

document.addEventListener("DOMContentLoaded", async function () {
  blouses = await getAllBlouses();
  renderColors(blouses);
  renderSizes(blouses);
  renderItems(blouses);
});

module.exports = {
  checkEnabled,
  showOrderBy,
  showFilters,
  closeContentMobile,
  orderBy,
  showOption,
  renderMoreColorsMobile,
  increaseFilter,
  renderMoreColors,
};
