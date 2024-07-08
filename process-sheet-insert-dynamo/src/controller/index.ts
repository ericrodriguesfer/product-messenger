import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ProcessSheetUseCase } from "@use-case/index";
import { IController, IUseCase } from "@contracts/index";

export class ProcessSheetController implements IController {
  private processSheetUseCase: IUseCase;

  constructor() {
    this.processSheetUseCase = new ProcessSheetUseCase();
  }

  public async handle(
    request: Request,
    response: Response
  ): Promise<Response | void> {
    const { sheetKey } = request.body as { sheetKey: string };

    await this.processSheetUseCase.execute(sheetKey);

    return response.status(StatusCodes.OK).send();
  }
}
