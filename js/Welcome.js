(function(window) {

	var $welcome,
		$hello,
		$myName,
		$myPortfolio,
		$whomAmI,
		$availability,
		timeline;

	function Welcome() { }

	Welcome.prototype.init = function() {
		$welcome = $("#welcome");
		$welcome.addClass("viewedSection");

		// Hello... 
		$hello = $("h1").first();
		spanText($hello);

		// My name is...
		$myName = $("h1").eq(1);
		var $mynameChild = $myName.children().remove();
		spanText($myName);
		$myName.append($mynameChild);

		// And this is my... 
		$myPortfolio = $("h1").eq(2);
		var $myPortfolioChild = $myPortfolio.children().remove();
		spanText($myPortfolio);
		$myPortfolio.append($myPortfolioChild);

		// Im a... 
		$whomAmI = $("h3").first();
		var $whomAmIChild = $whomAmI.children().remove();
		spanText($whomAmI);
		$whomAmI.append($whomAmIChild);

		// Availability...
		$availability = $("h3").eq(1);
		var $availabilityChild = $availability.children().remove();
		spanText($availability);
		$availability.append($availabilityChild);

		// animations
		timeline = new TimelineMax();
		timeline.staggerFrom($hello.find("span.a"), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05);
		timeline.staggerFrom($myName.find("span.a"), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05, "-=0.4");
		timeline.from($myName.find("span.johnred"), 0.6, { opacity : 0, ease : Expo.easeOut }, "-=0.2");
		timeline.staggerFrom($myPortfolio.find("span.a"), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05, "-=0.8");
		timeline.from($myPortfolio.find("span.johnred"), 0.6, { opacity : 0, ease : Expo.easeOut }, "-=0.2");
		timeline.staggerFrom($whomAmI.find("span.a"), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.03, "-=0.8");
		timeline.from($whomAmI.find("span.johnred"), 0.6, { opacity : 0, ease : Expo.easeOut }, "-=0.2");
		timeline.staggerFrom($availability.find("span.a"), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.01, "-=0.8");
		timeline.from($availability.find("span.johnred"), 0.6, { opacity : 0, ease : Sine.easeOut }, "-=0.2");
	};

	/**
	 * Take's an element text() and wraps each letter in a <span> to animate it
	 */
	var spanText = function($element) {
		var markup = "";
		var txt = $element.text();

		for (var i = 0; i < txt.length; i++) {
			var character = txt.charAt(i);
			markup += "<span class=\"a\">" + character + "</span>";
		}

		$element.empty().append(markup);
	};

	window.Welcome = Welcome;

}(window));