<?php

if (!isset($argv[1])) {
	echo "Invalid BUILD mode";
	exit(1);
}

define('PROJECT_NAME', 'Frullatore');

define('ENV', $argv[1]);
define('CDN_URL', '');
define('API_BUCKET', '');
define('SITE_TITLE', 'Frullatore');
define('API_ENDPOINT', '');

if (ENV == "dev") {
	define('VERSION', time());
	define('BASE', '/');
} else if (ENV == "stage") {
	define('VERSION', str_replace("\n", "", `git rev-parse HEAD | cut -c1-10`));
	define('BASE', 'http://stage-frullatore.amazonaws.com/');
} else if (ENV == "prod") {
	define('VERSION', str_replace("\n", "", `git rev-parse HEAD | cut -c1-10`));
	define('BASE', 'http://frullatore.amazonaws.com');
}
