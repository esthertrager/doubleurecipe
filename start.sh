#!/usr/bin/env bash
./stop.sh
nohup mongod > log/mongod.log &
nohup nodemon ~/doubleurecipe-service/server/index.js > log/server.log &
nohup nodemon ~/doubleurecipe/server/index.js > log/frontend.log &
nohup npm run dev > log/dev-server.log &
cd ~/doubleurecipe
sudo nohup proxit > log/proxit.log &
tail -f log/dev-server.log &
