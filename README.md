# Frullatore

Frullatore is a PHP build system that staticize all files in pure HTML with i18n support.

### Support

* PHP 7.0
* LESS to compile CSS files
* RequireJS to write CommonJS modules
* ImageMagick to convert and optimize images file

### Installation

Clone this repository. 
Change your project name in the following files: *package.json*, *config.php*.

Then run:

```
./installer.sh
```

### Optimizations

Every time you edit the following directories: *app/assets* and *app/backgrounds*, you have to call the `npm run assets`.

All JS files will be compiled, browserified and uglified.

All LESS fill will be compiled, CSS optimized and Gzipped.

### Start to work

Just call

```
npm run dev
```

It will watch your JS, PHP and LESS files and compile in real time.

It will also spawn a PHP web server to handle requests.

### Deploy in stage

Run

```
npm run stage
```

### Deploy in production

Run

```
npm run prod
```

### Deploy

You have to define your deploy strategy in `bin/deploy.sh`.

My advice is to just upload the entire `build` directory into S3 using the `aws` CLI.


### LICENSE

MIT.
