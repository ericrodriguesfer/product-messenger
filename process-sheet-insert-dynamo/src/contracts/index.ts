import { NextFunction, Request, Response } from "express";

export interface IController {
  handle(request: Request, response: Response): Promise<Response | void>;
}

export interface IUseCase {
  execute(sheetKey: string): Promise<void>;
}

export interface ISheetData {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
}

export interface IBucketS3 {
  getSheetToBucketS3(sheetKey: string): Promise<Buffer>;
}

export interface ISheet {
  convertBufferToObjectArray(sheet: Buffer): Array<ISheetData>;
}

export interface IDynamoDB {
  getActiveProducts(): Promise<Array<ISheetData>>;
  inactivateActiveProducts(items: Array<ISheetData>): Promise<void>;
  insertActiveProducts(items: Array<ISheetData>): Promise<void>;
}

export interface ILogger {
  debug(message: string, error?: Error): void;
}

export interface IFilterException {
  exceptionsFilter(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void>;
}
