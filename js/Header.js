(function(window) {

	var $header,
		headerHeight = { start : "40px", end : "325px" },
		$arrow,
		arrowPos = { start : "39px", end : "324px" },
		$arrowPointer,
		$leftArrow,
		$rightArrow,
		$headerContent,
		$boxes,
		boxesWidth = 0,
		isOpen = false;

	function Header() {}

	Header.prototype.init = function(header) {
		$header = header;
		$arrow = $header.find(".arrow");
		$arrowPointer = $arrow.find("img");
		$headerContent = $("#header_content");
		$boxes = $headerContent.find(".boxes");
		$leftArrow = $headerContent.find(".left_arrow");
		$rightArrow = $headerContent.find(".right_arrow");

		$header.on("mouseenter", headerMouseEnter);
		$header.on("mouseleave", headerMouseLeave);
		$arrow.on("click", arrowClicked);
		$leftArrow.on("click", leftArrowClicked);
		$rightArrow.on("click", rightArrowClicked);

		$("#content").on("click", contentClicked);

		$boxes.find("li").each(function() {
			boxesWidth += $(this).innerWidth() + 52;
		});
		$boxes.css({ width : boxesWidth, left : $(window).innerWidth() });
	};

	var arrowClicked = function(e) {
		e.preventDefault();

		if (isOpen) {
			closeHeader();
		} else {
			startHeader();
		}
	};

	var contentClicked = function() {
		if (isOpen) {
			closeHeader();
		}
	};

	var closeHeader = function() {
		TweenMax.to($arrowPointer, 0.5, { rotation : 0, ease : Expo.easeOut } );

		var closeTimeline = new TimelineMax();
		closeTimeline.to($leftArrow, 0.2, { left : -37, ease : Expo.easeOut } );
		closeTimeline.to($rightArrow, 0.2, { right : -37, ease : Expo.easeOut }, "-=0.2" );
		closeTimeline.to($boxes, 0.5, { left : $(window).innerWidth(), ease : Expo.easeOut } );
		closeTimeline.to($headerContent, 0.3, { scaleX : 0, scaleY : 0, ease : Expo.easeOut }, "-=0.3" );

		TweenMax.to($header, 1, { height : headerHeight.start, ease : Expo.easeOut, delay : 0.4 } );
		TweenMax.to($arrow, 1, { top : arrowPos.start, ease : Expo.easeOut, delay : 0.4 } );

		isOpen = false;
	};

	var startHeader = function() {
		TweenMax.to($arrowPointer, 0.5, { rotation : 180, ease : Expo.easeOut } );
		TweenMax.to($header, 1, { height : headerHeight.end, ease : Expo.easeOut } );
		TweenMax.to($arrow, 1, { top : arrowPos.end, ease : Expo.easeOut } );

		var startTimeline = new TimelineMax();
		startTimeline.delay(0.2);
		startTimeline.to($headerContent, 0.5, { scaleX : 1, scaleY : 1, ease : Expo.easeOut } );
		startTimeline.to($boxes, 0.5, { left : 0, ease : Expo.easeOut }, "-=0.2" );
		startTimeline.from($leftArrow, 0.5, { left : -37, ease : Expo.easeOut } );
		startTimeline.from($rightArrow, 0.5, { right : -37, ease : Expo.easeOut }, "-=0.5" );

		isOpen = true;
	};

	var headerMouseEnter = function() {
		//console.log("mouse enter");
		TweenMax.to($leftArrow, 1, { left : 0, ease : Expo.easeOut } );
		TweenMax.to($rightArrow, 1, { right : 0, ease : Expo.easeOut } );
	};

	var headerMouseLeave = function() {
		//console.log("mouse leave");
		TweenMax.to($leftArrow, 1, { left : -37, ease : Expo.easeOut } );
		TweenMax.to($rightArrow, 1, { right : -37, ease : Expo.easeOut } );
	};

	var leftArrowClicked = function(e) {
		e.preventDefault();

		if (TweenMax.isTweening($boxes)) {
			return false;
		}

		// Move items to the left
		if (parseInt($boxes.css("left"), 10) > -parseInt($boxes.css("width"), 10) + 562) {
			TweenMax.to($boxes, 0.8, { left : "-=552", ease : Expo.easeOut } );
		} 

		// animate back to the beginning
		else {
			TweenMax.to($boxes, 1, { left : 0, ease : Expo.easeOut } );
		}
	};

	var rightArrowClicked = function(e) {
		e.preventDefault();

		if (TweenMax.isTweening($boxes)) {
			return false;
		}

		// Animate to the right
		if (parseInt($boxes.css("left"), 10) < 0) {
			TweenMax.to($boxes, 0.8, { left : "+=552", ease : Expo.easeOut } );
		}
		
		// animate back to the end
		else {
			TweenMax.to($boxes, 1, { left : -parseInt($boxes.css("width"), 10) + 562, ease : Expo.easeOut } );
		}
	};

	window.Header = Header;

}(window));