#!/bin/bash

watched_files="$(find "app" -name "*.php" -type f)"

previous_checksum="dummy"
while [ 1 ]; do
    checksum=$(md5 $watched_files | md5)
    if [ "$checksum" != "$previous_checksum" ]; then
		bin/builder.sh dev
    fi
    previous_checksum="$checksum"
    sleep 1
done