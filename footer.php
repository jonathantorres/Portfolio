        </div><!-- content -->

        <footer id="pagefooter">
            <p>&copy; 2013 | Jonathan Torres | All rights reserved</p>
            <ul class="social_icons">
                <li><a href="https://www.twitter.com/torres_jonathan" target="_blank"><i class="icon-twitter"></i></a></li>
                <li><a href="https://github.com/jonathantorres" target="_blank"><i class="icon-github"></i></a></li>
                <li><a href="http://www.linkedin.com/in/torresjonathan" target="_blank"><i class="icon-linkedin"></i></a></li>
            </ul>
        </footer><!-- footer -->

        <script src="bower_components/jquery/jquery.min.js"></script>
        <script src="bower_components/jquery/jquery-migrate.min.js"></script>
        <script src="bower_components/greensock/src/minified/TweenMax.min.js"></script>
        <script src="bower_components/js-signals/dist/signals.min.js"></script>
        <script src="bower_components/hasher/dist/js/hasher.min.js"></script>
        <script src="bower_components/raphael/raphael-min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/jonathantorres.js"></script>

        <!-- Start site! -->
        <script>
            $(window).on('load', function() {
                var preloader = new Preloader();
                preloader.init();
            });
        </script>

        <!-- Google Analytics: -->
        <script type="text/javascript">
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-39729231-1']);
            _gaq.push(['_trackPageview']);

            (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();
        </script>
    </body>
</html>
