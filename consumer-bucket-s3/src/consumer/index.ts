import { Consumer } from "sqs-consumer";
import { SQSClient } from "@aws-sdk/client-sqs";

import { IBodyMessage, ILogger, IQueueConsumer } from "@contracts/index";
import { HandleMessageConsumer } from "@/handlers/index";

export class QueueConsumer implements IQueueConsumer {
  private consumer: Consumer | null;
  private logger: ILogger<IBodyMessage>;

  constructor(logger: ILogger<IBodyMessage>) {
    this.consumer = null;
    this.logger = logger;
  }

  public getInstance(queueUrl: string, sqs: SQSClient): Consumer {
    if (!this.consumer) {
      const handleMessage = new HandleMessageConsumer(this.logger);

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
        this.logger.debug("Message received with sucess", {});
      });

    this.consumer &&
      this.consumer.on("processing_error", (error) => {
        this.logger.debug("Error in processing received message", { error });
      });

    this.consumer &&
      this.consumer.on("error", (error) => {
        this.logger.debug("Error during received message", { error });
      });
  }
}
