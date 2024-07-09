import { SQSClient } from "@aws-sdk/client-sqs";

import { Env } from "@environment/index";
import { ILogger, IBodyMessage, IQueueConsumer } from "@contracts/index";
import { Logger } from "@logger/index";
import { QueueConsumer } from "@consumer/index";
import { HospitalConsumer } from "@hospital/index";

const logger: ILogger<IBodyMessage> = new Logger<IBodyMessage>(
  Env.SERVICE_NAME
);
const queueConsumer: IQueueConsumer = new QueueConsumer(logger);
const deadQueueConsumer: IQueueConsumer = new HospitalConsumer(logger);
const sqsClient: SQSClient = new SQSClient({
  region: Env.REGION,
  credentials: {
    accessKeyId: Env.ACCESS_KEY_ID,
    secretAccessKey: Env.SECRET_ACCESS_ID,
  },
});

queueConsumer.getInstance(Env.SQS_QUEUE_URL, sqsClient).start();
deadQueueConsumer.getInstance(Env.SQS_DLQ_URL, sqsClient).start();
