<?php
    $works = json_decode(file_get_contents('php/portfolio.json'));
?>

<section id="portfolio">
    <ul id="works">
        <?php foreach($works->works as $work) : ?>
            <li data-id="<?php echo $work->id; ?>" class="work">
                <a href="#" style="background: transparent url(<?php echo $work->thumbnail; ?>) no-repeat center center; background-size: cover;">
                    <div class="hover">
                        <h3><?php echo $work->name; ?></h3>
                        <p><?php echo $work->tech; ?></p>
                    </div>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>

    <div class="lightbox"></div>

    <div class="project-view">
        <a href="#" class="close-project">x</a>
        <img src="img/project_sample_img.png" alt="" class="project-img">
        <h3>Project name</h3>
        <p>Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows.</p>
        <a href="http://google.com" target="_blank" class="visit-project">visit site</a>
    </div>
</section>
