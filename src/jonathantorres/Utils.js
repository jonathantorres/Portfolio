(function(window) {

    function Utils() { }

    /**
     * Take's an element text() and wraps each letter in a <span> to animate it
     */
    Utils.spanText = function(element) {
        var markup = '';
        var txt = element.text();

        for (var i = 0; i < txt.length; i++) {
            var character = txt.charAt(i);
            markup += '<span class="a">' + character + '</span>';
        }

        element.empty().append(markup);
    };

    window.Utils = Utils;

}(window));
