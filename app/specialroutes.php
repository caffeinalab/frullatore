<?php

return [

	'intro' => [
		'in' => 'special/intro.php',
		'out' => 'index.html',
		'noJS' => true, // Do not include JS
		'title' => SITE_TITLE . ' - Intro',
		'metas' => [ 
			'description' => _('meta_description') 
		],
		'data' => []
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