echo ">> Pulling code"
cd ..
git checkout .
git pull
 
echo ">> Copying production properties"
cd ./api
scp -i ~/.ssh/ec2-TrenchCrusade.pem ec2-user@18.226.186.204:/home/ec2-user/environment/application.properties ./src/main/resources/
retVal=$?
if [ $retVal -ne 0 ]; then
   echo "<< Failed to copy production properties."
   exit $retVal
fi

echo ">> Building backend"
mvn package -DskipTests
retVal=$?
if [ $retVal -ne 0 ]; then
   echo "<< Failed to build backend"
   exit $retVal
fi

echo ">> Remove properties changes"
git checkout .

echo ">> Building frontend"
cd ../frontend
yarn build
retVal=$?
if [ $retVal -ne 0 ]; then
   echo "<< Failed to build frontend"
   exit $retVal
fi

echo ">> Deploying code"
cd ..

ssh -i ~/.ssh/ec2-TrenchCrusade.pem ec2-user@18.226.186.204 "sudo rm -rf ~/environment/staging/frontend/*"
scp -r -i ~/.ssh/ec2-TrenchCrusade.pem ./frontend/build/* ec2-user@18.226.186.204:~/environment/staging/frontend
retVal=$?
if [ $retVal -ne 0 ]; then
   echo "Failed to stage frontend"
   ssh -i ~/.ssh/ec2-TrenchCrusade.pem ec2-user@18.226.186.204 "sudo rm -rf ~/environment/staging/frontend/*"
   exit $retVal
fi

ssh -i ~/.ssh/ec2-TrenchCrusade.pem ec2-user@18.226.186.204 "sudo rm -rf /usr/share/nginx/html.backup"
ssh -i ~/.ssh/ec2-TrenchCrusade.pem ec2-user@18.226.186.204 "sudo mv -f /usr/share/nginx/html /usr/share/nginx/html.backup"
ssh -i ~/.ssh/ec2-TrenchCrusade.pem ec2-user@18.226.186.204 "sudo mkdir /usr/share/nginx/html && sudo chown nginx /usr/share/nginx/html"
ssh -i ~/.ssh/ec2-TrenchCrusade.pem ec2-user@18.226.186.204 "sudo mv -f ~/environment/staging/frontend/* /usr/share/nginx/html"
retVal=$?
if [ $retVal -ne 0 ]; then
   echo "<< Failed to deploy frontend"
   ssh -i ~/.ssh/ec2-TrenchCrusade.pem ec2-user@18.226.186.204 "sudo rm -rf /usr/share/nginx/html"
   ssh -i ~/.ssh/ec2-TrenchCrusade.pem ec2-user@18.226.186.204 "sudo mv -f /usr/share/nginx/html.backup /usr/share/nginx/html"
   exit $retVal
fi

scp -i ~/.ssh/ec2-TrenchCrusade.pem ./api/target/api.jar ec2-user@18.226.186.204:~/environment/staging/backend
retVal=$?
if [ $retVal -ne 0 ]; then
   echo "<< Failed to stage backend"
   exit $retVal
fi
ssh -i ~/.ssh/ec2-TrenchCrusade.pem ec2-user@18.226.186.204 "sudo mv -f ~/environment/staging/backend/* /srv/api"
retVal=$?
if [ $retVal -ne 0 ]; then
   echo "<< Failed to deploy backend"
   exit $retVal
fi

echo ">> Restarting services"
ssh -i ~/.ssh/ec2-TrenchCrusade.pem ec2-user@18.226.186.204 "sudo systemctl restart nginx"
retVal=$?
if [ $retVal -ne 0 ]; then
   echo "<< Failed to restart frontend"
   exit $retVal
fi

ssh -i ~/.ssh/ec2-TrenchCrusade.pem ec2-user@18.226.186.204 "sudo systemctl restart api"
retVal=$?
if [ $retVal -ne 0 ]; then
   echo "<< Failed to restart backend"
   exit $retVal
fi