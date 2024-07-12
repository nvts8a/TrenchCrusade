terraform {
    required_providers {
        aws = {
              source  = "hashicorp/aws"
              version = "~> 5.0"
        }
    }
    required_version = ">= 1.2.0"
}

# Configure the AWS Provider
provider "aws" {
      region  = "us-east-2"
      profile = "tc-infrastructure"
}

resource "aws_s3_bucket" "static_assets" {
    bucket = "www.trenchcrusade.com"

    tags = {
        Name        = "Trench Crusade"
        Environment = "Production"
    }
}

resource "aws_s3_bucket_website_configuration" "static_assets" {
      bucket = "www.trenchcrusade.com"

      index_document {
        suffix = "index.html"
      }
}