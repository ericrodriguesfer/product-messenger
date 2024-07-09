data "aws_region" "current" {}

resource "aws_sqs_queue" "queue" {
  name                        = var.queue_name
  fifo_queue                  = var.fifo_queue
  content_based_deduplication = var.content_based_deduplication

  policy = <<POLICY
    {
      "Version": "2024-23-06",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": "*",
          "Action": "sqs:SendMessage",
          "Resource": "arn:aws:sqs:*:*:${var.queue_name}",
          "Condition": {
            "ArnEquals": {
              "aws:SourceArn": "${aws_s3_bucket.bucket.arn}"
            }
          }
        }
      ]
    }
    POLICY
}

resource "aws_sqs_queue" "dead_letter" {
  name                        = var.dlq_name
  fifo_queue                  = var.fifo_queue
  content_based_deduplication = var.content_based_deduplication

  redrive_allow_policy = jsonencode({
    redrivePermission = "byQueue"
    sourceQueueArns   = [aws_sqs_queue.queue.arn]
  })
}

resource "aws_sqs_queue_redrive_policy" "queue" {
  queue_url = aws_sqs_queue.queue.id

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.dead_letter.arn
    maxReceiveCount     = var.max_receive_count
  })
}

resource "aws_s3_bucket" "bucket" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.bucket.id

  queue {
    queue_arn = aws_sqs_queue.queue.arn
    events    = ["s3:ObjectCreated:*"]
  }
}

resource "aws_dynamodb_table" "dynamodb_table" {
  name           = var.table_name
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "id"
  range_key      = "category"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "category"
    type = "S"
  }

  attribute {
    name = "name"
    type = "S"
  }

  attribute {
    name = "uuid"
    type = "S"
  }

  attribute {
    name = "subcategory"
    type = "S"
  }

  attribute {
    name = "brand"
    type = "S"
  }

  attribute {
    name = "price"
    type = "N"
  }

  attribute {
    name = "created_at"
    type = "S"
  }

  attribute {
    name = "invalid_at"
    type = "S"
  }

  global_secondary_index {
    name            = "NameIndex"
    hash_key        = "name"
    projection_type = "ALL"
    write_capacity  = 10
    read_capacity   = 10
  }

  global_secondary_index {
    name            = "UUIDIndex"
    hash_key        = "uuid"
    projection_type = "ALL"
    write_capacity  = 10
    read_capacity   = 10
  }

  global_secondary_index {
    name            = "SubcategoryIndex"
    hash_key        = "subcategory"
    projection_type = "ALL"
    write_capacity  = 10
    read_capacity   = 10
  }

  global_secondary_index {
    name            = "BrandIndex"
    hash_key        = "brand"
    projection_type = "ALL"
    write_capacity  = 10
    read_capacity   = 10
  }

  global_secondary_index {
    name            = "PriceIndex"
    hash_key        = "price"
    projection_type = "ALL"
    write_capacity  = 10
    read_capacity   = 10
  }

  global_secondary_index {
    name            = "CreatedAtIndex"
    hash_key        = "created_at"
    projection_type = "ALL"
    write_capacity  = 10
    read_capacity   = 10
  }

  global_secondary_index {
    name            = "InvalidAtIndex"
    hash_key        = "invalid_at"
    projection_type = "ALL"
    write_capacity  = 10
    read_capacity   = 10
  }

  tags = {
    Name        = "dynamodb-table-${var.table_name}-1"
    Environment = var.environment
  }
}
