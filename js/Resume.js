(function(window) {

	var $resume;

	function Resume() {
		
	}

	Resume.prototype.init = function() {
		$resume = $("#resume");
		$resume.addClass("viewedSection");
	}

	window.Resume = Resume;
	
}(window));