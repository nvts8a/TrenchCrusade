sudo yum update
sudo yum upgrade

sudo yum install -y java-21-amazon-corretto-headless
sudo yum install -y postgresql15.x86_64
sudo yum install -y nginx

mkdir environment
mkdir environment/staging
mkdir environment/staging/backend
mkdir environment/staging/frontend

sudo mkdir /srv/api
sudo mkdir /srv/api/logs