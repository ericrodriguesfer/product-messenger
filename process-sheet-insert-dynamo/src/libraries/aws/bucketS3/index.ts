import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { Env } from "@environment/index";
import { IBucketS3 } from "@contracts/index";

export class BucketS3 implements IBucketS3 {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: Env.REGION,
      endpoint: Env.AWS_ENDPOINT,
    });
  }

  public async getSheetToBucketS3(sheetKey: string): Promise<Buffer> {
    const commandBucket = new GetObjectCommand({
      Bucket: Env.BUCKET_NAME,
      Key: sheetKey,
    });

    const bucketResponse = await this.client.send(commandBucket);
    const sheetStream = bucketResponse.Body?.transformToWebStream();

    const chunks = [];
    for await (let chunk of sheetStream!) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    return buffer;
  }
}
