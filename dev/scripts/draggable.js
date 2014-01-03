(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function($) {

	var Draggable = function() {
		return Draggable._createDraggable($.apply($, arguments));
	};

	Draggable._active = {
		$elem: null,
		offsetLeft: 0,
		offsetTop: 0
	};
	Draggable._$elems = $();

	Draggable._css = {
		// position: 'absolute',
		cursor: 'move',
	};


	Draggable._createDraggable = function($elems) {

		$elems.each(function() {
			var $elem = $(this);

			$elem.on('mousedown', Draggable._mouseDown);

			var css = Object.create(Draggable._css);
			var offset = $elem.offset();
			css.left = offset.left;
			css.top = offset.top;
			$elem.css(css);
		});

		if (Draggable._$elems.length === 0) {
			$(window).on('mousemove', Draggable._mouseMove);
			$(window).on('mouseup', Draggable._mouseUp);
		}

		Draggable._$elems = Draggable._$elems.add($elems);

		return $elems;
	};

	Draggable._mouseDown = function(event) {
		var $this = $(this);
		var offset = $this.offset();

		Draggable._active.$elem = $this;
		Draggable._active.offsetLeft = event.pageX - offset.left;
		Draggable._active.offsetTop = event.pageY - offset.top;

		$this.css('position', 'absolute');

		event.preventDefault();
	};
	Draggable._mouseMove = function(event) {
		var $active = Draggable._active.$elem;

		if (!$active)
			return;

		$active.css({
			left: event.pageX - Draggable._active.offsetLeft,
			top: event.pageY - Draggable._active.offsetTop
		});

		event.preventDefault();
	};
	Draggable._mouseUp = function(event) {
		if (Draggable._active.$elem) {
			Draggable._active.$elem = null;
		}
		event.preventDefault();
	};



	$.fn.draggable = function() {
		return Draggable._createDraggable(this);
	};

	return Draggable;

}));