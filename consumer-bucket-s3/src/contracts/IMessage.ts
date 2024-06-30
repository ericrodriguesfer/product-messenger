import { Message } from "@aws-sdk/client-sqs";

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
