import { Message } from "@aws-sdk/client-sqs";
import {
  IBodyMessage,
  IHandleMessage,
  ILogger,
  IMessage,
} from "@contracts/index";

export class HandleMessage implements IHandleMessage {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  public async handleMessage(message: IMessage): Promise<Message | void> {
    if (!message) return;
    const messageBody = JSON.parse(message.Body ?? "") as IBodyMessage;
  }
}
