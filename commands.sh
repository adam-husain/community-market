sudo forever stopall
git pull
cd ./client/
npm install
sudo npm run build
sudo rm -rf ../server/build
sudo mv -f build ../server/
cd ../server/
npm install
sudo forever start index.js