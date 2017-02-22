#!/bin/bash

assets_files="$(find "app/assets" -type f | grep -v '/\.')"
bg_files="$(find "app/backgrounds" -type f | grep -v '/\.')"

mkdir -p /tmp/caffeina-frullatore/assets
mkdir -p /tmp/caffeina-frullatore/backgrounds

convert_opt="-strip -interlace Plane -filter Lanczos"

for f in $assets_files; do 
	bf=$(basename "$f")
	fn="${bf%.*}"
	ex="${bf##*.}"


	if [ ! -f "/tmp/caffeina-frullatore/assets/$fn.$ex" ]; then
		(
		echo "Converting $bf"

		convert $convert_opt "$f" "/tmp/caffeina-frullatore/assets/$fn.$ex"

		cp "/tmp/caffeina-frullatore/assets/$fn.$ex" "/tmp/caffeina-frullatore/assets/$fn-desktop@2x.$ex"
		convert $convert_opt "$f" -adaptive-resize 50% "/tmp/caffeina-frullatore/assets/$fn-desktop.$ex"

		convert $convert_opt "$f" -adaptive-resize 1200x\> "/tmp/caffeina-frullatore/assets/$fn-mobile@3x.$ex"
		convert $convert_opt "$f" -adaptive-resize 800x\> "/tmp/caffeina-frullatore/assets/$fn-mobile@2x.$ex"
		convert $convert_opt "$f" -adaptive-resize 400x\> "/tmp/caffeina-frullatore/assets/$fn-mobile.$ex"

		)
	fi
done

for f in $bg_files; do 
	bf=$(basename "$f")
	fn="${bf%.*}"
	ex="${bf##*.}"

	if [ ! -f "/tmp/caffeina-frullatore/backgrounds/$fn.$ex" ]; then
		(
		echo "Converting $bf"

		convert $convert_opt -quality 80% "$f" "/tmp/caffeina-frullatore/backgrounds/$fn.$ex"

		)
	fi
done