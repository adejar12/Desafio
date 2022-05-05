import IBlouse from "../interfaces/blouses";

export const getAllBlouses = async (): Promise<IBlouse[]> => {
  return await new Promise((resolve, reject) => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data: IBlouse[]) => {
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};
