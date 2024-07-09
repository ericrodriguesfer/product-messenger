import { Message } from "@aws-sdk/client-sqs";

import {
  IBodyMessage,
  IHandleMessage,
  ILogger,
  IMessage,
} from "@contracts/index";
import { processSheetApi } from "@api/index";
import { PATH_ROUTES_PROCESS_SHEET_API } from "@constants/index";

export class HandleMessageConsumer implements IHandleMessage {
  private logger: ILogger<IBodyMessage>;

  constructor(logger: ILogger<IBodyMessage>) {
    this.logger = logger;
  }

  public async handleMessage(message: IMessage): Promise<Message | void> {
    if (!message) return;

    const messageBody = JSON.parse(message.Body ?? "") as IBodyMessage;

    this.logger.debug("Sending sheet key to processing service", {});

    const response = await processSheetApi.post(
      PATH_ROUTES_PROCESS_SHEET_API.RECEIVE_SHEET.toString(),
      {
        sheetKey: messageBody.Records[0].s3.object.key,
      }
    );

    this.logger.debug("Receiving response of process sheet service", {});

    if (response.status === 200) return;
  }
}
