sudo forever stopall
git pull
sudo forever start "server/index.js"
cd ./client/
sudo npm run build
sudo serve -s build -l 443 --ssl-cert "cert/certificate.crt" --ssl-key "cert/private.key"