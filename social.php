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
