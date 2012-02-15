(function() {
	var ui = mankini.slide;

	function Builder(presentation) {
		this._presentation = presentation;
		this._notes = new mankini.Notes();
		this._initControls();
		this._stateNames = [];
	}

	var BuilderProto = Builder.prototype;

	BuilderProto._initControls = function() {
		var notes = this._notes,
			presentation = this._presentation;
		
		presentation.$container.click(function(event) {
			presentation.next( true );
			event.preventDefault();
		});

		$(document).keydown(function(event) {
			switch(event.which) {
				case 37: // left
					presentation.prev();
					event.preventDefault();
					break;
				case 39: // right
					presentation.next( false );
					event.preventDefault();
					break;
				case 84: // t
					console.log('hi');
					notes.startTime();
					event.preventDefault();
					break;
			}
		});
	};

	BuilderProto.slide = function() {
		var builder = this;

		this._slide = this._presentation.newSlide();
		
		// Clear retained instances
		this._slide.on('show', function() {
			builder._bullets = undefined;
		});

		return this;
	};

	BuilderProto.transition = function(type) {
		if (typeof type === 'string') {
			type = mankini.transitions[ type ];
		}
		this._slide.setTransition( type );
		return this;
	};

	BuilderProto.state = function(stateName) {
		var stateNames = this._stateNames,
			stateNameIndex = stateNames.length,
			notes = this._notes;
		
		stateNames[ stateNameIndex ] = stateName;
		this._state = this._slide.newState();

		return this.action(function() {
			notes.setNext( stateNames[ stateNameIndex + 1 ] || "No more slides" );
		});
	};

	BuilderProto.action = function(func) {
		this._state.addAction( func );
		return this;
	};

	BuilderProto.stateBullets = function() {
		var bulletStrings = Array.prototype.slice.call(arguments, 0);
		return this.state( bulletStrings[0] ).bullets.apply( this, bulletStrings );
	};

	BuilderProto.bullets = function() {
		var bulletStrings = Array.prototype.slice.call(arguments, 0),
			builder = this;

		return this.action(function( animate, $slide ) {
			if ( !builder._bullets ) {
				builder._bullets = new ui.Bullets();
				builder._bullets.$container.appendTo( $slide );
			}
			builder._bullets.add( animate, bulletStrings );
		});
	};

	mankini.Builder = Builder;
})();