export interface ILogger {
  debug(message: string, error?: Error): void;
}
