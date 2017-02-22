_.extend(module.exports, Backbone.Events);

var prefix = null;
exports.getVendorPrefix = function() {
	if (prefix == null) {
		var styles = window.getComputedStyle(document.documentElement, ''),
		pre = (Array.prototype.slice
		.call(styles)
		.join('') 
		.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
		)[1],
		dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		prefix = {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		};
	}
	return prefix;
};

exports.detectSuffixForImages = function() {
	if (window.innerWidth >= 768) {
		if (DEVICE_PIXEL_RATIO > 1) {
			return "-desktop@2x";
		} else {
			return "-desktop";
		}
	} else {
		if (DEVICE_PIXEL_RATIO > 2) {
			return "-mobile@3x";
		} else {
			return "-mobile@2x";
		}
	}
};

var eventsBinded = false;
exports.bindEvents = function() {
	if (eventsBinded) return;
	eventsBinded = true;

	$body.on('click', '[data-href]', function(e) {
		var $t = $(this);

		if (!$t.data('noantibounce')) {
			if ($t.data('disabled')) return;
			$t.data('disabled', true);
		}

		App.Router.loadRouteByKey($t.data('href'), {
			reload: !!$t.data('reload')
		});
	});

	$body.on('click', '[data-event]', function() {
		App.trigger( $(this).data('event') );
	});
};

exports.detect = function() {
	if (IS_IOS) $html.addClass('is-os');
	if (IS_ANDROID) $html.addClass('is-android');
	if (IS_IEMOBILE) $html.addClass('is-iemobile');		
	if (IS_IE) $html.addClass('is-ie');
	if (IS_TOUCH_DEVICE) $html.addClass('is-touch');

	$html.addClass('lang-' + LANGUAGE);
	$html.addClass('country-' + COUNTRY);
	$html.addClass('locale-' + LOCALE);
};

exports.bindEvents();