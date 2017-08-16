echo 'Building source...'
./node_modules/webpack/bin/webpack.js -p --progress --colors
echo 'Deploying source...'
scp public/* pi@192.168.2.200:~/pt_frontend
