import { Router } from "express";

import { ProcessSheetController } from "@controller/index";
import { IController } from "@contracts/index";

export const routes: Router = Router();

const processSheetControler: IController = new ProcessSheetController();

routes.post(
  "/receive-sheet",
  processSheetControler.handle.bind(processSheetControler)
);
