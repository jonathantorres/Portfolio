/**
 * Jonathan Torres Portfolio
 * Version: 1.0.0
 * Author: Jonathan Torres | jonathantorres41@gmail.com
 * Compiled on 2014-01-18
 */

(function(window) {

    var contact,
        title,
        summary,
        success,
        timeline;

    var contactForm,
        usernameField,
        emailField,
        messageField,
        errorFeedback,
        okButton,
        sendButton;

    function Contact() { }

    Contact.prototype.init = function() {
        cacheSelectors();
        contact.addClass('viewedSection');

        // display form by default
        contactForm.css( { 'display' : 'block'} );
        success.css( { 'display' : 'none'} );

        // remove any error classes
        errorFeedback.text('');
        usernameField.removeClass('error');
        emailField.removeClass('error');
        messageField.removeClass('error');

        resetValues();

        // animate!
        timeline = new TimelineMax();
        timeline.from(title, 1, { opacity : 0, ease : Expo.easeOut });
        timeline.from(summary, 1, { opacity : 0, marginLeft : '-60px', ease : Expo.easeOut }, '-=0.8');
        timeline.from(contactForm, 1, { opacity : 0, ease : Expo.easeOut }, '-=0.8');

        usernameField.on('blur', function() {
            validateField($(this), false);
        });

        messageField.on('blur', function() {
            validateField($(this), false);
        });

        emailField.on('blur', function() {
            validateField($(this), true);
        });

        emailField.on('keypress', function() {
            validateField($(this), true);
        });

        // send button
        sendButton.on('click', function(e) {
            e.preventDefault();
            validateForm();
        });

        // "ENTER" key press
        $(window).on('keyup', function(e) {
            if (e.keyCode === 13) {
                validateForm();
            }
        });

        // go back to form
        okButton.on('click', function(e) {
            e.preventDefault();

            success.fadeOut('normal', function() {
                resetValues();
                contactForm.fadeIn();
            });
        });
    };

    /**
     * Validate a single field
     */
    var validateField = function(field, isEmail) {
        var fieldValue = field.val();

        if (fieldValue === '') {
            errorFeedback.text('All fields are required.');
            field.addClass('error');

            return false;
        }

        if (isEmail) {
            var emailRegex = /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/;

            if (fieldValue.search(emailRegex) === -1) {
                errorFeedback.text('Invalid email.');
                field.addClass('error');

                return false;
            }
        }

        if (usernameField.hasClass('error') === false && emailField.hasClass('error') === false && messageField.hasClass('error') === false) {
            errorFeedback.text('');
        }

        field.removeClass('error');

        return true;
    };

    /**
     * Check if all fields are OK
     */
    var validateForm = function() {
        var usernameValidation = validateField(usernameField, false),
            emailValidation = validateField(emailField, true),
            messageValidation = validateField(messageField, false);

        if (usernameValidation === false || messageValidation === false) {
            errorFeedback.text('All fields are required.');
            return false;
        }

        if (emailValidation === false) {
            errorFeedback.text('Invalid email.');
            return false;
        }

        errorFeedback.text('');
        usernameField.removeClass('error');
        emailField.removeClass('error');
        messageField.removeClass('error');

        var username = usernameField.val(),
            useremail = emailField.val(),
            usermessage = messageField.val();

        $.ajax({
            type : 'POST',
            url : 'php/submit_contact_form.php',
            data : { un : username, ue : useremail, um : usermessage },
            success : function() {
                contactForm.fadeOut('normal', function() {
                    success.fadeIn();
                });
            },
            error : function() {
                console.log('error!');
            }
        });
    };

    /**
     * Reset field values
     */
    var resetValues = function() {
        usernameField.val('');
        emailField.val('');
        messageField.val('');
    };

    /**
     * Selectors
     */
    var cacheSelectors = function() {
        contact = $('#contact');
        title = $('.title');
        summary = $('.summary');
        success = $('#success');

        contactForm = $('#contact_form');
        usernameField = $('#username');
        emailField = $('#email');
        messageField = $('#message');
        errorFeedback = $('.error_feedback');
        sendButton = $('#send');
        okButton = $('#ok');
    };

    window.Contact = Contact;

}(window));

$(window).on('load', function() {
    var preloader = new Preloader();
    preloader.init();

    // load portfolio works JSON
    Utils.getJSONData();
});

(function(window) {

    var _this,
        portfolio,
        works,
        orderedWorks,
        shuffledWorks;

    var lightbox,
        project,
        closeProject,
        projectImage,
        projectHeading,
        projectInfo,
        projectLink,
        header,
        footer,
        workTimeline,
        closeTimeline;

    function Portfolio() { }

    Portfolio.prototype.init = function() {
        _this = this;
        cacheSelectors();
        portfolio.addClass('viewedSection');

        // shuffle works before animating
        orderedWorks = works.find('.work');
        shuffledWorks = orderedWorks.sort(function() {
            return 0.5 - Math.random();
        });

        // close any previously opened project
        if (project.is(':visible')) {
            closeTimelineFinished();
            resetPositions();
        }

        // animate thumbs
        TweenMax.staggerFrom(shuffledWorks, 2, { opacity : 0, ease : Expo.easeOut }, 0.2);

        // click on thumbs
        works.find('a').on('click', onWorkClick);
    };

    /**
     * Click on a work thumbnail
     */
    var onWorkClick = function(e) {
        e.preventDefault();

        var target = $(e.currentTarget);
        var id = parseInt(target.parent().data('id'), 10);
        var workData = _this.getWorkData(id);

        // set deeplink
        hasher.setHash('portfolio/' + Utils.slug(workData.name));
    };

    /**
     * Get data for a portfolio work
     * You can get the data by it's id or the slug
     */
    Portfolio.prototype.getWorkData = function(id) {
        var selectedWork,
            workID;

        for (var i = 0; i < this.worksData.length; i++) {
            workID = (typeof id === 'number') ? parseInt(this.worksData[i].id, 10) : Utils.slug(this.worksData[i].name);

            if (id === workID) {
                selectedWork = this.worksData[i];
            }
        }

        return selectedWork;
    };

    /**
     * Animates and shows the selected work
     */
    Portfolio.prototype.showWork = function(data) {
        // fill data
        var work = data;
        projectImage.attr('src', work.project_image);
        projectHeading.text(work.name);
        projectInfo.text(work.description);
        projectLink.attr('href', work.url);

        // reset positions and show the necessary items first
        lightbox.show();
        project.show();
        resetPositions();

        // project name
        var projectHeadingChild = projectHeading.children().remove();
        Utils.spanText(projectHeading);
        projectHeading.append(projectHeadingChild);

        // project info
        var projectInfoChild = projectInfo.children().remove();
        Utils.spanText(projectInfo);
        projectInfo.append(projectInfoChild);

        // animate work elements
        workTimeline = new TimelineMax();
        workTimeline.from(lightbox, 1, { opacity : 0, ease : Expo.easeOut });
        workTimeline.from(project, 1, { height : '0%', ease : Expo.easeOut }, '-=0.8');
        workTimeline.from(closeProject, 1, { opacity : 0, ease : Expo.easeOut }, '-=0.5');
        workTimeline.from(projectImage, 1, { opacity : 0, ease : Expo.easeOut }, '-=1.0');
        workTimeline.staggerFrom(projectHeading.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05, '-=0.6');
        workTimeline.staggerFrom(projectInfo.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.01, '-=0.4');
        workTimeline.from(projectLink, 1, { opacity : 0, ease : Expo.easeOut }, '-=0.2');

        // close project
        closeProject.on('click', closeWork);
        lightbox.on('click', closeWork);
        header.on('click', closeWork);
        footer.on('click', closeWork);
    };

    /**
     * Animates back and closes the project being viewed
     */
    var closeWork = function(e) {
        e.preventDefault();

        if (project.is(':visible')) {
            var projectElements = [projectLink, projectInfo, projectHeading, projectImage, closeProject];

            closeTimeline = new TimelineMax();
            closeTimeline.to(projectElements, 1, { opacity : 0, ease : Expo.easeOut });
            closeTimeline.to(project, 1, { height : '0%', ease : Expo.easeOut }, '-=0.6');
            closeTimeline.to(lightbox, 1, { opacity : 0, ease : Expo.easeOut, onComplete : closeTimelineFinished }, '-=0.6');

            hasher.setHash('portfolio');
        }

        // remove events
        closeProject.off('click', closeWork);
        lightbox.off('click', closeWork);
        header.off('click', closeWork);
        footer.off('click', closeWork);
    };

    /**
     * Hide lightbox when the closing work animation finishes
     */
    var closeTimelineFinished = function() {
        lightbox.hide();
        project.hide();
    };

    /**
     * Reset project items back to position to be animated again.
     */
    var resetPositions = function() {
        lightbox.css({ opacity : 1 });
        project.css({ height : '100%' });
        closeProject.css({ opacity : 1 });
        projectImage.css({ opacity : 1 });
        projectHeading.css({ opacity : 1 });
        projectInfo.css({ opacity : 1 });
        projectLink.css({ opacity : 1 });
    };

    /**
     * jQuery selectors
     */
    var cacheSelectors = function() {
        portfolio = $('#portfolio');
        works = $('#works');
        lightbox = $('.lightbox');
        project = $('.project-view');
        closeProject = project.find('.close-project');
        projectImage = project.find('.project-img');
        projectHeading = project.find('h3');
        projectInfo = project.find('p');
        projectLink = project.find('.visit-project');
        header = $('#topheader');
        footer = $('#pagefooter');
    };

    window.Portfolio = Portfolio;

}(window));

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

(function(window) {

    // all areas
    var resume,
        overview,
        specialties,
        experience,
        up_arrow,
        down_arrow,

        // all logic
        sections = [],

        // overview area
        overviewTitle,
        johnCircle,

        // experience area
        experienceTitle,
        pastExperience1,
        pastExperience2,

        // Specialties area
        specialtiesTitle,
        skillsRow1,
        skillsRow2,
        width = 96,
        height = 96,
        speed = 1.6,
        centerX = width * 0.5,
        doublePI = Math.PI * 2,
        halfPI = Math.PI / 2,

        // specialties circles
        circles = [
            { id : 'html5_circle', color : '#f16529', startPercent : 0, endPercent : 99.2, paper : null },
            { id : 'css3_circle', color : '#2c92d6', startPercent : 0, endPercent : 99.2, paper : null },
            { id : 'js_circle', color : '#ff006c', startPercent : 0, endPercent : 99.2, paper : null },
            { id : 'as3_circle', color : '#80ad3b', startPercent : 0, endPercent : 99.2, paper : null },
            { id : 'fl_circle', color : '#e3030c', startPercent : 0, endPercent : 99.2, paper : null },
            { id : 'php_circle', color : '#566fd8', startPercent : 0, endPercent : 99.2, paper : null },
            { id : 'mysql_circle', color : '#0784aa', startPercent : 0, endPercent : 99.2, paper : null }
        ];

    function Resume() { }

    Resume.prototype.init = function() {
        cacheSelectors();
        resume.addClass('viewedSection');

        sections = [overview, specialties, experience];

        up_arrow.on('click', upArrowClicked);
        down_arrow.on('click', downArrowClicked);

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            section.removeClass('current_view');
            section.hide();
        }

        initOverview();
    };

    /**
     * Click on arrows
     */
    var upArrowClicked = function(e) {
        e.preventDefault();

        var currentSection,
            prevSection;

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];

            if (TweenMax.isTweening(section)) {
                return false;
            }

            if (section.hasClass('current_view')) {
                currentSection = section;

                if (i === 0) {
                    prevSection = sections[sections.length - 1];
                } else {
                    prevSection = sections[i - 1];
                }
            }
        }

        currentSection.removeClass('current_view');

        prevSection.css( { top : '-50%' } );
        prevSection.addClass('current_view');
        prevSection.show();

        TweenMax.to(currentSection, 1, { top : '150%', opacity : 0, ease : Expo.easeOut } );
        TweenMax.to(prevSection, 1, { top : '50%', opacity : 1, ease : Expo.easeOut } );

        switch (prevSection.attr('id')) {
            case 'overview' :
                startOverview(true);
                resetCircles();
                break;

            case 'specialties' :
                startSpecialties(true);
                break;

            case 'experience' :
                startExperience(true);
                resetCircles();
                break;
        }
    };

    var downArrowClicked = function(e) {
        e.preventDefault();

        var currentSection,
            nextSection;

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];

            if (TweenMax.isTweening(section)) {
                return false;
            }

            if (section.hasClass('current_view')) {
                currentSection = section;

                if (sections.length - 1 === i) {
                    nextSection = sections[0];
                } else {
                    nextSection = sections[i + 1];
                }
            }
        }

        currentSection.removeClass('current_view');

        nextSection.css( { top : '100%' } );
        nextSection.addClass('current_view');
        nextSection.show();

        TweenMax.to(currentSection, 1, { top : '-50%', opacity : 0, ease : Expo.easeOut } );
        TweenMax.to(nextSection, 1, { top : '50%', opacity : 1, ease : Expo.easeOut } );

        switch (nextSection.attr('id')) {
            case 'overview' :
                startOverview(false);
                resetCircles();
                break;

            case 'specialties' :
                startSpecialties(false);
                break;

            case 'experience' :
                startExperience(false);
                resetCircles();
                break;
        }
    };

    /**
     * Init the overview area (the first time)
     */
    var initOverview = function() {
        overview.addClass('current_view');
        overview.show();
        overview.css( { opacity : 1, top : '50%' } );

        // Reset the specialties circles fills each time you visit!
        resetCircles();

        // Developer that...
        var developerThat = overview.find('p').first();
        var developerThatChild = developerThat.children().remove();
        Utils.spanText(developerThat);
        developerThat.append(developerThatChild);

        // 4 years of experience...
        var yearsOfExp = overview.find('p').eq(1);
        var yearsOfExpChild = yearsOfExp.children().remove();
        Utils.spanText(yearsOfExp);
        yearsOfExp.append(yearsOfExpChild);

        // animation
        var timeline = new TimelineMax();
        timeline.from(johnCircle, 1, { opacity : 0, ease : Expo.easeOut } );
        timeline.from(overviewTitle, 1, { opacity : 0, left: '-60px', ease : Expo.easeOut }, '-=0.8');
        timeline.staggerFrom(developerThat.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.02, '-=0.8');
        timeline.staggerFrom(yearsOfExp.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.02, '-=0.8');
    };

    /**
     * Each time you go to the overview
     */
    var startOverview = function(fromTop) {
        if (fromTop) {
            TweenMax.from(overviewTitle, 2, { top : '-40px', ease : Expo.easeOut } );
            TweenMax.from(johnCircle, 2, { marginTop : '-60px', ease : Expo.easeOut } );
            TweenMax.from(overview.find('p').first(), 2, { marginTop : '-60px', ease : Expo.easeOut } );
            TweenMax.from(overview.find('p').eq(1), 2, { marginTop : '-80px', ease : Expo.easeOut } );
        } else {
            TweenMax.from(overviewTitle, 2, { top : '40px', ease : Expo.easeOut } );
            TweenMax.from(johnCircle, 2, { marginTop : '60px', ease : Expo.easeOut } );
            TweenMax.from(overview.find('p').first(), 2, { marginTop : '60px', ease : Expo.easeOut } );
            TweenMax.from(overview.find('p').eq(1), 2, { marginTop : '80px', ease : Expo.easeOut } );
        }
    };

    /**
     * Each time you go to the specialties
     */
    var startSpecialties = function(fromTop) {
        setAllCircles();
        TweenMax.ticker.addEventListener('tick', ticked);

        if (fromTop) {
            TweenMax.from(specialtiesTitle, 2, { top : '-50px', ease : Expo.easeOut } );
            TweenMax.from(specialties.find('.special_slogan'), 2, { top : '-70px', ease : Expo.easeOut } );
            TweenMax.from(specialties.find('h3').first(), 2, { top : '-100px', ease : Expo.easeOut } );
            TweenMax.staggerFrom(specialties.find('.circle'), 2, { marginTop : '-50px', ease : Expo.easeOut }, 0.05);
        } else {
            TweenMax.from(specialtiesTitle, 2, { top : '50px', ease : Expo.easeOut } );
            TweenMax.from(specialties.find('.special_slogan'), 2, { top : '70px', ease : Expo.easeOut } );
            TweenMax.from(specialties.find('h3').first(), 2, { top : '100px', ease : Expo.easeOut } );
            TweenMax.staggerFrom(specialties.find('.circle'), 2, { marginTop : '50px', ease : Expo.easeOut }, 0.05);
        }
    };

    /**
     * Each time you go to the experience
     */
    var startExperience = function(fromTop) {
        if (fromTop) {
            TweenMax.from(experienceTitle, 2, { top : '-50px', ease : Expo.easeOut } );
            TweenMax.from(experience.find('p').first(), 2, { top : '-70px', ease : Expo.easeOut } );

            TweenMax.from(pastExperience1.find('.circle').first(), 2, { top : '-40px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience1.find('h4'), 2, { top : '-30px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience1.find('.position'), 2, { top : '-30px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience1.find('.timeframe'), 2, { top : '-40px', ease : Expo.easeOut } );

            TweenMax.from(pastExperience2.find('.circle').first(), 2, { top : '-50px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience2.find('h4'), 2, { top : '-40px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience2.find('.position'), 2, { top : '-30px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience2.find('.timeframe'), 2, { top : '-30px', ease : Expo.easeOut } );
        } else {
            TweenMax.from(experienceTitle, 2, { top : '50px', ease : Expo.easeOut } );
            TweenMax.from(experience.find('p').first(), 2, { top : '70px', ease : Expo.easeOut } );

            TweenMax.from(pastExperience1.find('.circle').first(), 2, { top : '40px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience1.find('h4'), 2, { top : '30px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience1.find('.position'), 2, { top : '30px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience1.find('.timeframe'), 2, { top : '40px', ease : Expo.easeOut } );

            TweenMax.from(pastExperience2.find('.circle').first(), 2, { top : '50px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience2.find('h4'), 2, { top : '40px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience2.find('.position'), 2, { top : '30px', ease : Expo.easeOut } );
            TweenMax.from(pastExperience2.find('.timeframe'), 2, { top : '30px', ease : Expo.easeOut } );
        }
    };

    /**
     * Set the RaphaelJS "canvas" on each circle.
     */
    var setAllCircles = function() {
        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];
            var paper = new Raphael(circle.id, width, height);
            circle.paper = paper;
        }
    };

    /**
     * Reset circle fills back to the beginning
     */
    var resetCircles = function() {
        TweenMax.ticker.removeEventListener('tick', ticked);

        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];

            if (circle.paper) {
                circle.paper.remove();
                circle.paper = null;
            }

            circle.startPercent = 0;
        }
    };

    /**
     * Animate each circle fill.
     */
    var ticked = function() {
        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];

            if (circle.startPercent >= circle.endPercent) {
                circle.startPercent = circle.endPercent;

                // once finished, create the whole circle.
                circle.paper.clear();
                var fullCircle = circle.paper.circle(48, 48, 48);
                fullCircle.attr({ fill : circle.color, 'stroke-width' : 0 });
            } else {
                circle.startPercent += speed;
                circle.paper.clear();

                var angle = doublePI * circle.startPercent / 100 - halfPI;
                var x = Math.cos(angle) * centerX + centerX;
                var y = Math.sin(angle) * centerX + centerX;
                var largeArcFlag = (circle.startPercent <= (100 * 0.5)) ? 0 : 1;

                var path = 'M' + centerX + ',' + centerX + ' L' + centerX + ',0 ';
                path += 'A' + centerX + ',' + centerX + ' 0 ' + largeArcFlag + ',1 ' + x + ',' + y + ' ';
                path += 'L' + centerX + ',' + centerX + 'Z';

                var circlePath = circle.paper.path(path);
                circlePath.attr({ fill : circle.color, 'stroke-width' : 0 });
            }
        }
    };

    /**
     * Selectors
     */
    var cacheSelectors = function() {
        // all areas
        resume = $('#resume');
        overview = $('#overview');
        specialties = $('#specialties');
        experience = $('#experience');
        up_arrow = $('.up_arrow');
        down_arrow = $('.down_arrow');

        // overview area
        overviewTitle = overview.find('.title');
        johnCircle = overview.find('.circle').eq(0);

        // experience area
        experienceTitle = experience.find('.title');
        pastExperience1 = $('.past_experience1');
        pastExperience2 = $('.past_experience2');

        // Specialties area
        specialtiesTitle = specialties.find('.title');
        skillsRow1 = $('.skills_row1');
        skillsRow2 = $('.skills_row2');
    };

    window.Resume = Resume;

}(window));

(function(window) {

    var _this,
        content,
        topHeader,
        logo,
        mainNavigation,
        pageFooter,
        social,
        welcome,
        portfolio,
        contact,
        resume;

    function Site() {}

    Site.prototype.init = function() {
        _this = this;
        cacheSelectors();

        // set up routes
        crossroads.addRoute('welcome');
        crossroads.addRoute('portfolio');
        crossroads.addRoute('portfolio/{slug}', portfolioRoute);
        crossroads.addRoute('contact');
        crossroads.addRoute('resume');

        // set up Hasher
        hasher.changed.add(handleHasher);
        hasher.initialized.add(handleHasher);
        hasher.init();

        // Animate in header and footer
        TweenMax.to(topHeader, 0.5, { top : '0px', ease : Power1.easeOut } );
        TweenMax.to(pageFooter, 0.5, { bottom : '0px', ease : Power1.easeOut } );

        // Start the Social widget
        social = new Social();
        social.init();

        // Click on main nav items
        mainNavigation.find('a').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var path = $(this).attr('href');
            hasher.setHash(path);
        });

        // mouse enter on main nav items
        mainNavigation.find('a').on('mouseenter', function() {
            var prog = $(this).next().find('.prog');
            TweenMax.to(prog, 0.5, { width : '100%', ease : Expo.easeOut } );
        });

        // mouse leave on main nav items
        mainNavigation.find('a').on('mouseleave', function() {
            var prog = $(this).next().find('.prog');
            TweenMax.to(prog, 0.5, { width : '15%', ease : Expo.easeOut } );
        });

        // Click on logo. Same as "Home" click
        logo.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mainNavigation.find('a').first().click();
        });

        // all around links, this can't happen on the social feed
        $('a[href^="http"]').on('click', function() {
            if (!$(this).hasClass('social-link')) {
                window.open($(this).attr('href'), '_blank');
            }
        });
    };

    /**
     * Add "selected" class to requested nav item
     */
    var updateNavigation = function(section) {
        mainNavigation.find('li').removeClass('selected');

        mainNavigation.find('a').each(function() {
            var path = $(this).attr('href');

            if (path === section) {
                $(this).parent().addClass('selected');
            }
        });
    };

    /**
     * Handle page deep links
     * Portfolio case: hide a work (if shown) if you hit the "back" button
     * Default case: send me to the welcome page if it's not a portfolio/portfolio work
     */
    var handleHasher = function(newHash) {
        crossroads.parse(newHash);

        switch(newHash) {
            case '' :
            case 'welcome' :
            case 'welcome/' :
                switchSection('welcome');
                updateNavigation('welcome');
                break;

            case 'portfolio' :
            case 'portfolio/' :
                if (!$('#portfolio').hasClass('viewedSection')) {
                    switchSection('portfolio');
                    updateNavigation('portfolio');
                } else {
                    topHeader.click();
                }

                break;

            case 'contact' :
            case 'contact/' :
                switchSection('contact');
                updateNavigation('contact');
                break;

            case 'resume' :
            case 'resume/' :
                switchSection('resume');
                updateNavigation('resume');
                break;

            default :
                if (newHash.indexOf('portfolio') === -1) {
                    switchSection('welcome');
                    updateNavigation('welcome');
                } else {
                    if (!/portfolio\/./.test(newHash)) {
                        switchSection('welcome');
                        updateNavigation('welcome');
                    }
                }
        }
    };

    /**
     * Deep links on portfolio section
     * If you go to a work route directly, call the portfolio section manually
     */
    var portfolioRoute = function(id) {
        if (!$('#portfolio').hasClass('viewedSection')) {
            loadSection('portfolio');
            updateNavigation('portfolio');
        }

        var workData = portfolio.getWorkData(id);

        if (workData !== undefined) {
            portfolio.showWork(workData);
        }
    };

    /**
     * Fadeout any section that is currently being shown.
     * Show the requested one.
     */
    var switchSection = function(section) {
        var viewedSection = $('.viewedSection');

        if (viewedSection.length !== 0) {
            viewedSection.fadeOut('slow', function() {
                viewedSection.removeClass('viewedSection');
                loadSection(section);
            });
        }

        /**
        * First time visiting the page, no section to hide.
        * Little delay before the section starts, so the header/footer animation finishes
        */
        else {
            setTimeout(function() {
                loadSection(section);
            }, 400);
        }
    };

    /**
     * Call the requested section
     */
    var loadSection = function(section) {
        content.find('#' + section).show();

        switch (section) {
            case 'welcome' :
                welcome = new Welcome();
                welcome.init();
                break;

            case 'portfolio' :
                portfolio = new Portfolio();
                portfolio.init();
                break;

            case 'contact' :
                contact = new Contact();
                contact.init();
                break;

            case 'resume' :
                resume = new Resume();
                resume.init();
                break;
        }
    };

    /**
     * Selectors
     */
    var cacheSelectors = function() {
        content = $('#content');
        topHeader = $('#topheader');
        logo = $('#logo');
        mainNavigation = $('#main_nav');
        pageFooter = $('#pagefooter');
    };

    window.Site = Site;

}(window));

(function(window) {

    var social,
        openArrow,
        arrowPointer,
        socialClose,
        leftArrow,
        rightArrow,
        socialFeed,
        header,
        content,
        footer;

    var isOpen = false,
        singleItemWidth = 532,
        itemsWidth = 0;

    function Social() { }

    Social.prototype.init = function() {
        cacheSelectors();

        openArrow.on('click', openArrowClicked);
        socialClose.on('click', socialCloseClicked);

        header.on('click', contentClicked);
        content.on('click', contentClicked);
        footer.on('click', contentClicked);

        rightArrow.on('click', rightArrowClicked);
        leftArrow.on('click', leftArrowClicked);

        socialFeed.find('li').each(function() {
            itemsWidth += $(this).innerWidth() + 3;
        });

        socialFeed.css({ width : itemsWidth, left : 0 });
    };

    /**
     * Click on Arrows
     */
    var rightArrowClicked = function(e) {
        e.preventDefault();

        if (TweenMax.isTweening(socialFeed)) {
            return false;
        }

        // Move items to the left
        if (parseInt(socialFeed.css('left'), 10) > -(parseInt(socialFeed.css('width'), 10) - (singleItemWidth + 50))) {
            TweenMax.to(socialFeed, 0.5, { left : '-=' + singleItemWidth, ease : Expo.easeOut } );
        }

        // animate back to the beginning
        else {
            TweenMax.to(socialFeed, 0.8, { left : 0, ease : Expo.easeOut } );
        }
    };

    var leftArrowClicked = function(e) {
        e.preventDefault();

        if (TweenMax.isTweening(socialFeed)) {
            return false;
        }

        // Animate to the right
        if (parseInt(socialFeed.css('left'), 10) < 0) {
            TweenMax.to(socialFeed, 0.5, { left : '+=' + singleItemWidth, ease : Expo.easeOut } );
        }

        // animate back to the end
        else {
            TweenMax.to(socialFeed, 0.8, { left : -parseInt(socialFeed.css('width'), 10) + singleItemWidth + 38, ease : Expo.easeOut } );
        }
    };

    /**
     * Social Widget Animations
     */
    var openSocial = function() {
        TweenMax.to(social, 0.7, { left : '0%', ease : Expo.easeOut } );
    };

    var closeSocial = function() {
        TweenMax.to(social, 0.7, { left : '100%', ease : Expo.easeOut } );
    };

    /**
     * Close/Open the social widget
     */
    var contentClicked = function(e) {
        e.preventDefault();
        socialCloseClicked(e);
    };

    var openArrowClicked = function(e) {
        e.preventDefault();

        if (!isOpen) {
            openSocial();
            isOpen = true;
        }
    };

    var socialCloseClicked = function(e) {
        e.preventDefault();

        if (isOpen) {
            closeSocial();
            isOpen = false;
        }
    };

    /**
     * Selectors
     */
    var cacheSelectors = function() {
        social = $('#social');
        openArrow = $('#open_arrow');
        arrowPointer = openArrow.find('img');
        socialClose = $('.social_close');
        leftArrow = $('.left_arrow');
        rightArrow = $('.right_arrow');
        socialFeed = $('.social_feed');
        header = $('#topheader');
        content = $('#content');
        footer = $('#pagefooter');
    };

    window.Social = Social;

}(window));

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

(function(window) {

    var welcome,
        myName,
        myPortfolio,
        whomAmI,
        timeline;

    function Welcome() { }

    Welcome.prototype.init = function() {
        cacheSelectors();
        welcome.addClass('viewedSection');

        // My name is...
        myName = welcome.find('h2').first();
        var mynameChild = myName.children().remove();
        Utils.spanText(myName);
        myName.append(mynameChild);

        // And this is my...
        myPortfolio = welcome.find('h2').eq(1);
        var myPortfolioChild = myPortfolio.children().remove();
        Utils.spanText(myPortfolio);
        myPortfolio.append(myPortfolioChild);

        // Im a...
        whomAmI = welcome.find('h3');
        var whomAmIChild = whomAmI.children().detach();
        Utils.spanText(whomAmI);
        whomAmI.append(whomAmIChild);

        // animations
        timeline = new TimelineMax();
        timeline.staggerFrom(myName.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05);
        timeline.from(myName.find('span.johnred'), 0.8, { opacity : 0, ease : Expo.easeOut }, '-=0.2');
        timeline.staggerFrom(myPortfolio.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.05, '-=0.8');
        timeline.from(myPortfolio.find('span.johnred'), 0.8, { opacity : 0, ease : Expo.easeOut }, '-=0.2');
        timeline.staggerFrom(whomAmI.find('span.a'), 0.3, { opacity : 0, ease : Expo.easeOut }, 0.03, '-=0.8');
        timeline.from(whomAmI.find('a.johnsquared'), 0.8, { opacity : 0, ease : Expo.easeOut }, '-=0.2');
    };

    /**
     * Selectors
     */
    var cacheSelectors = function() {
        welcome = $('#welcome');
    };

    window.Welcome = Welcome;

}(window));
