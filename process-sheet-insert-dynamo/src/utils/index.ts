import { nanoid } from "nanoid";

export const generatePartiQL = {
  inactivateProducts: (invalidAt: string, id: string, category: string) =>
    `UPDATE product SET invalid_at='${invalidAt}' WHERE id='${id}' AND category='${category}'`,
  insertActiveProducts: (
    uuid: string,
    name: string,
    category: string,
    subcategory: string,
    brand: string,
    price: number
  ) =>
    `INSERT INTO product VALUE {'id':'${nanoid()}', 'uuid':'${uuid}', 'name':'${name}', 'category':'${category}', 'subcategory':'${subcategory}', 'brand':'${brand}', 'price':${price}, 'created_at':'${new Date().toISOString()}'}`,
};
