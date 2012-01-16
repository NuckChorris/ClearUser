// ==UserScript==
// @name             ClearUser for Chrome
// @namespace        nuck
// @description      For when a user stretches and you want them gone, goddamnit, but for some reason you cannot ignore them or clear everything.
// @match            *://chat.deviantart.com/chat/*
// @run-at           document-end
// ==/UserScript==

var contentEval = function(source) {
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}
contentEval(function () {
	var bootstrap = (function () {
		var i = 0;
		return function bootstrap (cb) {
			if (!window.MiddleMan) {
				var interval = window.setInterval(function () {
					if (i++ < 20) {
						bootstrap(cb);
					} else {
						window.clearInterval(interval);
						cb(new Error('No MiddleMan found'))
					}
				}, 500);
			} else {
				cb();
			}
		};
	})();

	bootstrap(function (err) {
		if (err) throw err;

		MiddleMan.Commands.bind("clearuser", 1, function (msg) {
			var usersInPC = new Array();
			var args = msg.split(" ");
			var chat = $('.damncr[style*="visible"] .damncrc-chat');
			$.each(args, function (key, val) {
				$('.u-' + val.toLowerCase(), chat).remove();
			});
		});
	});
});