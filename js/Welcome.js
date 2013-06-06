(function(window) {

	var $welcome,
		$myName,
		$myPortfolio,
		$whomAmI,
		timeline;

	function Welcome() { }

	Welcome.prototype.init = function() {
		cacheSelectors();
		$welcome.addClass('viewedSection');

		// Link fix, anchors doesn't seem to work if animated? Need to find a workaroud
		$('h3').on('click', function(e) {
			var target = e.target;
			
			if (target.id === 'work_link') {
				window.open(target.dataset.url, '_blank');
			}
		});

		// My name is...
		$myName = $welcome.find('h2').first();
		var $mynameChild = $myName.children().remove();
		spanText($myName);
		$myName.append($mynameChild);

		// And this is my... 
		$myPortfolio = $welcome.find('h2').eq(1);
		var $myPortfolioChild = $myPortfolio.children().remove();
		spanText($myPortfolio);
		$myPortfolio.append($myPortfolioChild);

		// Im a... 
		$whomAmI = $welcome.find('h3');
		var $whomAmIChild = $whomAmI.children().remove();
		spanText($whomAmI);
		$whomAmI.append($whomAmIChild);

		// animations
		timeline = new TimelineMax();
		timeline.staggerFrom($myName.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05);
		timeline.from($myName.find('span.johnred'), 0.8, { opacity : 0, ease : Expo.easeOut }, '-=0.2');
		timeline.staggerFrom($myPortfolio.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05, '-=0.8');
		timeline.from($myPortfolio.find('span.johnred'), 0.8, { opacity : 0, ease : Expo.easeOut }, '-=0.2');
		timeline.staggerFrom($whomAmI.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.03, '-=0.8');
		timeline.from($whomAmI.find('span.johnsquared'), 0.8, { opacity : 0, ease : Expo.easeOut }, '-=0.2');
	};

	/**
	 * Take's an element text() and wraps each letter in a <span> to animate it
	 */
	var spanText = function($element) {
		var markup = '';
		var txt = $element.text();

		for (var i = 0; i < txt.length; i++) {
			var character = txt.charAt(i);
			markup += '<span class="a">' + character + '</span>';
		}

		$element.empty().append(markup);
	};

	/**
	 * Selectors
	 */
	var cacheSelectors = function() {
		$welcome = $('#welcome');
	};

	window.Welcome = Welcome;

}(window));
