$(window).on("load", function() {
	$(".load_text").fadeOut("normal", function() {
		$(".preload_bg").fadeOut("normal", function() {
			var site = new Site();
			site.init();
		});
	});
});

