#!/bin/bash

open "http://localhost:8080" &
php -S "localhost:8080" -t "build" &