(function(window) {

	var $social,
		$arrow,
		$arrowPointer;

	function Social() {}

	Social.prototype.init = function() {
		cacheSelectors();
		$arrow.on("click", arrowClicked);
	};

	var cacheSelectors = function() {
		$arrow = $("#open_arrow");
		$arrowPointer = $arrow.find("img");
	};

	var arrowClicked = function(e) {
		e.preventDefault();
		console.log("Ja!");
	};

	window.Social = Social;

}(window));