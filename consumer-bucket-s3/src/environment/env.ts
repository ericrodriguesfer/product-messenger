import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const nodeEnv = z.enum(["development", "production"]);

const envSchema = z.object({
  SQS_QUEUE_URL: z.string(),
  REGION: z.string(),
  ACCESS_KEY_ID: z.string(),
  SECRET_ACCESS_ID: z.string(),
  SERVICE_NAME: z.string(),
  NODE_ENV: nodeEnv.default("development").optional(),
});

export const Env = envSchema.parse(process.env);
