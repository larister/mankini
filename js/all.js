(function() {
	var scripts = [
		'jquery-1.7.1.js',
		'jquery.transition.js',
		'MicroEvent.js',
		'mankini/base.js',
		'mankini/Presentation.js',
		'mankini/Notes.js',
		'mankini/Slide.js',
		'mankini/State.js',
		'mankini/transitions.js',
		'mankini/slide/base.js',
		'mankini/slide/Bullets.js',
		'mankini/Builder.js'
	];

	var scriptRoot = (function() {
		var script = Array.prototype.slice.call( document.getElementsByTagName('script'), -1 )[0];
		return script.src.replace(/\/[^\/]*$/, '/');
	})();

	scripts.forEach(function(src) {
		/*var script = document.createElement('script');
		script.defer = true;
		script.src = scriptRoot + src;
		document.body.appendChild(script);*/
		document.write('<script src="' + scriptRoot + src + '" defer></script>');
	});

	window.scriptRoot = scriptRoot;
})();