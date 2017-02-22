#!/bin/bash

echo "Compiling CSS..."

lessc "app/less/main.less" "build/styles/main.css"
csso "build/styles/main.css" -o "build/styles/main.css"
cat "build/styles/main.css" | gzip -9 -c > "build/styles/main.css.gz"