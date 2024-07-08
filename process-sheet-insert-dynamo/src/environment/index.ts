import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const nodeEnv = z.enum(["development", "production"]);

const envSchema = z.object({
  PORT: z.string(),
  BUCKET_NAME: z.string(),
  REGION: z.string(),
  AWS_ENDPOINT: z.string(),
  SERVICE_NAME: z.string(),
  NODE_ENV: nodeEnv.default("development").optional(),
});

export const Env = envSchema.parse(process.env);
