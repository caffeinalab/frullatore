window.App = {};

_.extend(window.App, Backbone.Events);

App.UI = require('./ui');
App.API = require('./api');
App.Router = require('./router');