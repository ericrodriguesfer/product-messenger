import { Message, SQSClient } from "@aws-sdk/client-sqs";
import { Consumer } from "sqs-consumer";

export interface ILoggerOptionsConfiguration<T> {
  error?: Error;
  isHospital?: boolean;
  data?: T;
}

export interface ILogger<T> {
  debug(
    message: string,
    { data, error, isHospital }: ILoggerOptionsConfiguration<T>
  ): void;
}

interface IBucket {
  name: string;
  ownerIdentity: {
    principalId: string;
  };
  arn: string;
}

interface IObject {
  key: string;
  sequencer: string;
  size: number;
  eTag: string;
}

interface IS3 {
  s3SchemaVersion: string;
  configurationId: string;
  bucket: IBucket;
  object: IObject;
}

interface IRecords {
  eventVersion: string;
  eventSource: string;
  awsRegion: string;
  eventTime: Date;
  eventName: string;
  userIdentity: { principalId: string };
  s3: IS3;
}

export interface IBodyMessage {
  Records: Array<IRecords>;
}

export interface IMessage extends Message {}

export interface IHandleMessage {
  handleMessage?(message: IMessage): Promise<Message | void>;
}

export interface IQueueConsumer {
  getInstance(queueUrl: string, sqs: SQSClient): Consumer;
}
