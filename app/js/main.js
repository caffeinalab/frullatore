window.$ = window.jQuery = require('jquery');

// Super globals
window.$window = $(window);
window.$html = $('html');
window.$htmlbody = $('html,body');
window.$document = $(document);
window.$body = $(document.body);
window.$contentBody = $('#body');

// Libs
window._ = require('underscore');
window.Q = require('q');


// Polyfills
require('./poly/history');
require('./poly/requestanimationframe');

// Contants
window.IS_IOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
window.IS_IPAD = /ipad/i.test(navigator.userAgent);
window.IS_IPHONE = /iphone|ipod/i.test(navigator.userAgent);
window.IS_ANDROID = /android/i.test(navigator.userAgent);
window.IS_IE = /msie/i.test(navigator.userAgent);
window.IS_IEMOBILE = /iemobile/i.test(navigator.userAgent);
window.IS_TOUCH_DEVICE = (function() {
   var el = document.createElement('div');
   el.setAttribute('ongesturestart', 'return;');
   return typeof el.ongesturestart === "function";
})();

window.DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;
if (IS_IEMOBILE && window.screen.deviceXDPI != null) {
	window.DEVICE_PIXEL_RATIO = window.screen.deviceXDPI / window.screen.logicalXDPI;
}

// Protos
Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
};

// Global App
require('./app');

//////////////////////
// Event App global //
//////////////////////

App.Router.on('willbeloaded', function() {
});

App.Router.on('loaded', function() {
});

App.Router.on('executed', function() {
});

App.Router.on('pushstate', function() {
	if (window.ga != null) {
		ga('send','pageview', location.pathname);
		ga('alternate.send','pageview', location.pathname);
	}
});

$window.load(function() {
	App.Router.init();
	$html.removeClass('-loading');
});