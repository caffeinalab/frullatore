<?php

return [

	'redirect' => [
		'in' => 'special/redirect.php',
		'out' => 'index.html',
		'title' => SITE_TITLE,
		'data' => [ 'url' => '' ]
	],

	'4xx' => [
		'in' => 'special/4xx.php',
		'out' => '4xx.html',
		'noJS' => true, // Do not include JS
		'title' => SITE_TITLE . ' - Error',
		'metas' => [ 
			'description' => _('meta_description') 
		],
		'data' => []
	],

	'ie' => [
		'in' => 'special/ie.php',
		'out' => 'ie.html',
		'noJS' => true, // Do not include JS
		'title' => SITE_TITLE . ' - IE Error',
		'metas' => [ 
			'description' => _('meta_description')
		],
		'data' => []
	],

];