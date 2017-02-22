#!/bin/bash

rm -rf build

mkdir -p build/styles
mkdir -p build/scripts
mkdir -p build/assets

echo "Copying public..."
cp -Rf app/public/ build

echo "Copying resources..."
cp -Rf tmp/res/ build