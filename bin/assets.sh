#!/bin/bash

assets_files="$(find "app/assets" -type f | grep -v '/\.')"
bg_files="$(find "app/backgrounds" -type f | grep -v '/\.')"

mkdir -p tmp/res/assets
mkdir -p tmp/res/backgrounds

convert_opt="-strip -interlace Plane -filter Lanczos"

for f in $assets_files; do 
	bf=$(basename "$f")
	fn="${bf%.*}"
	ex="${bf##*.}"


	if [ ! -f "tmp/res/assets/$fn.$ex" ]; then
		(
		echo "Converting $bf"

		convert $convert_opt "$f" "tmp/res/assets/$fn.$ex"

		cp "tmp/res/assets/$fn.$ex" "tmp/res/assets/$fn-desktop@2x.$ex"
		convert $convert_opt "$f" -adaptive-resize 50% "tmp/res/assets/$fn-desktop.$ex"

		convert $convert_opt "$f" -adaptive-resize 1200x\> "tmp/res/assets/$fn-mobile@3x.$ex"
		convert $convert_opt "$f" -adaptive-resize 800x\> "tmp/res/assets/$fn-mobile@2x.$ex"
		convert $convert_opt "$f" -adaptive-resize 400x\> "tmp/res/assets/$fn-mobile.$ex"

		)
	fi
done

for f in $bg_files; do 
	bf=$(basename "$f")
	fn="${bf%.*}"
	ex="${bf##*.}"

	if [ ! -f "tmp/res/backgrounds/$fn.$ex" ]; then
		(
		echo "Converting $bf"

		convert $convert_opt -quality 80% "$f" "tmp/res/backgrounds/$fn.$ex"

		)
	fi
done