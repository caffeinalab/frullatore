#!/bin/bash

js_files="$(find "app/js" -type f -maxdepth 1 | grep -v '/\.')"

for f in $js_files; do
	bf=$(basename "$f")
	fn="${bf%.*}"
	ex="${bf##*.}"
	watchify "$f" -o "build/scripts/$bf" &
done 