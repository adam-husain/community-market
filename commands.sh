sudo forever stopall
git pull
cd ./client/
sudo npm run build
sudo rm -rf ../server/build
sudo mv -f build ../server/
cd ../server/
sudo forever start index.js