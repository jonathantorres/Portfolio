<?php

    /**
     * Get my tweets
     */
    session_start();
    require_once('php/twitteroauth/twitteroauth.php');

    $consumer_key = 'XzzTFFfulENqQdH2yPk8Ug';
    $consumer_secret = 'INF7QvSkdLYUPW46H9TMqYOs1KDxaZqJl3kTxMmW7s';
    $access_token = '75446347-wgf1ns8OnWm8mrus8cQoMp5s3KCf1f3HiPsQ14n0I';
    $access_token_secret = 'xkkZZLthB1ZMFMVht3rrBdEK3iLdi7E7e3QcWJC1Lrc';

    $connection = new TwitterOAuth($consumer_key, $consumer_secret, $access_token, $access_token_secret);
    $tweets = $connection->get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=torres_jonathan&count=30&include_rts=false&exclude_replies=true');

    /**
     * Get instagram feed
     */
    require_once('php/instagram.class.php');

    $client_id = '83d59a4dc78042ce8594c0109cdeee74';
    $client_secret = 'fb0adb4b9257404aaebb6840753f19a6';
    $website_url = 'http://www.jonathantorres.com';
    $redirect_uri = 'http://www.jonathantorres.com';
    $my_user_id = '22367569';
    $my_access_token = '22367569.83d59a4.1a21de84119a44d089fcf75317faa2f9';

    $instagram = new Instagram(array('apiKey' => $client_id, 'apiSecret' => $client_secret, 'apiCallback' => $redirect_uri));
    $instagram->setAccessToken($my_access_token);
    $instagrams = $instagram->getUserMedia('self', 30);

    /**
     * Merge and Shuffle Twitter/Instagram data.
     */
    $all_media = array_merge($tweets, $instagrams->data);
    shuffle($all_media);

    /**
     * Wrap @mentions and #hastags in a <span>
     * Find urls and wraps them in a <a>
     */
    function format_text($text) {
        $text = preg_replace('#@([\\d\\w]+)#', '<span class="johnred">$0</span>', $text); // @mentions
        $text = preg_replace('/#([\\d\\w]+)/', '<span class="johnred">$0</span>', $text); // #hashtags
        $text = preg_replace('!(http)(s)?:\/\/[a-zA-Z0-9.?&_/]+!', '<a href="$0" target="blank" class="social-link">$0</a>', $text); // urls

        return $text;
    }
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>

        <!-- @author Jonathan Torres -->
        <!-- www.jonathantorres.com -->
        <!-- info@jonathantorres.com -->
        <!-- Developed by Jonathan Torres <info@jonathantorres.com> -->
        <!-- Designed by Juan Carlos Garcia <www.jcagarcia.com> -->

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta http-equiv="Content-Language" content="en" />
        <title>Jonathan Torres | Portfolio</title>
        <meta name="keywords" content="web, web development, html5, javascript, css3, paginas de internet, jonathan torres, web design, puerto rico, flash, actionscript" />
        <meta name="description" content="Portfolio of Flash Developer Jonathan Torres from Puerto Rico.">
        <meta name="author" content="Jonathan Torres" />
        <meta name="country" content="Puerto Rico" />
        <meta name="distribution" content="Global" />
        <meta name="copyright" content="© 2014 Jonathan Torres" />
        <meta name="robots" content="all" />
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/iconmoon.css">
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Quicksand:300,400,700" type="text/css">
        <script src="bower_components/modernizr/modernizr.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Preloader -->
        <div class="preload_bg">
            <div class="circle">
                <div class="subcircle">
                    <div id="preload_circle" class="progress_circle"></div>
                    <div class="front_circle">
                        <p class="skill">Loading</p>
                    </div>
                </div>
            </div><!-- .circle -->
        </div>

        <!-- Site Header -->
        <header id="topheader">
            <a id="logo" class="jonathan" href="welcome" alt="Jonathan Torres">Jonathan <span class="johnred">Torres</span></a>

            <!-- Site Navigation -->
            <nav>
                <ul id="main_nav">
                    <li>
                        <a href="welcome">Home</a>
                        <div class="marker">
                            <div class="prog"></div>
                        </div>
                    </li>
                    <li>
                        <a href="portfolio">Portfolio</a>
                        <div class="marker">
                            <div class="prog"></div>
                        </div>
                    </li>
                    <li>
                        <a href="contact">Contact</a>
                        <div class="marker">
                            <div class="prog"></div>
                        </div>
                    </li>
                    <li>
                        <a href="resume">Resume</a>
                        <div class="marker">
                            <div class="prog"></div>
                        </div>
                    </li>
                </ul>
            </nav>
        </header><!-- #topheader -->

        <!-- Social Slide -->
        <div id="social">
            <!-- Opening Arrow -->
            <a href="#" id="open_arrow">
                <i class="icon-arrow-left"></i>
            </a>

            <a href="#" class="social_close">x</a>

            <div class="title_area clearfix">
                <h1>Social Feed</h1>
                <a href="#" class="social_arrow left_arrow"><i class="icon-arrow-left"></i></a>
                <a href="#" class="social_arrow right_arrow"><i class="icon-arrow-right"></i></a>
            </div>

            <div class="feed_wrapper">
                <ul class="social_feed clearfix">
                    <?php foreach ($all_media as $media) : ?>
                        <?php if (property_exists($media, 'type')) : // Instagram posts ?>
                            <li class="instagram">
                                <a href="<?php echo $media->link; ?>" target="_blank" class="circle social-link">
                                    <div class="circle inside">
                                        <div class="hover">
                                            <img src="img/instagram_hover_icon.png" alt="Instagram">
                                        </div>
                                        <img src="<?php echo $media->images->thumbnail->url; ?>" alt="Instagram Image">
                                    </div>
                                </a>
                                <h3>Instagram</h3>
                                <p><?php echo format_text($media->caption->text); ?></p>
                            </li>
                        <?php else : // Twitter posts ?>
                            <li class="twitter">
                                <h3>Twitter</h3>
                                <p><?php echo format_text($media->text); ?></p>
                            </li>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>

        <div id="content">