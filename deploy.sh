echo 'Delete local source...'
rm ./public/*
echo 'Building source...'
./node_modules/webpack/bin/webpack.js -p --progress --colors
echo 'Delete remote source...'
ssh pi@192.168.2.200 'rm /home/pi/pt_frontend/*'
echo 'Deploying source...'
scp public/* pi@192.168.2.200:~/pt_frontend
