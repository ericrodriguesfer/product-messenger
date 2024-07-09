import { Message } from "@aws-sdk/client-sqs";

import {
  IBodyMessage,
  IHandleMessage,
  ILogger,
  IMessage,
} from "@contracts/index";

export class HandleMessageHospital implements IHandleMessage {
  private logger: ILogger<IBodyMessage>;

  constructor(logger: ILogger<IBodyMessage>) {
    this.logger = logger;
  }

  public async handleMessage(message: IMessage): Promise<Message | void> {
    if (!message) return;

    const messageBody = JSON.parse(message.Body ?? "") as IBodyMessage;

    this.logger.debug("Received dead message of principal queue", {
      isHospital: true,
    });
    this.logger.debug("It happened a problem on process this sheet", {
      data: messageBody,
      isHospital: true,
    });

    return;
  }
}
