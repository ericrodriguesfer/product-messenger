import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const nodeEnv = z.enum(["development", "production"]);

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: nodeEnv.default("development").optional(),
});

export const Env = envSchema.parse(process.env);
