import { Consumer } from "sqs-consumer";
import { SQSClient } from "@aws-sdk/client-sqs";

import { ILogger } from "@contracts/index";
import { HandleMessage } from "@handle/index";

export class QueueConsumer {
  private consumer: Consumer | null;
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.consumer = null;
    this.logger = logger;
  }

  public getInstance(queueUrl: string, sqs: SQSClient): Consumer {
    if (!this.consumer) {
      const handleMessage = new HandleMessage(this.logger);

      this.consumer = Consumer.create({
        queueUrl,
        sqs,
        handleMessage: handleMessage.handleMessage.bind(handleMessage),
      });

      this.configureEmitters();

      return this.consumer;
    }

    return this.consumer;
  }

  private configureEmitters(): void {
    this.consumer &&
      this.consumer.on("message_received", () => {
        this.logger.debug("Message received with sucess");
      });

    this.consumer &&
      this.consumer.on("processing_error", (error) => {
        this.logger.debug("Error in processing received message", error);
      });

    this.consumer &&
      this.consumer.on("error", (error) => {
        this.logger.debug("Error during received message", error);
      });
  }
}
