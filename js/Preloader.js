(function(window) {

	var site,
		$preloadText,
		$preloadBg;

	function Preloader() {}

	Preloader.prototype.init = function() {
		$preloadText = $(".load_text");
		$preloadBg = $(".preload_bg");

		TweenMax.to($preloadText, 1, { opacity : 0, onComplete : loadAnimationComplete } );
	};

	function bgAnimationComplete() {
		$preloadBg.hide();

		site = new Site();
		site.init();
	}

	function loadAnimationComplete() {
		$preloadText.hide();
		TweenMax.to($preloadBg, 1, { opacity : 0, onComplete : bgAnimationComplete } );
	}

	window.Preloader = Preloader;

}(window));