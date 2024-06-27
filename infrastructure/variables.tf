variable "access_key" {
  type = string
}

variable "secret_key" {
  type = string
}

variable "region" {
  type = string
}

variable "environment" {
  type = string
}

variable "service" {
  type = string
}

variable "queue_name" {
  type = string
}

variable "bucket_name" {
  type = string
}

variable "table_name" {
  type = string
}

variable "bucket_endpoint" {
  type = string
}

variable "queue_endpoint" {
  type = string
}

variable "credentials_validation" {
  type = bool
}

variable "metadata_api_check" {
  type = bool
}

variable "requesting_account_id" {
  type = bool
}
