(function() {
	var scripts = [
		'jquery-1.7.1.js',
		'test.js'
	];

	var scriptPath = (function() {
		var script = Array.prototype.slice.call( document.getElementsByTagName('script'), -1 )[0];
		return script.src.replace(/\/[^\/]*$/, '/');
	})();

	scripts.forEach(function(src) {
		document.write('<script src="' + scriptPath + src + '"></script>');
	});
})();