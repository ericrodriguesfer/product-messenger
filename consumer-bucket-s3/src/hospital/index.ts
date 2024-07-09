import { SQSClient } from "@aws-sdk/client-sqs";
import { Consumer } from "sqs-consumer";

import { IBodyMessage, ILogger, IQueueConsumer } from "@contracts/index";
import { HandleMessageHospital } from "@handlers/index";

export class HospitalConsumer implements IQueueConsumer {
  private consumer: Consumer | null;
  private logger: ILogger<IBodyMessage>;

  constructor(logger: ILogger<IBodyMessage>) {
    this.consumer = null;
    this.logger = logger;
  }

  public getInstance(queueUrl: string, sqs: SQSClient): Consumer {
    if (!this.consumer) {
      const handleMessage = new HandleMessageHospital(this.logger);

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
        this.logger.debug("Message received with sucess", { isHospital: true });
      });
  }
}
