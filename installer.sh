#!/bin/bash

rm -rf node_modules
npm install

sudo gem install image_optim
sudo gem install image_optim_pack

brew install php70
brew install advancecomp gifsicle jhead jpegoptim jpeg optipng pngcrush pngquant imagemagick

curl -s http://static.jonof.id.au/dl/kenutils/pngout-20110109-darwin.tar.gz | tar -xzC /tmp pngout-20110109-darwin/pngout && mv /tmp/pngout-20110109-darwin/pngout /usr/local/bin/pngout && chmod a+x /usr/local/bin/pngout
