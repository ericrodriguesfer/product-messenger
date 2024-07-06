import axios from "axios";

import { Env } from "@environment/index";

export const processSheetApi = axios.create({
  baseURL: Env.PROCESS_SHEET_API_URL,
});
