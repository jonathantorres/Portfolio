(function(window) {

	var $social,
		$openArrow,
		$arrowPointer,
		$socialClose,
		$leftArrow,
		$rightArrow,
		$socialFeed,
		$content;

	var isOpen = false,
		itemsWidth = 0;

	function Social() { }

	Social.prototype.init = function() {
		cacheSelectors();

		$openArrow.on("click", openArrowClicked);
		$socialClose.on("click", socialCloseClicked);
		$content.on("click", contentClicked);

		$rightArrow.on("click", rightArrowClicked);
		$leftArrow.on("click", leftArrowClicked);

		$socialFeed.find("li").each(function() {
			itemsWidth += $(this).innerWidth() + 45;

			console.log($(this).innerWidth());
		});

		$socialFeed.css({ width : itemsWidth, left : 0 });
	};

	var rightArrowClicked = function(e) {
		e.preventDefault();

		if (TweenMax.isTweening($socialFeed)) {
			return false;
		}

		console.log(-parseInt($socialFeed.css("width"), 10) + 500);

		// Move items to the left
		if (parseInt($socialFeed.css("left"), 10) > -parseInt($socialFeed.css("width"), 10) + 506) {
			TweenMax.to($socialFeed, 0.5, { left : "-=501", ease : Expo.easeOut } );
		}

		// animate back to the beginning
		else {
			TweenMax.to($socialFeed, 0.8, { left : 0, ease : Expo.easeOut } );
		}
	};

	var leftArrowClicked = function(e) {
		e.preventDefault();

		if (TweenMax.isTweening($socialFeed)) {
			return false;
		}

		// Animate to the right
		if (parseInt($socialFeed.css("left"), 10) < 0) {
			TweenMax.to($socialFeed, 0.5, { left : "+=501", ease : Expo.easeOut } );
		}

		// animate back to the end
		else {
			TweenMax.to($socialFeed, 0.8, { left : -parseInt($socialFeed.css("width"), 10) + 501, ease : Expo.easeOut } );
		}
	};

	/**
	 * Social Widget Animations
	 */
	var openSocial = function() {
		TweenMax.to($social, 0.7, { left : "0%", ease : Expo.easeOut } );
	};

	var closeSocial = function() {
		TweenMax.to($social, 0.7, { left : "100%", ease : Expo.easeOut } );
	};

	/**
	 * Close/Open the social widget
	 */
	var contentClicked = function(e) {
		e.preventDefault();
		
		if (isOpen) {
			closeSocial();
			isOpen = false;
		}
	};

	var openArrowClicked = function(e) {
		e.preventDefault();
		
		if (!isOpen) {
			openSocial();
			isOpen = true;
		}
	};

	var socialCloseClicked = function(e) {
		e.preventDefault();

		if (isOpen) {
			closeSocial();
			isOpen = false;
		}
	};

	/**
	 * Selectors
	 */
	var cacheSelectors = function() {
		$social = $("#social");
		$openArrow = $("#open_arrow");
		$arrowPointer = $openArrow.find("img");
		$socialClose = $(".social_close");
		$leftArrow = $(".left_arrow");
		$rightArrow = $(".right_arrow");
		$socialFeed = $(".social_feed");
		$content = $("#content");
	};

	window.Social = Social;

}(window));