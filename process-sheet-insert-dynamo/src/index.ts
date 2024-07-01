import { processSheetApi } from "@core/index";
import { Env } from "@environment/index";

processSheetApi.listen(Number(Env.PORT), () =>
  console.log("Starting process sheet insert dynamo service...")
);
