import chalk from "chalk";

import { ILogger } from "@contracts/index";

export class Logger implements ILogger {
  private serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  debug(message: string, error?: Error): void {
    if (error) {
      console.log(
        chalk.red(
          `[${this.serviceName} | ${new Date().toISOString()}]: ${message}`
        ),
        error?.message
      );
    }

    console.log(
      chalk.yellow(
        `[${this.serviceName} | ${new Date().toISOString()}]: ${message}`
      )
    );
  }
}
