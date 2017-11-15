#!/usr/bin/env bash

rm -rf dist
mkdir dist
cp example/index.html lib/app.* dist/
cd dist
gtar -cvzf doubleurecipe.tar.gz *
scp doubleurecipe.tar.gz 192.34.60.247:/home/btrager/

ssh 192.34.60.247 "rm -rf /opt/doubleurecipe/*
tar xzf ~/doubleurecipe.tar.gz -C /opt/doubleurecipe/
rm ~/doubleurecipe.tar.gz"