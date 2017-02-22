<?php

return [

	'homepage' => [
		'in' => 'home.php',
		'out' => 'index.html',
		'scriptName' => 'scripts/home.js',
		'title' => SITE_TITLE,
		'metas' => [ 
			'description' => _('meta_description')
		],
		'data' => []
	],

	'phpinfo' => [
		'in' => 'phpinfo.php',
		'out' => 'phpinfo/index.html',
		'title' => SITE_TITLE . ' - PHPInfo',
		'metas' => [
			'description' => _('meta_description')
		],
		'data' => [
			'info' => true
		]
	],

];
