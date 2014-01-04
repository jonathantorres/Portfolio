<?php require_once("header.php"); ?>

    <!-- Welcome -->
    <section id="welcome">
        <div class="circle">
            <div class="circle inside">
                <img src="img/thats_me.jpg" alt="me">
            </div>
        </div><!-- .circle -->

        <h2 class="in_the_top">My name is JONATHAN <span class="johnred">TORRES.</span></h2>
        <h2>And this is my <span class="johnred">Portfolio.</span></h2>
        <h3>I’m a Developer <a href="http://www.nobox.com" id="work_link" target="_blank" class="johnsquared">@Nobox.</a></h3>
    </section><!-- #welcome -->

    <!-- Portfolio -->
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
    </section><!-- #portfolio -->

    <!-- Contact -->
    <section id="contact">
        <h1 class="title">Contact Me</h1>
        <p class="summary">Contact me here dude!! :P</p>
        <form id="contact_form">
            <ul>
                <li class="text_input">
                    <label for="username">NAME</label>
                    <input type="text" id="username" name="username" placeholder="NAME">
                </li>
                <li class="text_input">
                    <label for="email">E-MAIL</label>
                    <input type="email" id="email" name="email" placeholder="E-MAIL">
                </li>
                <li class="text_area">
                    <label for="message">MESSAGE</label>
                    <textarea id="message" name="message" placeholder="MESSAGE"></textarea>
                </li>
                <li>
                    <p class="error_feedback"></p>
                    <input type="submit" class="button" id="send" name="send" value="SEND">
                </li>
            </ul>
        </form>
        <div id="success">
            <p>Thanks for your message!</p>
            <a href="#" id="ok" class="button">OK</a>
        </div>
    </section><!-- #contact -->

    <!-- Resume -->
    <section id="resume">
        <div id="overview">
            <div class="circle">
                <div class="circle inside">
                    <img src="img/thats_me.jpg" alt="me">
                </div>
            </div><!-- .circle -->

            <h1 class="title">Overview</h1>
            <p>Developer that enjoys creating interactive experiences and animation.</p>
            <p>4 years of experience working on web technologies such as HTML, CSS, ActionScript 3.0, JavaScript, PHP and MySQL.</p>
        </div><!-- #overview -->

        <div id="specialties">
            <h1 class="title">Specialties</h1>
            <p class="special_slogan">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
            <h3>Languages - Technologies</h3>
            <div class="skills_row1">
                <div class="circle">
                    <div class="subcircle">
                        <div id="html5_circle" class="progress_circle"></div>
                        <div class="front_circle">
                            <p class="skill">HTML5</p>
                        </div>
                    </div>
                </div><!-- .circle -->

                <div class="circle">
                    <div class="subcircle">
                        <div id="css3_circle" class="progress_circle"></div>
                        <div class="front_circle">
                            <p class="skill">CSS3</p>
                        </div>
                    </div>
                </div><!-- .circle -->

                <div class="circle">
                    <div class="subcircle">
                        <div id="js_circle" class="progress_circle"></div>
                        <div class="front_circle">
                            <p class="skill">JS</p>
                        </div>
                    </div>
                </div><!-- .circle -->

                <div class="circle">
                    <div class="subcircle">
                        <div id="php_circle" class="progress_circle"></div>
                        <div class="front_circle">
                            <p class="skill">PHP</p>
                        </div>
                    </div>
                </div><!-- .circle -->
            </div><!-- .skills_row1 -->

            <div class="skills_row2">
                <div class="circle">
                    <div class="subcircle">
                        <div id="mysql_circle" class="progress_circle"></div>
                        <div class="front_circle">
                            <p class="skill">MySQL</p>
                        </div>
                    </div>
                </div><!-- .circle -->

                <div class="circle">
                    <div class="subcircle">
                        <div id="as3_circle" class="progress_circle"></div>
                        <div class="front_circle">
                            <p class="skill">AS3</p>
                        </div>
                    </div>
                </div><!-- .circle -->

                <div class="circle">
                    <div class="subcircle">
                        <div id="fl_circle" class="progress_circle"></div>
                        <div class="front_circle">
                            <p class="skill">Fl</p>
                        </div>
                    </div>
                </div><!-- .circle -->
            </div><!-- .skills_row2 -->
        </div><!-- #specialties -->

        <div id="experience">
            <h1 class="title">Experience</h1>
            <p class="experience_slogan">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
            <div class="past_job past_experience1">
                <div class="circle">
                    <div class="circle inside">
                        <img src="img/nobox_logo.jpg" alt="Nobox">
                    </div>
                </div><!-- .circle -->
                <h4>Nobox Marketing Group</h4>
                <p class="position">Developer</p>
                <p class="timeframe">May 2011 – Present</p>
            </div>

            <div class="past_job past_experience2">
                <div class="circle">
                    <div class="circle inside">
                        <img src="img/rubali_logo.jpg" alt="Rubali">
                    </div>
                </div>
                <h4>Rubali Professionals</h4>
                <p class="position">Flash & Web Developer</p>
                <p class="timeframe">October 2009 – May 2010</p>
            </div>
        </div><!-- #experience -->

        <a href="#" class="social_arrow up_arrow"><i class="icon-arrow-up"></i></a>
        <a href="#" class="social_arrow down_arrow"><i class="icon-arrow-down"></i></a>
    </section><!-- #resume -->

<?php require_once("footer.php"); ?>
