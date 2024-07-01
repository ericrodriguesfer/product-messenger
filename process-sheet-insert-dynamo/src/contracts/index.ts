import { Request, Response } from "express";

export interface IController {
  handle(request: Request, response: Response): Promise<void>;
}

export interface IUseCase {
  execute(sheetKey: string): Promise<void>;
}
