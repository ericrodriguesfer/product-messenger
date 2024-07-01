import { Request, Response } from "express";

import { ProcessSheetUseCase } from "@use-case/index";
import { IController, IUseCase } from "@contracts/index";

export class ProcessSheetController implements IController {
  private processSheetUseCase: IUseCase;

  constructor() {
    this.processSheetUseCase = new ProcessSheetUseCase();
  }

  public async handle(request: Request, response: Response): Promise<void> {
    const { sheetKey } = request.body as { sheetKey: string };

    this.processSheetUseCase.execute(sheetKey);
  }
}
