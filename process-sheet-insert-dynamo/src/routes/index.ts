import { Router } from "express";

import { ProcessSheetController } from "@controller/index";

export const routes: Router = Router();

routes.post("/receive-sheet", new ProcessSheetController().handle);
