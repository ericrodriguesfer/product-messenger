import "express-async-errors";
import express, { Application } from "express";

import { routes } from "@routes/index";
import { Env } from "@environment/index";
import { IFilterException, ILogger } from "@contracts/index";
import { Logger } from "@logger/index";
import { FilterException } from "@filters/index";

export const processSheetApi: Application = express();

const logger: ILogger = new Logger(Env.SERVICE_NAME);
const filterException: IFilterException = new FilterException(logger);

processSheetApi.use(express.json());
processSheetApi.use("/api-v1", routes);
processSheetApi.use(filterException.exceptionsFilter.bind(filterException));
