/*! jonathantorres_soon - v1.0.0 - 2013-04-02
* Copyright (c) 2013 ; Licensed  */
(function(window) {

	var timeline;

	var $myPhoto,
		$hello,
		$whoAmI,
		$myPortfolioIs,
		$reachMe,
		$findMe;

	function ComingSoon() {	}

	ComingSoon.prototype.init = function() {
		$myPhoto = $(".circle");

		$hello = $("h3").first();
		var $helloChild = $hello.children().remove();
		spanText($hello);
		$hello.append($helloChild);

		$whoAmI = $("h3").eq(1);
		var $whoAmIChild = $whoAmI.children().remove();
		spanText($whoAmI);
		$whoAmI.append($whoAmIChild);

		$myPortfolioIs = $("h3").eq(2);
		var $myPortfolioIsChild = $myPortfolioIs.children().remove();
		spanText($myPortfolioIs);
		$myPortfolioIs.append($myPortfolioIsChild);

		$reachMe = $(".reachme").find("h4").first();
		var $reachMeChild = $reachMe.children().remove();
		spanText($reachMe);
		$reachMe.append($reachMeChild);

		$findMe = $(".find_me");
		var $findMeChild = $findMe.children().remove();
		spanText($findMe);
		$findMe.append($findMeChild);

		timeline = new TimelineMax();
		timeline.to($myPhoto, 1, { opacity : 1, ease : Expo.easeOut } );
		timeline.staggerFrom($hello.find("span.a"), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05, "-=0.8");
		timeline.from($hello.find("span.johnsquared"), 1, { opacity : 0, ease : Expo.easeOut }, "-=0.3");
		timeline.staggerFrom($whoAmI.find("span.a"), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05, "-=1.3");
		timeline.from($whoAmI.find("span.johnsquared"), 1, { opacity : 0, ease : Expo.easeOut }, "-=0.3");
		timeline.staggerFrom($myPortfolioIs.find("span.a"), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05, "-=1.3");
		timeline.from($myPortfolioIs.find("span.johnsquared"), 1, { opacity : 0, ease : Expo.easeOut }, "-=0.3");
		timeline.staggerFrom($reachMe.find("span.a"), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05, "-=1.4");
		timeline.from($reachMe.find("a.johnsquared"), 1, { opacity : 0, ease : Expo.easeOut }, "-=0.6");
		timeline.staggerFrom($findMe.find("span.a"), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05, "-=1.3");
		timeline.staggerFrom($findMe.find("ul li"), 1, { opacity : 0, ease : Expo.easeOut }, 0.1, "-=0.8");
	}

	/**
	 * Take's an element text() and wraps each letter in a <span> to animate it
	 */
	var spanText = function($element) {
	  	var markup = "";
	  	var txt = $element.text();

		for (var i = 0; i < txt.length; i++) {
			var char = txt.charAt(i);
			markup += "<span class=\"a\">" + char + "</span>";
		}

		$element.empty().append(markup);
	}

	window.ComingSoon = ComingSoon;
	
}(window));
$(document).ready(function() {
	var soon = new ComingSoon();
	soon.init();
});

