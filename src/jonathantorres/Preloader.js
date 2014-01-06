(function(window) {

    var site,
        circleLoader,
        preloadBg;

    var paper,
        width = 136,
        height = 136,
        color = '#e3030c',
        speed = 1.6,
        startPercent = 0,
        endPercent = 99.2,
        centerX = width * 0.5,
        doublePI = Math.PI * 2,
        halfPI = Math.PI / 2;

    function Preloader() { }

    Preloader.prototype.init = function() {
        cacheSelectors();

        paper = new Raphael('preload_circle', width, height);
        TweenMax.ticker.addEventListener('tick', ticked);

        // Fadeout loader
        TweenMax.to(circleLoader, 1, { opacity : 0, delay: 1, onComplete : loadAnimationComplete } );
    };

    /**
     * Animate circle progress
     */
    var ticked = function() {
        if (startPercent >= endPercent) {
            startPercent = endPercent;

            // once finished, create the whole circle.
            paper.clear();
            var fullCircle = paper.circle(centerX, centerX, centerX);
            fullCircle.attr({ fill : color, 'stroke-width' : 0 });
        } else {
            startPercent += speed;
            paper.clear();

            var angle = doublePI * startPercent / 100 - halfPI;
            var x = Math.cos(angle) * centerX + centerX;
            var y = Math.sin(angle) * centerX + centerX;
            var largeArcFlag = (startPercent <= (100 * 0.5)) ? 0 : 1;

            var path = 'M' + centerX + ',' + centerX + ' L' + centerX + ',0 ';
            path += 'A' + centerX + ',' + centerX + ' 0 ' + largeArcFlag + ',1 ' + x + ',' + y + ' ';
            path += 'L' + centerX + ',' + centerX + 'Z';

            var circlePath = paper.path(path);
            circlePath.attr({ fill : color, 'stroke-width' : 0 });
        }
    };

    /**
    * Black background has faded out. Hide it.
    * Init site!
    */
    function bgAnimationComplete() {
        preloadBg.hide();

        site = new Site();
        site.init();
    }

    /**
    * loader has faded out. Hide it.
    */
    function loadAnimationComplete() {
        circleLoader.hide();

        // Fade out the black background
        TweenMax.to(preloadBg, 0.3, { opacity : 0, onComplete : bgAnimationComplete } );
    }

    /**
     * jQuery selectors
     */
    var cacheSelectors = function() {
        preloadBg = $('.preload_bg');
        circleLoader = preloadBg.find('.circle');
    };

    window.Preloader = Preloader;

}(window));
