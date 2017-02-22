<?php global $_ROUTE; ?><!DOCTYPE html>
<html class="-loading">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="utf-8" />
	<base href="<?= BASE ?>" />
	
	<title><?= $_ROUTE['title'] ?></title>
	
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	
	<meta http-equiv="Content-Language" content="<?= App::getLanguage() ?>" />
	<meta name="description" content="<?= $_ROUTE['metas']['description'] ?>" />
	<meta property="og:description" content="<?= $_ROUTE['metas']['description'] ?>" />

 	<!--[if lt IE 9]>
	<meta http-equiv="refresh" content="0;URL=/ie.html">
  	<![endif]-->

  	<script>(function(global) {
  		'use strict';
  		global.console = global.console || {};
  		var con = global.console;
  		var prop, method;
  		var empty = {};
  		var dummy = function() {};
  		var properties = 'memory'.split(',');
  		var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
  		'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
  		'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  		while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
  		while (method = methods.pop()) if (typeof con[method] !== 'function') con[method] = dummy;
  	})(typeof window === 'undefined' ? this : window);</script>
	
	<!-- Include main style CSS -->
	<link rel="stylesheet" href="styles/main.css?v=<?= VERSION ?>" />
	
	<!-- Expose some PHP variables -->
	<script>
		var ENV = "<?= ENV ?>";
		var VERSION = "<?= VERSION ?>";
		var LOCALE = "<?= App::getLocale(); ?>";
		var LANGUAGE = "<?= App::getLanguage(); ?>";
		var COUNTRY = "<?= App::getCountry(); ?>";
		var ROUTES = <?= App::getRoutes(); ?>;
		var API_ENDPOINT = "<?= API_ENDPOINT ?>";
		var API_BUCKET = "<?= API_BUCKET ?>";
	</script>

</head>
<body class="<?= (!isset($_ROUTE['noJS'])) ? '-destruct' : '' ?>">
	
	<!-- From this point, all will be AJAX-loaded -->
	<!--AJAX-->
