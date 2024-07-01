import { Consumer } from "sqs-consumer";
import { SQSClient } from "@aws-sdk/client-sqs";

import { Env } from "@environment/index";
import { ILogger } from "@contracts/index";
import { Logger } from "@logger/index";
import { QueueConsumer } from "@consumer/index";

const logger: ILogger = new Logger(Env.SERVICE_NAME);
const queueConsumer = new QueueConsumer(logger);

queueConsumer
  .getInstance(
    Env.SQS_QUEUE_URL,
    new SQSClient({
      region: Env.REGION,
      credentials: {
        accessKeyId: Env.ACCESS_KEY_ID,
        secretAccessKey: Env.SECRET_ACCESS_ID,
      },
    })
  )
  .start();
