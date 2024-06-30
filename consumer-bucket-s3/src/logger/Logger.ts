import { ILogger } from "../contracts/ILogger";

export class Logger implements ILogger {
  private serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  debug(message: string, error?: Error): void {
    console.log(`[${this.serviceName}]: ${message}`, error && error.message);
  }
}
