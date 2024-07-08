import xlsx from "node-xlsx";

import { ISheet, ISheetData } from "@contracts/index";

export class Sheet implements ISheet {
  constructor() {}

  public convertBufferToObjectArray(sheet: Buffer): Array<ISheetData> {
    const [header, ...rows] = xlsx.parse(sheet)[0].data;

    const sheetData: Array<ISheetData> = rows.map((row) => {
      return header.reduce((object, key, index) => {
        object[key.toLowerCase()] = row[index];

        return object;
      }, [] as Array<ISheetData>);
    });

    return sheetData;
  }
}
