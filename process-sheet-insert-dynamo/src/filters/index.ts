import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { IFilterException, ILogger } from "@contracts/index";

export class FilterException implements IFilterException {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  public async exceptionsFilter(
    error: Error,
    _request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    if (error) {
      this.logger.debug(error.message, error);
      return response.status(StatusCodes.BAD_REQUEST).send();
    }

    next();
  }
}
