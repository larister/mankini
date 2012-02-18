(function() {
	function Heading() {
		this.$container = $('<header class="mankini-heading"/>');
		this._$h1 = $('<h1/>').appendTo( this.$container );
		this._currentText = '';
	}

	var HeadingProto = Heading.prototype;

	HeadingProto.text = function(animate, newText) {
		this._$h1.text( newText );

		if ( !this._currentText ) {
			mankini.utils.animateToClass( animate, this.$container );
		}

		this._currentText = newText;
	};

	mankini.slide.Heading = Heading;
})();