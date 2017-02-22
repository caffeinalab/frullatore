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
	if (routeObj == null) {
		console.error('App: unable to find the route from URL', url);
		return;
	}

	var pageUrl = exports.getPageUrlFromRoute(routeObj);
	if (pageUrl == null) {
		console.error('App: unable to find the page from route', routeObj);
		return;
	}

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
		console.error('App: unable to find the route from key', k);
		return;
	}
	
	var pageUrl = exports.getPageUrlFromRoute(routeObj);
	if (pageUrl == null) {
		console.error('App: unable to find the page from route', routeObj);
		return;
	}

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
		time: 0,
		reload: false
	});

	var pageUrl = exports.getPageUrlFromRoute(routeObj);
	if (pageUrl == null) {
		console.error('App: unable to find the page from route', routeObj);
		return;
	}

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

					asyncInnerHTML(ajaxResponse, function(f) {
						$contentBody.empty();
						$contentBody[0].appendChild( f );
						exports.trigger('loaded');

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
								console.error('Error in loading script', exception);
							});
						} else {
							exports.trigger('executed');
						}

					});

				}, opt.time);
			},
			error: function(jqxhr, settings, exception) {
				console.error('App: Error in loadRoute', exception);
			}
		});
	}
};

initLocationManager();
exports.loadPage(location.pathname, true);