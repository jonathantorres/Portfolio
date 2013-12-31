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

    /**
     * Create an url friendly string
     * Ex. Hey Jonathan -> hey-jonathan
     */
    Utils.slug = function(string) {
        var text = string.toLowerCase()
                   .replace(/[^\w ]+/g, '')
                   .replace(/ +/g, '-');

        return text;
    };

    /**
     * Get JSON data for portfolio
     */
    Utils.getJSONData = function() {
        $.ajax({
            url : 'php/portfolio.json',
            dataType : 'JSON',
            method : 'GET',
            success : function(data) {
                Portfolio.prototype.worksData = data.works;
            }
        });
    };

    window.Utils = Utils;

}(window));
