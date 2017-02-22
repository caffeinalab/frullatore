#!/usr/local/opt/php70/bin/php
<?php

if (PHP_VERSION_ID < 70000) {
	echo("To build this project you need PHP 7.0 at least");
	exit(1);
}

function reset_locale() {
	putenv("LANG=" . App::getLanguage());
	putenv("LC_ALL=" . App::getLanguage());
	setlocale(LC_ALL, App::getLanguage());
	bindtextdomain(PROJECT_NAME, realpath(APPDIR . '/languages'));
	bind_textdomain_codeset(PROJECT_NAME, 'UTF-8');
	textdomain(PROJECT_NAME);
}

function sanitize_output($buffer) {
	$search = array(
	'/\>[^\S ]+/s',  // strip whitespaces after tags, except space
	'/[^\S ]+\</s',  // strip whitespaces before tags, except space
	'/(\s)+/s'       // shorten multiple whitespace sequences
	);
	$replace = array(
	'>',
	'<',
	'\\1'
	);
	return preg_replace($search, $replace, $buffer);
}


set_time_limit(0);
gc_disable();

set_error_handler(function($errno, $errstr, $errfile, $errline) {
	ob_end_clean();
	echo "\033[0;31m\n[ERROR]\n{$errstr}\nFile: {$errfile}\nLine: {$errline}\n\033[0m";
	exit(1);
});

// Start

define('APPDIR', __DIR__ . '/../app');

require(APPDIR . '/config.php');
require(APPDIR . '/app.php');

$_LOCALE = 'en';
reset_locale();

$_SITEMAP = [];
$_COUNTRIES = json_decode(file_get_contents(APPDIR . '/countries.json'), true);

// Generating routes
echo "Compiling routes...\n";
foreach ($_COUNTRIES as $l => $country) {
	$_LOCALE = $l;
	reset_locale();

	// Include i18n-sensistive data
	$_ROUTES = require(APPDIR . '/routes.php');

	// Compile each PHP
	foreach ($_ROUTES as $k => $route) {
		$out = "build/$_LOCALE/" . $route['out'];
		$outdir = dirname($out);
		if (!file_exists($outdir)) {
			mkdir($outdir, 0777, true);
		}

		ob_start();
		$_ROUTE = $route;
		include (APPDIR . '/routes/' . $route['in']);
		file_put_contents($out, sanitize_output(ob_get_clean()));

		if (!isset($route['noIndexable'])) {
			$_SITEMAP[] = [
			'loc' => BASE . "$_LOCALE/" . str_replace('index.html', '', $route['out'])
			];
		}
	}
}


// Resetting language
$_LOCALE = 'en-wx';
reset_locale();

// Building special routes
echo "Compiling special routes...\n";
$_SPECIALROUTES = include(APPDIR . '/specialroutes.php');
foreach ($_SPECIALROUTES as $k => $route) {
	$out = "build/" . $route['out'];
	$outdir = dirname($out);
	if (!file_exists($outdir)) {
		mkdir($outdir, 0777, true);
	}

	ob_start();
	$_ROUTE = $route;
	include (APPDIR . '/routes/' . $route['in']);
	file_put_contents($out, sanitize_output(ob_get_clean()));
}

// Generating redirects
echo "Compling redirects...\n";
$_REDIRECTS = include(APPDIR . '/redirects.php');
foreach ($_COUNTRIES as $_LOCALE => $country) {
	foreach ($_REDIRECTS as $r) {
		$out = "build/" . str_replace('{{LOCALE}}', $_LOCALE, $r['from']) . '/index.html';
		$outdir = dirname($out);
		if (!file_exists($outdir)) {
			mkdir($outdir, 0777, true);
		}

		ob_start();
		$href = str_replace('{{LOCALE}}', $_LOCALE, BASE . $r['to'] . '/');
		include (APPDIR . '/tools/redirector.php');
		file_put_contents($out, sanitize_output(ob_get_clean()));
	}
}

// Build sitemap
echo "Building sitemap.xml...\n";
ob_start();
include (APPDIR . '/tools/sitemap.php');
file_put_contents("build/sitemap.xml", ob_get_clean());

echo "Build is complete!\n\n";
exit(0);