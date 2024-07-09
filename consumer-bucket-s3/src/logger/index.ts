import chalk from "chalk";

import {
  IBodyMessage,
  ILogger,
  ILoggerOptionsConfiguration,
} from "@contracts/index";
import { QUEUES_CONSUMERS } from "@constants/index";

export class Logger<T extends IBodyMessage> implements ILogger<T> {
  private serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  debug(
    message: string,
    { data, error, isHospital }: ILoggerOptionsConfiguration<T>
  ): void {
    if (error) {
      console.log(
        chalk.red(
          `[${this.serviceName} | ${
            isHospital ? QUEUES_CONSUMERS.HOSPITAL : QUEUES_CONSUMERS.CONSUMER
          } | ${new Date().toISOString()}]: ${message}`
        ),
        error?.message
      );

      return;
    }

    if (data) {
      console.log(
        chalk.yellow(
          `[${this.serviceName} | ${
            isHospital ? QUEUES_CONSUMERS.HOSPITAL : QUEUES_CONSUMERS.CONSUMER
          } | ${new Date().toISOString()}]: ${message}`
        ),
        data.Records[0].s3.object.key
      );

      return;
    }

    console.log(
      chalk.green(
        `[${this.serviceName} | ${
          isHospital ? QUEUES_CONSUMERS.HOSPITAL : QUEUES_CONSUMERS.CONSUMER
        } | ${new Date().toISOString()}]: ${message}`
      )
    );
  }
}
