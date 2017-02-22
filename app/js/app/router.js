_.extend(module.exports, Backbone.Events);

exports.currentRoute = null;

function asyncInnerHTML(HTML, callback) {
	var temp = document.createElement('div'),
	frag = document.createDocumentFragment();
	temp.innerHTML = HTML;
	(function(){
		if(temp.firstChild){
			frag.appendChild(temp.firstChild);
			setTimeout(arguments.callee, 0);
		} else {
			callback(frag);
		}
	})();
}

function initLocationManager() {
	History.Adapter.bind(window, 'statechange', function() {
		var state = History.getState(); 
		if (state.data) {
			exports.trigger('pushstate');
			exports.loadRoute(state.data);
		}
	});
}

exports.getPageUrlFromRoute = function(routeObj) {
	return ("/" + LOCALE + "/" + routeObj.out).replace(/\/\//g, "/").replace('index.html', '');
};

exports.getRouteFromUrl = function(url) {
	var paths = url.replace('index.html', '').replace(/^\/|\/$/g, '').split('/');
	paths.shift();
	return ROUTES[ paths.join('/') ] || ROUTES[''];
};

exports.pushState = function(routeObj, pageUrl) {
	History.pushState(routeObj, routeObj.title, pageUrl);
};

exports.loadPage = function(url, force) {
	console.log('App: Loading page', url);

	var routeObj = exports.getRouteFromUrl(url);
	var pageUrl = exports.getPageUrlFromRoute(routeObj);

	exports.pushState(routeObj, pageUrl);

	if (force) {
		exports.loadRoute(routeObj);
	}
};

exports.loadRouteByKey = function(k, opt) {
	console.log('App: Loading route by key', k);

	opt = _.defaults(opt || {}, {
		reload: false
	});

	var routeObj = ROUTES[k];
	if (routeObj == null) {
		console.error('App: unable to find the route', routeObj);
		return;
	}
	
	var pageUrl = exports.getPageUrlFromRoute(routeObj);

	if (opt.reload) {
		exports.loadRoute(routeObj, opt);
	} else {
		exports.pushState(routeObj, pageUrl);
	}
};

exports.loadRoute = function(routeObj, opt, callback) {
	console.log('App: Loading route', routeObj);
	exports.currentRoute = routeObj;

	opt = _.defaults(opt || {}, {
		time: 1000,
		reload: false
	});

	App.UI.trigger('willdestroy');

	var pageUrl = exports.getPageUrlFromRoute(routeObj);
	exports.trigger('willbeloaded');

	if (opt.reload) {

		setTimeout(function() {
			window.location.href = pageUrl;
		}, opt.time);

	} else {

		$.ajax({
			url: pageUrl + '?v=' + VERSION,
			cache: ENV === 'prod',
			success: function(page) {
				var ajaxResponse = page.split('<!--AJAX-->')[1].split('<!--/AJAX-->')[0];
				setTimeout(function() {
					App.UI.trigger('destroy');

					App.UI.off();
					App.UI.disableMove = false;

					asyncInnerHTML(ajaxResponse, function(f) {
						$contentBody.empty();
						$contentBody[0].appendChild( f );
						exports.trigger('loaded');

						App.UI.calcStyle();

						if (routeObj.scriptName) {
							$.ajax({
								url: routeObj.scriptName + '?v=' + VERSION,
								dataType: 'script',
								cache: ENV === 'prod',
							})
							.done(function() {
								exports.trigger('executed');
							})
							.fail(function(jqxhr, settings, exception) {
								console.error(exception);
							});
						} else {
							exports.trigger('executed');
						}

					});

				}, opt.time);
			},
			error: function() {
				console.error('App: Error in loadRoute', err);
			}
		});
	}
};

exports.init = function() {
	exports.hash = location.hash;
	exports.loadPage(location.pathname, true);
	initLocationManager();
};