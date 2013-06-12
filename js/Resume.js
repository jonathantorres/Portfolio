(function(window) {

	// all areas
	var $resume,
		$overview,
		$specialties,
		$experience,
		$up_arrow,
		$down_arrow,

		// all logic
		sections = [],

		// overview area
		$overviewTitle,
		$johnCircle,

		// experience area
		$experienceTitle,
		$pastExperience1,
		$pastExperience2,

		// Specialties area
		$specialtiesTitle,
		$skillsRow1,
		$skillsRow2,
		width = 96,
		height = 96,
		speed = 0.8,
		centerX = width * 0.5,
		doublePI = Math.PI * 2,
        halfPI = Math.PI / 2,

		// specialties circles
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
		$resume.addClass('viewedSection');

		sections = [$overview, $specialties, $experience];

		initOverview();

		$up_arrow.on('click', upArrowClicked);
		$down_arrow.on('click', downArrowClicked);

		// setAllCircles();
		// TweenMax.ticker.addEventListener('tick', ticked);
	};

	/**
	 * Click on arrows
	 */
	var upArrowClicked = function(e) {
		e.preventDefault();

		var $currentSection,
			$prevSection;

		for (var i = 0; i < sections.length; i++) {
			var $section = sections[i];

			if (TweenMax.isTweening($section)) {
				return false;
			}

			if ($section.hasClass('current_view')) {
				$currentSection = $section;

				if (i === 0) {
					$prevSection = sections[sections.length - 1];
				} else {
					$prevSection = sections[i - 1];
				}
			}
		};

		$currentSection.removeClass('current_view');

		$prevSection.css( { top : '-50%' } );
		$prevSection.addClass('current_view');
		$prevSection.show();

		TweenMax.to($currentSection, 1, { top : '150%', opacity : 0, ease : Expo.easeOut } );
		TweenMax.to($prevSection, 1, { top : '50%', opacity : 1, ease : Expo.easeOut } );
	};

	var downArrowClicked = function(e) {
		e.preventDefault();
		var $currentSection,
			$nextSection;

		for (var i = 0; i < sections.length; i++) {
			var $section = sections[i];

			if (TweenMax.isTweening($section)) {
				return false;
			}

			if ($section.hasClass('current_view')) {
				$currentSection = $section;

				if (sections.length - 1 === i) {
					$nextSection = sections[0];
				} else {
					$nextSection = sections[i + 1];
				}
			}
		};

		$currentSection.removeClass('current_view');

		$nextSection.css( { top : '100%' } );
		$nextSection.addClass('current_view');
		$nextSection.show();

		TweenMax.to($currentSection, 1, { top : '-50%', opacity : 0, ease : Expo.easeOut } );
		TweenMax.to($nextSection, 1, { top : '50%', opacity : 1, ease : Expo.easeOut } );
	};

	var initOverview = function() {
		$overview.addClass('current_view');

		// Developer that...
		var $developerThat = $overview.find('p').first();
		var $developerThatChild = $developerThat.children().remove();
		Utils.spanText($developerThat);
		$developerThat.append($developerThatChild);

		// 4 years of experience...
		var $yearsOfExp = $overview.find('p').eq(1);
		var $yearsOfExpChild = $yearsOfExp.children().remove();
		Utils.spanText($yearsOfExp);
		$yearsOfExp.append($yearsOfExpChild);

		// animation
		var timeline = new TimelineMax();
		timeline.from($johnCircle, 1, { opacity : 0, ease : Expo.easeOut });
		timeline.from($overviewTitle, 1, { opacity : 0, left: '-60px', ease : Expo.easeOut }, '-=0.8');
		timeline.staggerFrom($developerThat.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.02, '-=0.8');
		timeline.staggerFrom($yearsOfExp.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.02, '-=0.8');
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
		// all areas
		$resume = $('#resume');
		$overview = $('#overview');
		$specialties = $('#specialties');
		$experience = $('#experience');
		$up_arrow = $('.up_arrow');
		$down_arrow = $('.down_arrow');

		// overview area
		$overviewTitle = $overview.find('.title');
		$johnCircle = $overview.find('.circle').eq(0);

		// experience area
		$experienceTitle = $experience.find('.title');
		$pastExperience1 = $('.past_experience1');
		$pastExperience2 = $('.past_experience2');

		// Specialties area
		$specialtiesTitle = $specialties.find('.title');
		$skillsRow1 = $('.skills_row1');
		$skillsRow2 = $('.skills_row2');
	};

	window.Resume = Resume;
	
}(window));
