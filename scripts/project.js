$( document ).ready(function() {

	// http://blog.bignerdranch.com/4455-web-accessibility-skip-navigation-links/
	// bind a click event to the 'skip' link
	$(".skip-links a").click(function(event){

		// strip the leading hash and declare
		// the content we're skipping to
		var skipTo="#"+this.href.split('#')[1];

		// Setting 'tabindex' to -1 takes an element out of normal
		// tab flow but allows it to be focused via javascript
		$(skipTo).attr('tabindex', -1).on('blur focusout', function () {

			// when focus leaves this element,
			// remove the tabindex attribute
			$(this).removeAttr('tabindex');

		}).focus(); // focus on the content container
	});

	// More info
	// http://codepen.io/bradfrost/pen/sHvaz
	$('body').addClass('js');
	var $menu = $('#page-nav'),
		$menulink = $('.menu-link');

	$menulink.click(function() {
		$menulink.toggleClass('is-active');
		$menu.toggleClass('is-opened');
		return false;
	});

	// Tab nav switcher
	var $tablink = $('.tab-nav .is-active a');

		$tablink.click(function() {
			$(this).parent().parent().toggleClass('is-opened');
			return false;
		})

	// Equal height blocks
	// http://css-tricks.com/equal-height-blocks-in-rows/
	var currentTallest = 0,
		 currentRowStart = 0,
		 rowDivs = new Array(),
		 $el,
		 topPosition = 0;

	 $('.hero-content .card').each(function() {

		$el = $(this);
		topPostion = $el.position().top;

		if (currentRowStart != topPostion) {

		// we just came to a new row.  Set all the heights on the completed row
		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			rowDivs[currentDiv].height(currentTallest);
		}

		// set the variables for the new row
		rowDivs.length = 0; // empty the array
		currentRowStart = topPostion;
		currentTallest = $el.height();
		rowDivs.push($el);

		} else {

			// another div on the current row.  Add it to the list and check if it's taller
			rowDivs.push($el);
			currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);

		}

		// do the last row
		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			rowDivs[currentDiv].height(currentTallest);
		}

	});

	// Keyboard accessible primary nav
	$('.primary-nav a').focus(function(){
		$(this).closest('.dropdown').addClass('is-focused');
	}).focusout(
	function(){
		$(this).closest('.dropdown').removeClass('is-focused');
	});

	// Project entry listing, more information
	$('.project-entry .action-details').on('click', function(e){
		e.preventDefault();
		$(this).closest('.project-entry').toggleClass('is-opened');
	});

});