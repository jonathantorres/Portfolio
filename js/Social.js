(function(window) {

	var $social,
		$openArrow,
		$arrowPointer,
		$socialClose,
		$leftArrow,
		$rightArrow,
		$socialFeed;

	function Social() {}

	Social.prototype.init = function() {
		cacheSelectors();
		$openArrow.on("click", openArrowClicked);
		$socialClose.on("click", socialCloseClicked);
	};

	var cacheSelectors = function() {
		$social = $("#social");
		$openArrow = $("#open_arrow");
		$arrowPointer = $openArrow.find("img");
		$socialClose = $(".social_close");
		$leftArrow = $(".left_arrow");
		$rightArrow = $(".right_arrow");
		$socialFeed = $(".social_feed");
	};

	var openArrowClicked = function(e) {
		e.preventDefault();
		TweenMax.to($social, 0.7, { left : "0%", ease : Expo.easeOut } );
	};

	var socialCloseClicked = function(e) {
		e.preventDefault();
		TweenMax.to($social, 0.7, { left : "100%", ease : Expo.easeOut } );
	};

	window.Social = Social;

}(window));