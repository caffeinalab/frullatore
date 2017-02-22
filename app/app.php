<?php

class App {

	public static function includePartial($__, $data = []) {
		extract($data);
		include __DIR__ . "/partials/$__.php";
	}

	public static function getLanguage() {
		return strtok(static::getLocale(), '-');
	}

	public static function getCountry() {
		strtok(static::getLocale(), '-');
		return strtok('-');
	}

	public static function getCountryName() {
		global $_COUNTRIES;
		return ucwords($_COUNTRIES[ static::getLocale() ]); 
	}

	public static function getLocale() {
		global $_LOCALE;
		return $_LOCALE ?: 'en-wx';
	}

	public static function getLocaleBaseTwo() {
		global $_LOCALE;
		if ($_LOCALE === 'it-it') return 'it-it';
		return 'en-us';
	}

	private static $routes;
	public static function getRoutes() {
		global $_ROUTES;
		$routes = [];
		foreach ($_ROUTES as $k => $r) {
			$routes[$k] = $r;
			unset($routes[$k]['in']);
			unset($routes[$k]['metas']);
		}
		return json_encode($routes);
	}

	public static function route($url) {
		return $url;
	}

	private static $allCountries;
	public static function getAllCountries() {
		if (null == static::$allCountries) {
			static::$allCountries = json_decode(file_get_contents(APPDIR . '/data/countries.json'), true);
		}
		return static::$allCountries;
	}

}
