#!/bin/bash

echo "Compiling JS..."

js_files="$(find "app/js" -type f -maxdepth 1 | grep -v '/\.')"

for f in $js_files; do
	bf=$(basename "$f")
	fn="${bf%.*}"
	ex="${bf##*.}"

	browserify "$f" -o "build/scripts/$bf"
	babel "build/scripts/$bf" --preset "es2015" -o "build/scripts/$bf"
	uglifyjs "build/scripts/$bf" -o "build/scripts/$bf"
	cat "build/scripts/$bf" | gzip -9 -c > "build/scripts/$bf.gz"

done