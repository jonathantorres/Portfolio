/**
 * Start site!
 */
$(window).on('load', function() {
    var preloader = new Preloader();
    preloader.init();

    // load portfolio works JSON
    Utils.getJSONData();
});
