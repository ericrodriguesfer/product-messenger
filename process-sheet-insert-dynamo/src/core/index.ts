import express, { Application } from "express";

import { routes } from "@routes/index";

export const processSheetApi: Application = express();

processSheetApi.use(express.json());
processSheetApi.use(routes);
