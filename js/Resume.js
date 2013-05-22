(function(window) {

	var $resume,

		// circles settings
		width = 96,
		height = 96,
		speed = 0.8,
		centerX = width * 0.5,
		doublePI = Math.PI * 2,
        halfPI = Math.PI / 2,

		// all circles
		circles = [
					{ id : 'html5_circle', color : '#f16529', startPercent : 0, endPercent : 80, paper : null },
					{ id : 'css3_circle', color : '#2c92d6', startPercent : 0, endPercent : 75, paper : null },
					{ id : 'js_circle', color : '#ff006c', startPercent : 0, endPercent : 70, paper : null },
					{ id : 'as3_circle', color : '#80ad3b', startPercent : 0, endPercent : 80, paper : null },
					{ id : 'fl_circle', color : '#e3030c', startPercent : 0, endPercent : 95, paper : null },
					{ id : 'php_circle', color : '#566fd8', startPercent : 0, endPercent : 60, paper : null },
					{ id : 'mysql_circle', color : '#0784aa', startPercent : 0, endPercent : 40, paper : null },
					{ id : 'ps_circle', color : '#74b5f6', startPercent : 0, endPercent : 50, paper : null },
					{ id : 'ae_circle', color : '#bd7bfa', startPercent : 0, endPercent : 40, paper : null }
				];

	function Resume() {	}

	Resume.prototype.init = function() {
		cacheSelectors();
		$resume.addClass("viewedSection");

		setAllCircles();

		TweenMax.ticker.addEventListener('tick', ticked);
	};

	/**
	 * Set the RaphaelJS "canvas" on each circle.
	 */
	var setAllCircles = function() {
		for (var i = 0; i < circles.length; i++) {
			var circle = circles[i];
			var paper = new Raphael(circle.id, width, height);
			circle.paper = paper;
		}

		console.log('All circles set!');
	};

	/**
	 * Animate each circle.
	 */
	var ticked = function() {
		for (var i = 0; i < circles.length; i++) {
			var circle = circles[i];

			if (circle.startPercent >= circle.endPercent) {
				circle.startPercent = circle.endPercent;
			} else {
				circle.startPercent += speed;
				circle.paper.clear();

				var angle = doublePI * circle.startPercent / 100 - halfPI;
				var x = Math.cos(angle) * centerX + centerX;
				var y = Math.sin(angle) * centerX + centerX;
				var largeArcFlag = (circle.startPercent <= (100 * 0.5)) ? 0 : 1;

				var path = 'M' + centerX + ',' + centerX + ' L' + centerX + ',0 ';
					path += 'A' + centerX + ',' + centerX + ' 0 ' + largeArcFlag + ',1 ' + x + ',' + y + ' ';
					path += 'L' + centerX + ',' + centerX + 'Z';

				var circlePath = circle.paper.path(path);
				circlePath.attr({ fill : circle.color, 'stroke-width' : 0 });
			}
		}
	};

	/**
	 * Selectors
	 */
	var cacheSelectors = function() {
		$resume = $("#resume");
	};

	window.Resume = Resume;
	
}(window));