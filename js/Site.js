(function(window) {

	var $content,
		$topHeader,
		$pageFooter,
		header;

	function Site() {}

	Site.prototype.init = function() {
		$content = $("#content");
		$topHeader = $("#topheader");
		$pageFooter = $("#pagefooter");

		TweenMax.to($topHeader, 0.5, { top : "0px", ease : Power1.easeOut } );
		TweenMax.to($pageFooter, 0.5, { bottom : "0px", ease : Power1.easeOut } );

		header = new Header();
		header.init($topHeader);
		
		switchSection("welcome");
		addressListeners();
	};

	/**
	 * jQuery address functionallity
	 */
	var addressListeners = function() {
		$.address.change(function(e) {
			switch (e.value) {
				case "/" :
					$.address.value("/welcome");
					break;

				case "/welcome" :
					switchSection("welcome");
					break;

				case "/portfolio" :
					switchSection("portfolio");
					break;

				case "/contact" :
					switchSection("contact");
					break;

				case "/resume" :
					switchSection("resume");
					break;

				default :
					$.address.value("/welcome");
					break;
			}
		});

		/**
		 * Click on main nav items
		 */
		$("#main_nav a").on("click", function(e) {
			e.preventDefault();
			var path = $(this).attr("href");
			$.address.value(path);
		});
	};

	/**
	 * fadeout any section that is currently being shown. Show the requested one.
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
			}, 500);
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
				//welcome.init();
				break;

			case "portfolio" :
				var portfolio = new Portfolio();
				//portfolio.init();
				break;

			case "contact" :
				var contact = new Contact();
				//contact.init();
				break;

			case "resume" :
				var resume = new Resume();
				//resume.init();
				break;
		}
	};

	window.Site = Site;

}(window));