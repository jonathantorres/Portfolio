/**
 * Jonathan Torres Porfolio
 * Version: 1.0.0
 * Author: Jonathan Torres | jonathantorres41@gmail.com
 * Compiled on 2013-12-22
 */

(function(window) {

	var contact,
		title,
		summary,
		success,
		timeline;

	var contactForm,
		usernameField,
		emailField,
		messageField,
		errorFeedback,
		okButton,
		sendButton;

	function Contact() { }

	Contact.prototype.init = function() {
		cacheSelectors();
		contact.addClass('viewedSection');

		// display form by default
		contactForm.css( { 'display' : 'block'} );
		success.css( { 'display' : 'none'} );

		// remove any error classes
		errorFeedback.text('');
		usernameField.removeClass('error');
		emailField.removeClass('error');
		messageField.removeClass('error');

		resetValues();

		// animate!
		timeline = new TimelineMax();
		timeline.from(title, 1, { opacity : 0, ease : Expo.easeOut });
		timeline.from(summary, 1, { opacity : 0, marginLeft : '-60px', ease : Expo.easeOut }, '-=0.8');
		timeline.from(contactForm, 1, { opacity : 0, ease : Expo.easeOut }, '-=0.8');

		usernameField.on('blur', function() {
			validateField($(this), false);
		});

		messageField.on('blur', function() {
			validateField($(this), false);
		});

		emailField.on('blur', function() {
			validateField($(this), true);
		});

		emailField.on('keypress', function() {
			validateField($(this), true);
		});

		// send button
		sendButton.on('click', function(e) {
			e.preventDefault();
			validateForm();
		});

		// "ENTER" key press
		$(window).on('keyup', function(e) {
			if (e.keyCode === 13) {
				validateForm();
			}
		});

		// go back to form
		okButton.on('click', function(e) {
			e.preventDefault();

			success.fadeOut('normal', function() {
				resetValues();
				contactForm.fadeIn();
			});
		});
	};

	/**
	 * Validate a single field
	 */
	var validateField = function(field, isEmail) {
		var fieldValue = field.val();

		if (fieldValue === '') {
			errorFeedback.text('All fields are required.');
			field.addClass('error');

			return false;
		}

		if (isEmail) {
			var emailRegex = /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/;

			if (fieldValue.search(emailRegex) === -1) {
				errorFeedback.text('Invalid email.');
				field.addClass('error');

				return false;
			}
		}

		if (usernameField.hasClass('error') === false && emailField.hasClass('error') === false && messageField.hasClass('error') === false) {
			errorFeedback.text('');
		}

		field.removeClass('error');

		return true;
	};

	/**
	 * Check if all fields are OK
	 */
	var validateForm = function() {
		var usernameValidation = validateField(usernameField, false),
			emailValidation = validateField(emailField, true),
			messageValidation = validateField(messageField, false);

		if (usernameValidation === false || messageValidation === false) {
			errorFeedback.text('All fields are required.');
			return false;
		}

		if (emailValidation === false) {
			errorFeedback.text('Invalid email.');
			return false;
		}

		errorFeedback.text('');
		usernameField.removeClass('error');
		emailField.removeClass('error');
		messageField.removeClass('error');

		var username = usernameField.val(),
			useremail = emailField.val(),
			usermessage = messageField.val();

		$.ajax({
			type : 'POST',
			url : 'php/submit_contact_form.php',
			data : { un : username, ue : useremail, um : usermessage },
			success : function() {
				contactForm.fadeOut('normal', function() {
					success.fadeIn();
				});
			},
			error : function() {
				console.log('error!');
			}
		});
	};

	/**
	 * Reset field values
	 */
	var resetValues = function() {
		usernameField.val('');
		emailField.val('');
		messageField.val('');
	};

	/**
	 * Selectors
	 */
	var cacheSelectors = function() {
		contact = $('#contact');
		title = $('.title');
		summary = $('.summary');
		success = $('#success');

		contactForm = $('#contact_form');
		usernameField = $('#username');
		emailField = $('#email');
		messageField = $('#message');
		errorFeedback = $('.error_feedback');
		sendButton = $('#send');
		okButton = $('#ok');
	};

	window.Contact = Contact;

}(window));

(function(window) {

	var portfolio;

	function Portfolio() {

	}

	Portfolio.prototype.init = function() {
		portfolio = $('#portfolio');
		portfolio.addClass('viewedSection');
	};

	window.Portfolio = Portfolio;

}(window));

(function(window) {

	var site,
		preloadText,
		preloadBg;

	function Preloader() {}

	Preloader.prototype.init = function() {
		cacheSelectors();

		// Fadeout "Loading..."
		TweenMax.to(preloadText, 1, { opacity : 0, onComplete : loadAnimationComplete } );
	};

	var cacheSelectors = function() {
		preloadText = $('.load_text');
		preloadBg = $('.preload_bg');
	};

	/**
	 * Back background has faded out. Hide it.
	 * Init site!
	 */
	function bgAnimationComplete() {
		preloadBg.hide();

		site = new Site();
		site.init();
	}

	/**
	 * "Loading..." has faded out. Hide it.
	 */
	function loadAnimationComplete() {
		preloadText.hide();

		// Fade out the black background
		TweenMax.to(preloadBg, 0.3, { opacity : 0, onComplete : bgAnimationComplete } );
	}

	window.Preloader = Preloader;

}(window));

(function(window) {

	// all areas
	var resume,
		overview,
		specialties,
		experience,
		up_arrow,
		down_arrow,

		// all logic
		sections = [],

		// overview area
		overviewTitle,
		johnCircle,

		// experience area
		experienceTitle,
		pastExperience1,
		pastExperience2,

		// Specialties area
		specialtiesTitle,
		skillsRow1,
		skillsRow2,
		width = 96,
		height = 96,
		speed = 0.6,
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
		resume.addClass('viewedSection');

		sections = [overview, specialties, experience];

		up_arrow.on('click', upArrowClicked);
		down_arrow.on('click', downArrowClicked);

		for (var i = 0; i < sections.length; i++) {
			var section = sections[i];
			section.removeClass('current_view');
			section.hide();
		}

		initOverview();
	};

	/**
	 * Click on arrows
	 */
	var upArrowClicked = function(e) {
		e.preventDefault();

		var currentSection,
			prevSection;

		for (var i = 0; i < sections.length; i++) {
			var section = sections[i];

			if (TweenMax.isTweening(section)) {
				return false;
			}

			if (section.hasClass('current_view')) {
				currentSection = section;

				if (i === 0) {
					prevSection = sections[sections.length - 1];
				} else {
					prevSection = sections[i - 1];
				}
			}
		}

		currentSection.removeClass('current_view');

		prevSection.css( { top : '-50%' } );
		prevSection.addClass('current_view');
		prevSection.show();

		TweenMax.to(currentSection, 1, { top : '150%', opacity : 0, ease : Expo.easeOut } );
		TweenMax.to(prevSection, 1, { top : '50%', opacity : 1, ease : Expo.easeOut } );

		switch (prevSection.attr('id')) {
			case 'overview' :
				startOverview(true);
				resetCircles();
			break;

			case 'specialties' :
				startSpecialties(true);
			break;

			case 'experience' :
				startExperience(true);
				resetCircles();
			break;
		}
	};

	var downArrowClicked = function(e) {
		e.preventDefault();

		var currentSection,
			nextSection;

		for (var i = 0; i < sections.length; i++) {
			var section = sections[i];

			if (TweenMax.isTweening(section)) {
				return false;
			}

			if (section.hasClass('current_view')) {
				currentSection = section;

				if (sections.length - 1 === i) {
					nextSection = sections[0];
				} else {
					nextSection = sections[i + 1];
				}
			}
		}

		currentSection.removeClass('current_view');

		nextSection.css( { top : '100%' } );
		nextSection.addClass('current_view');
		nextSection.show();

		TweenMax.to(currentSection, 1, { top : '-50%', opacity : 0, ease : Expo.easeOut } );
		TweenMax.to(nextSection, 1, { top : '50%', opacity : 1, ease : Expo.easeOut } );

		switch (nextSection.attr('id')) {
			case 'overview' :
				startOverview(false);
				resetCircles();
			break;

			case 'specialties' :
				startSpecialties(false);
			break;

			case 'experience' :
				startExperience(false);
				resetCircles();
			break;
		}
	};

	/**
	 * Init the overview area (the first time)
	 */
	var initOverview = function() {
		overview.addClass('current_view');
		overview.show();
		overview.css( { opacity : 1, top : '50%' } );

		// Reset the specialties circles fills each time you visit!
		resetCircles();

		// Developer that...
		var developerThat = overview.find('p').first();
		var developerThatChild = developerThat.children().remove();
		Utils.spanText(developerThat);
		developerThat.append(developerThatChild);

		// 4 years of experience...
		var yearsOfExp = overview.find('p').eq(1);
		var yearsOfExpChild = yearsOfExp.children().remove();
		Utils.spanText(yearsOfExp);
		yearsOfExp.append(yearsOfExpChild);

		// animation
		var timeline = new TimelineMax();
		timeline.from(johnCircle, 1, { opacity : 0, ease : Expo.easeOut } );
		timeline.from(overviewTitle, 1, { opacity : 0, left: '-60px', ease : Expo.easeOut }, '-=0.8');
		timeline.staggerFrom(developerThat.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.02, '-=0.8');
		timeline.staggerFrom(yearsOfExp.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.02, '-=0.8');
	};

	/**
	 * Each time you go to the overview
	 */
	var startOverview = function(fromTop) {
		if (fromTop) {
			TweenMax.from(overviewTitle, 2, { top : '-40px', ease : Expo.easeOut } );
			TweenMax.from(johnCircle, 2, { marginTop : '-60px', ease : Expo.easeOut } );
			TweenMax.from(overview.find('p').first(), 2, { marginTop : '-60px', ease : Expo.easeOut } );
			TweenMax.from(overview.find('p').eq(1), 2, { marginTop : '-80px', ease : Expo.easeOut } );
		} else {
			TweenMax.from(overviewTitle, 2, { top : '40px', ease : Expo.easeOut } );
			TweenMax.from(johnCircle, 2, { marginTop : '60px', ease : Expo.easeOut } );
			TweenMax.from(overview.find('p').first(), 2, { marginTop : '60px', ease : Expo.easeOut } );
			TweenMax.from(overview.find('p').eq(1), 2, { marginTop : '80px', ease : Expo.easeOut } );
		}
	};

	/**
	 * Each time you go to the specialties
	 */
	var startSpecialties = function(fromTop) {
		setAllCircles();
		TweenMax.ticker.addEventListener('tick', ticked);

		if (fromTop) {
			TweenMax.from(specialtiesTitle, 2, { top : '-50px', ease : Expo.easeOut } );
			TweenMax.from(specialties.find('.special_slogan'), 2, { top : '-70px', ease : Expo.easeOut } );
			TweenMax.from(specialties.find('h3').first(), 2, { top : '-100px', ease : Expo.easeOut } );
			TweenMax.staggerFrom(specialties.find('.circle'), 2, { marginTop : '-50px', ease : Expo.easeOut }, 0.05);
		} else {
			TweenMax.from(specialtiesTitle, 2, { top : '50px', ease : Expo.easeOut } );
			TweenMax.from(specialties.find('.special_slogan'), 2, { top : '70px', ease : Expo.easeOut } );
			TweenMax.from(specialties.find('h3').first(), 2, { top : '100px', ease : Expo.easeOut } );
			TweenMax.staggerFrom(specialties.find('.circle'), 2, { marginTop : '50px', ease : Expo.easeOut }, 0.05);
		}
	};

	/**
	 * Each time you go to the experience
	 */
	var startExperience = function(fromTop) {
		if (fromTop) {
			TweenMax.from(experienceTitle, 2, { top : '-50px', ease : Expo.easeOut } );
			TweenMax.from(experience.find('p').first(), 2, { top : '-70px', ease : Expo.easeOut } );

			TweenMax.from(pastExperience1.find('.circle').first(), 2, { top : '-40px', ease : Expo.easeOut } );
			TweenMax.from(pastExperience1.find('h4'), 2, { top : '-30px', ease : Expo.easeOut } );
			TweenMax.from(pastExperience1.find('.position'), 2, { top : '-30px', ease : Expo.easeOut } );
			TweenMax.from(pastExperience1.find('.timeframe'), 2, { top : '-40px', ease : Expo.easeOut } );

			TweenMax.from(pastExperience2.find('.circle').first(), 2, { top : '-50px', ease : Expo.easeOut } );
			TweenMax.from(pastExperience2.find('h4'), 2, { top : '-40px', ease : Expo.easeOut } );
			TweenMax.from(pastExperience2.find('.position'), 2, { top : '-30px', ease : Expo.easeOut } );
			TweenMax.from(pastExperience2.find('.timeframe'), 2, { top : '-30px', ease : Expo.easeOut } );
		} else {
			TweenMax.from(experienceTitle, 2, { top : '50px', ease : Expo.easeOut } );
			TweenMax.from(experience.find('p').first(), 2, { top : '70px', ease : Expo.easeOut } );

			TweenMax.from(pastExperience1.find('.circle').first(), 2, { top : '40px', ease : Expo.easeOut } );
			TweenMax.from(pastExperience1.find('h4'), 2, { top : '30px', ease : Expo.easeOut } );
			TweenMax.from(pastExperience1.find('.position'), 2, { top : '30px', ease : Expo.easeOut } );
			TweenMax.from(pastExperience1.find('.timeframe'), 2, { top : '40px', ease : Expo.easeOut } );

			TweenMax.from(pastExperience2.find('.circle').first(), 2, { top : '50px', ease : Expo.easeOut } );
			TweenMax.from(pastExperience2.find('h4'), 2, { top : '40px', ease : Expo.easeOut } );
			TweenMax.from(pastExperience2.find('.position'), 2, { top : '30px', ease : Expo.easeOut } );
			TweenMax.from(pastExperience2.find('.timeframe'), 2, { top : '30px', ease : Expo.easeOut } );
		}
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
	};

	/**
	 * Reset circle fills back to the beginning
	 */
	var resetCircles = function() {
		TweenMax.ticker.removeEventListener('tick', ticked);

		for (var i = 0; i < circles.length; i++) {
			var circle = circles[i];

			if (circle.paper) {
				circle.paper.remove();
				circle.paper = null;
			}

			circle.startPercent = 0;
		}
	};

	/**
	 * Animate each circle fill.
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
		resume = $('#resume');
		overview = $('#overview');
		specialties = $('#specialties');
		experience = $('#experience');
		up_arrow = $('.up_arrow');
		down_arrow = $('.down_arrow');

		// overview area
		overviewTitle = overview.find('.title');
		johnCircle = overview.find('.circle').eq(0);

		// experience area
		experienceTitle = experience.find('.title');
		pastExperience1 = $('.past_experience1');
		pastExperience2 = $('.past_experience2');

		// Specialties area
		specialtiesTitle = specialties.find('.title');
		skillsRow1 = $('.skills_row1');
		skillsRow2 = $('.skills_row2');
	};

	window.Resume = Resume;

}(window));

(function(window) {

	var content,
		topHeader,
		logo,
		mainNavigation,
		pageFooter,
		social;

	function Site() {}

	Site.prototype.init = function() {
		cacheSelectors();

		// set up Hasher
		hasher.changed.add(handleHasher);
		hasher.initialized.add(handleHasher);
		hasher.init();

		// Animate in header and footer
		TweenMax.to(topHeader, 0.5, { top : '0px', ease : Power1.easeOut } );
		TweenMax.to(pageFooter, 0.5, { bottom : '0px', ease : Power1.easeOut } );

		// Start the Social widget
		social = new Social();
		social.init();

		// Click on main nav items
		mainNavigation.find('a').on('click', function(e) {
			e.preventDefault();
			var path = $(this).attr('href');
			hasher.setHash(path);
		});

		// mouse enter on main nav items
		mainNavigation.find('a').on('mouseenter', function() {
			var prog = $(this).next().find('.prog');
			TweenMax.to(prog, 0.5, { width : '100%', ease : Expo.easeOut } );
		});

		// mouse leave on main nav items
		mainNavigation.find('a').on('mouseleave', function() {
			var prog = $(this).next().find('.prog');
			TweenMax.to(prog, 0.5, { width : '15%', ease : Expo.easeOut } );
		});

		// Click on logo. Same as "Home" click
		logo.on('click', function(e) {
			e.preventDefault();
			mainNavigation.find('a').first().click();
		});

		// footer links
		pageFooter.find('a[href^="http"]').on('click', function() {
			window.open($(this).attr('href'), '_blank');
		});
	};

	/**
	 * Add "selected" class to requested nav item
	 */
	var updateNavigation = function(section) {
		mainNavigation.find('li').removeClass('selected');

		mainNavigation.find('a').each(function() {
			var path = $(this).attr('href');

			if (path === section) {
				$(this).parent().addClass('selected');
			}
		});
	};

	/**
	 * Handle page deep links
	 */
	var handleHasher = function(newHash) {
		switch(newHash) {
			case '' :
			case 'welcome' :
				switchSection('welcome');
				updateNavigation('welcome');
				break;

			case 'portfolio' :
				switchSection('portfolio');
				updateNavigation('portfolio');
				break;

			case 'contact' :
				switchSection('contact');
				updateNavigation('contact');
				break;

			case 'resume' :
				switchSection('resume');
				updateNavigation('resume');
				break;
		}
	};

	/**
	 * Fadeout any section that is currently being shown.
	 * Show the requested one.
	 */
	var switchSection = function(section) {
		var viewedSection = $('.viewedSection');

		if (viewedSection.length !== 0) {
			viewedSection.fadeOut('slow', function() {
				viewedSection.removeClass('viewedSection');
				loadSection(section);
			});
		}

		/**
		 * First time visiting the page, no section to hide.
		 * Little delay before the section starts, so the header/footer animation finishes
		 */
		else {
			setTimeout(function() {
				loadSection(section);
			}, 400);
		}
	};

	/**
	 * Call the requested section
	 */
	var loadSection = function(section) {
		content.find('#' + section).show();

		switch (section) {
			case 'welcome' :
				var welcome = new Welcome();
				welcome.init();
				break;

			case 'portfolio' :
				var portfolio = new Portfolio();
				portfolio.init();
				break;

			case 'contact' :
				var contact = new Contact();
				contact.init();
				break;

			case 'resume' :
				var resume = new Resume();
				resume.init();
				break;
		}
	};

	/**
	 * Selectors
	 */
	var cacheSelectors = function() {
		content = $('#content');
		topHeader = $('#topheader');
		logo = $('#logo');
		mainNavigation = $('#main_nav');
		pageFooter = $('#pagefooter');
	};

	window.Site = Site;

}(window));

(function(window) {

	var social,
		openArrow,
		arrowPointer,
		socialClose,
		leftArrow,
		rightArrow,
		socialFeed,
		header,
		content,
		footer;

	var isOpen = false,
		singleItemWidth = 532,
		itemsWidth = 0;

	function Social() { }

	Social.prototype.init = function() {
		cacheSelectors();

		openArrow.on('click', openArrowClicked);
		socialClose.on('click', socialCloseClicked);

		header.on('click', contentClicked);
		content.on('click', contentClicked);
		footer.on('click', contentClicked);

		rightArrow.on('click', rightArrowClicked);
		leftArrow.on('click', leftArrowClicked);

		socialFeed.find('li').each(function() {
			itemsWidth += $(this).innerWidth() + 3;
		});

		socialFeed.css({ width : itemsWidth, left : 0 });
	};

	/**
	 * Click on Arrows
	 */
	var rightArrowClicked = function(e) {
		e.preventDefault();

		if (TweenMax.isTweening(socialFeed)) {
			return false;
		}

		// Move items to the left
		if (parseInt(socialFeed.css('left'), 10) > -parseInt(socialFeed.css('width'), 10) + singleItemWidth + 40) {
			TweenMax.to(socialFeed, 0.5, { left : '-=' + singleItemWidth, ease : Expo.easeOut } );
		}

		// animate back to the beginning
		else {
			TweenMax.to(socialFeed, 0.8, { left : 0, ease : Expo.easeOut } );
		}
	};

	var leftArrowClicked = function(e) {
		e.preventDefault();

		if (TweenMax.isTweening(socialFeed)) {
			return false;
		}

		// Animate to the right
		if (parseInt(socialFeed.css('left'), 10) < 0) {
			TweenMax.to(socialFeed, 0.5, { left : '+=' + singleItemWidth, ease : Expo.easeOut } );
		}

		// animate back to the end
		else {
			TweenMax.to(socialFeed, 0.8, { left : -parseInt(socialFeed.css('width'), 10) + singleItemWidth + 38, ease : Expo.easeOut } );
		}
	};

	/**
	 * Social Widget Animations
	 */
	var openSocial = function() {
		TweenMax.to(social, 0.7, { left : '0%', ease : Expo.easeOut } );
	};

	var closeSocial = function() {
		TweenMax.to(social, 0.7, { left : '100%', ease : Expo.easeOut } );
	};

	/**
	 * Close/Open the social widget
	 */
	var contentClicked = function(e) {
		e.preventDefault();
		socialCloseClicked(e);
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
		social = $('#social');
		openArrow = $('#open_arrow');
		arrowPointer = openArrow.find('img');
		socialClose = $('.social_close');
		leftArrow = $('.left_arrow');
		rightArrow = $('.right_arrow');
		socialFeed = $('.social_feed');
		header = $('#topheader');
		content = $('#content');
		footer = $('#pagefooter');
	};

	window.Social = Social;

}(window));

(function(window) {

	function Utils() { }

	/**
	 * Take's an element text() and wraps each letter in a <span> to animate it
	 */
	Utils.spanText = function(element) {
		var markup = '';
		var txt = element.text();

		for (var i = 0; i < txt.length; i++) {
			var character = txt.charAt(i);
			markup += '<span class="a">' + character + '</span>';
		}

		element.empty().append(markup);
	};

	window.Utils = Utils;

}(window));

(function(window) {

	var welcome,
		myName,
		myPortfolio,
		whomAmI,
		timeline;

	function Welcome() { }

	Welcome.prototype.init = function() {
		cacheSelectors();
		welcome.addClass('viewedSection');

		// Link fix, anchors doesn't seem to work if animated? Need to find a workaroud
		$('h3').on('click', function(e) {
			var target = e.target;

			if (target.id === 'work_link') {
				window.open(target.dataset.url, '_blank');
			}
		});

		// My name is...
		myName = welcome.find('h2').first();
		var mynameChild = myName.children().remove();
		Utils.spanText(myName);
		myName.append(mynameChild);

		// And this is my...
		myPortfolio = welcome.find('h2').eq(1);
		var myPortfolioChild = myPortfolio.children().remove();
		Utils.spanText(myPortfolio);
		myPortfolio.append(myPortfolioChild);

		// Im a...
		whomAmI = welcome.find('h3');
		var whomAmIChild = whomAmI.children().remove();
		Utils.spanText(whomAmI);
		whomAmI.append(whomAmIChild);

		// animations
		timeline = new TimelineMax();
		timeline.staggerFrom(myName.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05);
		timeline.from(myName.find('span.johnred'), 0.8, { opacity : 0, ease : Expo.easeOut }, '-=0.2');
		timeline.staggerFrom(myPortfolio.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05, '-=0.8');
		timeline.from(myPortfolio.find('span.johnred'), 0.8, { opacity : 0, ease : Expo.easeOut }, '-=0.2');
		timeline.staggerFrom(whomAmI.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.03, '-=0.8');
		timeline.from(whomAmI.find('span.johnsquared'), 0.8, { opacity : 0, ease : Expo.easeOut }, '-=0.2');
	};

	/**
	 * Selectors
	 */
	var cacheSelectors = function() {
		welcome = $('#welcome');
	};

	window.Welcome = Welcome;

}(window));
