sudo forever stopall
sudo killall -9 node
git pull
cd ./server/
sudo forever start index.js
cd ../client/
sudo npm run build
sudo serve -s build -l 443 --ssl-cert "cert/certificate.crt" --ssl-key "cert/private.key"