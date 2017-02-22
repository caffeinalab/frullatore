window.App = {};

_.extend(window.App, Backbone.Events);

App.UI = require('./ui');
App.Router = require('./router');