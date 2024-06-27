provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region

  skip_credentials_validation = var.credentials_validation
  skip_metadata_api_check     = var.metadata_api_check
  skip_requesting_account_id  = var.requesting_account_id

  endpoints {
    s3  = var.bucket_endpoint
    sqs = var.queue_endpoint
  }

  default_tags {
    tags = {
      Environment = var.environment
      Service     = var.service
    }
  }
}

terraform {
  required_version = ">= 1.8.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>4.16"
    }
  }
}
