(function(window) {

	var $portfolio;

	function Portfolio() {
		
	}

	Portfolio.prototype.init = function() {
		$portfolio = $("#portfolio");
		$portfolio.addClass("viewedSection");
	};

	window.Portfolio = Portfolio;

}(window));