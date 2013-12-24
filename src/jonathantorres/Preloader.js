(function(window) {

    var site,
        preloadText,
        preloadBg;

    function Preloader() { }

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
