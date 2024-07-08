import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  BatchExecuteStatementCommand,
  DynamoDBDocumentClient,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

import { Env } from "@environment/index";
import { IDynamoDB, ISheetData } from "@contracts/index";
import { generatePartiQL } from "@utils/index";

export class DynamoDB implements IDynamoDB {
  private documentClient: DynamoDBDocumentClient;

  constructor() {
    this.documentClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: Env.REGION,
        endpoint: Env.AWS_ENDPOINT,
      })
    );
  }

  public async getActiveProducts(): Promise<Array<ISheetData>> {
    const commandDynamo = new ScanCommand({
      TableName: "product",
      FilterExpression: "attribute_not_exists(invalid_at)",
      ConsistentRead: true,
    });

    const response = await this.documentClient.send(commandDynamo);

    return response.Items as Array<ISheetData>;
  }

  public async inactivateActiveProducts(
    items: Array<ISheetData>
  ): Promise<void> {
    const commandDynamo = new BatchExecuteStatementCommand({
      Statements: items.map((item: ISheetData) => ({
        Statement: generatePartiQL.inactivateProducts(
          new Date().toISOString(),
          item.id,
          item.category
        ),
      })),
    });

    const response = await this.documentClient.send(commandDynamo);

    if (response.Responses && response.Responses[0].Error) {
      throw new Error("Error update status of products to inactive");
    }
  }

  public async insertActiveProducts(items: Array<ISheetData>): Promise<void> {
    const commandDynamo = new BatchExecuteStatementCommand({
      Statements: items.map((item: ISheetData) => ({
        Statement: generatePartiQL.insertActiveProducts(
          item.id,
          item.name,
          item.category,
          item.subcategory,
          item.brand,
          Number(item.price)
        ),
      })),
    });

    const response = await this.documentClient.send(commandDynamo);

    if (response.Responses && response.Responses[0].Error) {
      throw new Error("Error on insert active products");
    }
  }
}
