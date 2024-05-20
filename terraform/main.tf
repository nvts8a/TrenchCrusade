terraform {
    required_providers {
        aws = {
            source  = "hashicorp/aws"
            version = ">= 5.47"
        }
    }
    required_version = ">= 1.8.0"
}

# Configure the AWS Provider
provider "aws" {
    region = "us-east-2"
}

/* resource "aws_db_instance" "default" {
    allocated_storage    = 10
    db_name              = "mydb"
    engine               = "mysql"
    engine_version       = "8.0"
    instance_class       = "db.t3.micro"
    username             = "foo"
    password             = "foobarbaz"
    parameter_group_name = "default.mysql8.0"
    skip_final_snapshot  = true
}

resource "aws_instance" "app_server" {
    ami = "ami-830c94e3"
    instance_type = "t2.micro"
    tags = {
        Name = "ExampleAppServerInstance"
    }
} */

# S3 Bucket for static front end assets
resource "aws_s3_bucket" "www" {
    bucket = "www.trenchcrusade.builders"

    tags = {
        Name        = "Trench Crusade Builder"
        Environment = "production"
    }
}

resource "aws_s3_bucket_website_configuration" "www" {
  bucket = aws_s3_bucket.trench.id

  index_document {
    suffix = "index.html"
  }
}

# EC2 instance for backen API 18.226.186.204 
resource "aws_instance" "api" {
  ami = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"

  tags = {
    Name = "TrenchCrusade"
  }
}

# RDS 
resource "aws_db_instance" "api" {
  allocated_storage    = 10
  db_name              = "trenchcrusade"
  engine               = "postgres"
  engine_version       = "16.2-r2"
  instance_class       = "db.t4g.micro"
  username             = "postgres"
  password             = "foobarbaz"
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true
}

# Route 53 configuration
resource "aws_route53_zone" "trench" {
  name = "trenchcrusade.builders"
}

resource "aws_route53_zone" "www" {
  name = "www.trenchcrusade.builders"

  tags = {
    Environment = "production"
  }
}

resource "aws_route53_record" "www-a" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.trenchcrusade.builders"
  type    = "A"
  ttl     = "30"
  records = aws_route53_zone.dev.name_servers
}