import { Consumer } from "sqs-consumer";
import { SQSClient } from "@aws-sdk/client-sqs";

import { Env } from "./environment/env";
import { IBodyMessage, IMessage, ILogger } from "./contracts";
import { Logger } from "./logger/Logger";

const logger: ILogger = new Logger(Env.SERVICE_NAME);

const app: Consumer = Consumer.create({
  queueUrl: Env.SQS_QUEUE_URL,
  sqs: new SQSClient({
    region: Env.REGION,
    credentials: {
      accessKeyId: Env.ACCESS_KEY_ID,
      secretAccessKey: Env.SECRET_ACCESS_ID,
    },
  }),
  handleMessage: async (message: IMessage) => {
    if (!message) return;
    const messageBody = JSON.parse(message.Body ?? "") as IBodyMessage;
  },
});

app.on("message_received", () => {
  logger.debug("Message recevid with sucess");
});

app.on("processing_error", (error) => {
  logger.debug("Error in processing recevid message", error);
});

app.on("error", (error) => {
  logger.debug("Error during recevid message", error);
});

app.start();
