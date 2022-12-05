sudo forever stopall
git pull
cd ./client/
sudo npm run build
sudo mv -f build ../server/build
cd ../server/
sudo forver start index.js