#!/usr/bin/env bash

rm -rf dist
mkdir dist
cp -r server example lib package.json dist/
cd dist
npm install --production
gtar -cvzf doubleurecipe.tar.gz *
scp doubleurecipe.tar.gz 192.34.60.247:/home/btrager/

ssh 192.34.60.247 "rm -rf /opt/doubleurecipe/*
tar xzf ~/doubleurecipe.tar.gz -C /opt/doubleurecipe/
pm2 restart kukeze-ui
rm ~/doubleurecipe.tar.gz"