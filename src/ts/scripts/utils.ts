import IBlouse from "../interfaces/blouses";

export function convertPointToComma(value: number): string {
  return value.toString().replace(".", ",");
}

export function addZero(value: string): string {
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

export function extractProperty(
  blouses: IBlouse[],
  property: string
): Array<IBlouse> {
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
