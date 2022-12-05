sudo forever stopall
sudo fuser -k 443/tcp
git pull
cd ./server/
sudo forever start index.js
cd ../client/
sudo npm run build
sudo serve -s build -l 443 --ssl-cert "cert/certificate.crt" --ssl-key "cert/private.key"