(function(window) {

	var $content,
		$topHeader,
		$logo,
		$mainNavigation,
		$pageFooter,
		header;

	function Site() {}

	Site.prototype.init = function() {
		cacheSelectors();

		// set up Hasher
		hasher.changed.add(handleHasher);
		hasher.initialized.add(handleHasher);
		hasher.init();

		// Animate in header and footer
		TweenMax.to($topHeader, 0.5, { top : "0px", ease : Power1.easeOut } );
		TweenMax.to($pageFooter, 0.5, { bottom : "0px", ease : Power1.easeOut } );

		// Start the header
		header = new Header();
		header.init($topHeader);

		// Click on main nav items
		$mainNavigation.find("a").on("click", function(e) {
			e.preventDefault();
			var path = $(this).attr("href");
			hasher.setHash(path);
		});

		// Click on logo. Same as "Home" click
		$logo.on("click", function(e) {
			e.preventDefault();
			$mainNavigation.find("a").first().click();
		});
		
	};

	var cacheSelectors = function() {
		$content = $("#content");
		$topHeader = $("#topheader");
		$logo = $("#logo");
		$mainNavigation = $("#main_nav");
		$pageFooter = $("#pagefooter");
	};

	/**
	 * Handle page deep links
	 */
	var handleHasher = function(newHash, oldHash) {
		switch(newHash) {
			case "" :
			case "welcome" :
				switchSection("welcome");
				break;

			case "portfolio" : 
				switchSection("portfolio");
				break;

			case "contact" : 
				switchSection("contact");
				break;

			case "resume" : 
				switchSection("resume");
				break;
		}
	};

	/**
	 * Fadeout any section that is currently being shown. 
	 * Show the requested one.
	 */
	var switchSection = function(section) {
		var $viewedSection = $(".viewedSection");

		if ($viewedSection.length !== 0) {
			$viewedSection.fadeOut("slow", function() {
				$viewedSection.removeClass("viewedSection");
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
		$content.find("#" + section).show();

		switch (section) {
			case "welcome" :
				var welcome = new Welcome();
				welcome.init();
				break;

			case "portfolio" :
				var portfolio = new Portfolio();
				portfolio.init();
				break;

			case "contact" :
				var contact = new Contact();
				contact.init();
				break;

			case "resume" :
				var resume = new Resume();
				resume.init();
				break;
		}
	};

	window.Site = Site;

}(window));