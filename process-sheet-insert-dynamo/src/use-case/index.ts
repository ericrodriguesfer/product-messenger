import { IBucketS3, IDynamoDB, ISheet, IUseCase } from "@contracts/index";
import { BucketS3 } from "@bucketS3/index";
import { DynamoDB } from "@dynamoDB/index";
import { Sheet } from "@sheet/index";

export class ProcessSheetUseCase implements IUseCase {
  private bucketS3: IBucketS3;
  private dynamoDB: IDynamoDB;
  private sheet: ISheet;

  constructor() {
    this.bucketS3 = new BucketS3();
    this.dynamoDB = new DynamoDB();
    this.sheet = new Sheet();
  }

  public async execute(sheetKey: string): Promise<void> {
    const sheetBuffer = await this.bucketS3.getSheetToBucketS3(sheetKey);

    const products = this.sheet.convertBufferToObjectArray(sheetBuffer);

    const activeProducts = await this.dynamoDB.getActiveProducts();

    if (!!activeProducts.length) {
      await this.dynamoDB.inactivateActiveProducts(activeProducts);
    }

    await this.dynamoDB.insertActiveProducts(products);
  }
}
